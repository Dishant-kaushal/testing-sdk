import {
  forwardRef,
  useRef,
  useEffect,
  useCallback,
  useId,
  useImperativeHandle,
  type ReactNode,
  type HTMLAttributes,
  type KeyboardEvent,
} from 'react';
import { createPortal } from 'react-dom';
import { TextInput } from '../TextInput/TextInput';
import { MultiSelectField, type SelectInputTag } from '../SelectInput/MultiSelectField';
import { cn } from '../../../utils/cn';
import { useControllableState } from '../../../hooks/useControllableState';
import { useDropdownPortal } from '../../../hooks/useDropdownPortal';
import './SearchInput.css';

export type SearchInputType = 'single' | 'multiple' | 'multiple-flex';
export type SearchInputTag = SelectInputTag;

/**
 * Imperative handle exposed via `ref` on `<SearchInput>`. Replaces the raw
 * `HTMLInputElement` ref that earlier revisions forwarded — consumers now
 * get typed methods instead of the native DOM node so multi-mode (which
 * wraps the input in chip chrome) still exposes the same API.
 */
export interface SearchInputHandle {
  focus: () => void;
  blur: () => void;
  /** Empties the search text. Chips in multi-mode are consumer-owned and
   *  remain untouched — use your own state handler to clear them. */
  clear: () => void;
}

export interface SearchInputProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'children' | 'onChange' | 'onFocus' | 'onBlur' | 'onSubmit'> {
  type?: SearchInputType;
  label?: string;
  name?: string;
  placeholder?: string;
  /** Controlled input value. Omit + set `defaultValue` for uncontrolled mode. */
  inputValue?: string;
  /** Uncontrolled default. Dev-errors if combined with `inputValue`. */
  defaultValue?: string;
  onInputChange?: (value: string) => void;
  helpText?: string;
  errorText?: string;
  validationState?: 'none' | 'error';
  isDisabled?: boolean;
  isRequired?: boolean;
  /** Controlled open state. Omit for uncontrolled (opens on focus, closes on outside click/Escape). */
  isOpen?: boolean;
  /** Called when the component wants to change open state. */
  onOpenChange?: (open: boolean) => void;
  icon?: ReactNode;
  prefix?: string;
  children?: ReactNode;
  onFocus?: () => void;
  onBlur?: () => void;
  tags?: SearchInputTag[];
  maxVisibleTags?: number;
  onBackspace?: () => void;
  /** Enter key in `type='single'` (when focus is on the input, not a
   *  menuitem) or MultiSelectField's internal Enter submit both route here. */
  onSubmit?: (value: string) => void;
  noResultsText?: string;
  /** Show a clear button when the input has a value. `type='single'` only —
   *  multi-mode chips are dismissed individually via the chip X. */
  showClearButton?: boolean;
  /** Fires when the clear button is pressed. SearchInput also empties the
   *  value (uncontrolled) and refocuses the inner input. */
  onClearButtonClicked?: () => void;
  /** Swaps the clear button for a Spinner. `type='single'` only. */
  isLoading?: boolean;
}

export const SearchInput = forwardRef<SearchInputHandle, SearchInputProps>(
  (
    {
      type = 'single',
      label = '',
      name,
      placeholder = 'Search',
      inputValue,
      defaultValue,
      onInputChange,
      helpText,
      errorText,
      validationState = 'none',
      isDisabled = false,
      isRequired,
      isOpen,
      onOpenChange,
      icon,
      prefix,
      children,
      onFocus,
      onBlur,
      className,
      tags,
      maxVisibleTags,
      onBackspace,
      onSubmit,
      noResultsText = 'No results found',
      showClearButton = true,
      onClearButtonClicked,
      isLoading = false,
      ...rest
    },
    ref,
  ) => {
    /* ── Dev-mode check for value + defaultValue double-booking. Matches the
         pattern in Table/hooks/useTableEngine.ts. Fires once per mount. */
    if (process.env.NODE_ENV !== 'production') {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      useEffect(() => {
        if (inputValue !== undefined && defaultValue !== undefined) {
          // eslint-disable-next-line no-console
          console.error(
            '[SearchInput] Pass either `inputValue` (controlled) or `defaultValue` (uncontrolled), not both.',
          );
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);
    }

    /* ── Value (controlled / uncontrolled) ────────────────────────────── */
    const [valueRaw, setValue] = useControllableState<string>({
      value: inputValue,
      defaultValue: defaultValue ?? '',
      onChange: onInputChange,
    });
    const currentValue = valueRaw ?? '';

    /* ── Open state (controlled / uncontrolled) ───────────────────────── */
    const [openRaw, setOpenBase] = useControllableState<boolean>({
      value: isOpen,
      defaultValue: false,
      onChange: onOpenChange,
    });
    const open = openRaw ?? false;
    const prevOpen = useRef(open);
    const closingRef = useRef(false);

    const wrapperRef = useRef<HTMLDivElement>(null);
    const innerInputRef = useRef<HTMLInputElement>(null);

    const popoverId = useId();

    const setOpen = useCallback(
      (value: boolean) => {
        if (!value) closingRef.current = true;
        setOpenBase(value);
      },
      [setOpenBase],
    );

    const { portalRef: popoverRef, pos } = useDropdownPortal(wrapperRef, open, () => setOpen(false));

    const handleFocus = () => {
      if (closingRef.current) {
        closingRef.current = false;
        return;
      }
      if (!isDisabled) setOpen(true);
      onFocus?.();
    };

    useEffect(() => {
      if (prevOpen.current && !open) {
        requestAnimationFrame(() => {
          innerInputRef.current?.focus();
        });
      }
      prevOpen.current = open;
    }, [open]);

    /* ── Imperative handle ─────────────────────────────────────────────── */
    useImperativeHandle(
      ref,
      () => ({
        focus: () => innerInputRef.current?.focus(),
        blur: () => innerInputRef.current?.blur(),
        clear: () => setValue(''),
      }),
      [setValue],
    );

    /* ── Menuitem focus helpers ───────────────────────────────────────── */
    const getMenuItems = useCallback(() => {
      if (!popoverRef.current) return [] as HTMLElement[];
      return Array.from(
        popoverRef.current.querySelectorAll<HTMLElement>(
          '[role="menuitem"]:not([aria-disabled="true"])',
        ),
      );
    }, []);

    const focusMenuItemAt = useCallback(
      (index: 'first' | 'last') => {
        const items = getMenuItems();
        if (items.length === 0) return;
        (index === 'first' ? items[0] : items[items.length - 1]).focus();
      },
      [getMenuItems],
    );

    // Opens the dropdown if closed, then focuses first/last menuitem once
    // the popover mounts. Uses rAF so popoverRef is populated after the
    // render that mounts the popover subtree.
    const openAndFocus = useCallback(
      (index: 'first' | 'last') => {
        if (open) {
          focusMenuItemAt(index);
          return;
        }
        setOpen(true);
        requestAnimationFrame(() => focusMenuItemAt(index));
      },
      [open, setOpen, focusMenuItemAt],
    );

    const handleKeyDown = useCallback(
      (e: KeyboardEvent<HTMLDivElement>) => {
        if (isDisabled) return;

        const target = e.target as HTMLElement;
        const isOnMenuItem = target.getAttribute('role') === 'menuitem';

        switch (e.key) {
          case 'Escape':
            if (open) {
              e.preventDefault();
              e.stopPropagation();
              setOpen(false);
            }
            break;

          case 'ArrowDown':
            if (!isOnMenuItem) {
              e.preventDefault();
              openAndFocus('first');
            }
            break;

          case 'ArrowUp':
            if (!isOnMenuItem) {
              e.preventDefault();
              openAndFocus('last');
            }
            break;

          case 'Home':
            if (open) {
              e.preventDefault();
              focusMenuItemAt('first');
            }
            break;

          case 'End':
            if (open) {
              e.preventDefault();
              focusMenuItemAt('last');
            }
            break;

          case 'Enter':
            // Single mode only — MultiSelectField handles its own Enter to
            // add chips. If focus is on a menuitem, let native activate
            // semantics run.
            if (type === 'single' && !isOnMenuItem && onSubmit) {
              e.preventDefault();
              onSubmit(currentValue);
            }
            break;
        }
      },
      [isDisabled, open, setOpen, openAndFocus, focusMenuItemAt, type, onSubmit, currentValue],
    );

    /* ── Single-mode change + clear handlers ──────────────────────────── */
    const handleChange = useCallback(
      (meta: { name: string; value: string }) => {
        setValue(meta.value);
      },
      [setValue],
    );

    const handleClearButtonClicked = useCallback(() => {
      // TextInput's internal clear handler also fires onChange({ value: '' })
      // which reaches our handleChange → setValue(''). We just need to bubble
      // the consumer callback + restore focus to the input (clear button
      // steals it on click).
      onClearButtonClicked?.();
      requestAnimationFrame(() => innerInputRef.current?.focus());
    }, [onClearButtonClicked]);

    /* ── Multi-mode render ────────────────────────────────────────────── */
    if (type === 'multiple' || type === 'multiple-flex') {
      return (
        <div ref={wrapperRef} className={cn('fds-search-input', className)} onKeyDown={handleKeyDown} {...rest}>
          <MultiSelectField
            type={type}
            ref={innerInputRef}
            label={label}
            name={name}
            placeholder={placeholder}
            tags={tags}
            maxVisibleTags={maxVisibleTags}
            searchValue={currentValue}
            onSearchChange={setValue}
            onBackspace={onBackspace}
            onSubmit={onSubmit}
            helpText={validationState === 'error' ? undefined : helpText}
            errorText={errorText}
            validationState={validationState}
            isDisabled={isDisabled}
            isOpen={open}
            leadingIcon={icon}
            onFocus={handleFocus}
            onBlur={onBlur}
          />
          {open && pos && typeof document !== 'undefined' &&
            createPortal(
              <div
                ref={popoverRef}
                id={popoverId}
                className="fds-search-input__popover"
                style={{ top: pos.top, left: pos.left, width: pos.width }}
              >
                {children || <div className="fds-search-input__empty">{noResultsText}</div>}
              </div>,
              document.body,
            )
          }
        </div>
      );
    }

    /* ── Single-mode render ───────────────────────────────────────────── */
    return (
      <div ref={wrapperRef} className={cn('fds-search-input', className)} onKeyDown={handleKeyDown} {...rest}>
        <TextInput
          ref={innerInputRef}
          label={label}
          name={name}
          placeholder={placeholder}
          value={currentValue}
          onChange={handleChange}
          onFocus={() => handleFocus()}
          onBlur={() => onBlur?.()}
          helpText={validationState === 'error' ? undefined : helpText}
          errorText={errorText}
          validationState={validationState}
          isDisabled={isDisabled}
          isRequired={isRequired}
          icon={icon}
          prefix={prefix}
          suffix={undefined}
          autoComplete="off"
          showClearButton={showClearButton}
          onClearButtonClicked={handleClearButtonClicked}
          isLoading={isLoading}
          role="combobox"
          aria-expanded={open}
          aria-haspopup="listbox"
          aria-autocomplete="list"
          aria-controls={open ? popoverId : undefined}
        />

        {open && pos && typeof document !== 'undefined' &&
          createPortal(
            <div
              ref={popoverRef}
              id={popoverId}
              className="fds-search-input__popover"
              style={{ top: pos.top, left: pos.left, width: pos.width }}
            >
              {children || <div className="fds-search-input__empty">{noResultsText}</div>}
            </div>,
            document.body,
          )
        }
      </div>
    );
  },
);

SearchInput.displayName = 'SearchInput';
