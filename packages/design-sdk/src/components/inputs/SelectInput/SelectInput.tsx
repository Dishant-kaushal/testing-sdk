import {
  forwardRef,
  useRef,
  useEffect,
  useCallback,
  type ReactNode,
  type MouseEvent,
  type KeyboardEvent,
} from 'react';
import { ChevronDown } from 'react-feather';
import { cn } from '../../../utils/cn';
import { TextInput } from '../TextInput/TextInput';
import { MultiSelectField, type SelectInputTag, type MultiSelectType } from './MultiSelectField';
import { useClickOutside } from '../../../hooks/useClickOutside';
import { useControllableState } from '../../../hooks/useControllableState';
import './SelectInput.css';

export type { SelectInputTag, MultiSelectType };

export interface SelectInputProps {
  /** Multi-select layout — 'multiple' (fixed height) or 'multiple-flex' (wrapping tags). Omit for single. */
  multiType?: MultiSelectType;
  /** Label for the select field */
  label: string;
  /** Field name for form submissions */
  name?: string;
  /** Placeholder text when no value is selected */
  placeholder?: string;
  /** Display value — for single select, the selected option text */
  value?: string;
  /** Tags — for multi select, array of selected items shown as Tag chips. Presence switches the component into multi mode. */
  tags?: SelectInputTag[];
  /** Max visible tags before showing "+N more" — only applies to multiType="multiple" (default 2) */
  maxVisibleTags?: number;
  /** Help text shown below the field */
  helpText?: string;
  /** Error text — shown when validationState is 'error' */
  errorText?: string;
  /** Validation state */
  validationState?: 'none' | 'error';
  /** Whether the field is disabled */
  isDisabled?: boolean;
  /** When true, single-mode input is typeable and focus opens the dropdown (autocomplete behavior). Ignored in multi mode (multi is always typeable). */
  searchable?: boolean;
  /** Controlled filter text. In single+searchable and multi modes this drives the input's visible value. */
  inputValue?: string;
  /** Fires when the user types in the filter input. */
  onInputChange?: (value: string) => void;
  /** Controlled open state. Omit to use uncontrolled state (click-to-toggle in non-searchable, focus-to-open in searchable). */
  isOpen?: boolean;
  /** Called when dropdown should open/close */
  onOpenChange?: (open: boolean) => void;
  /** Leading icon slot — 16px icon before the value */
  leadingIcon?: ReactNode;
  /** Leading text — prefix text (e.g. currency symbol) */
  leadingText?: string;
  /** Multi mode: called on Backspace in an empty input (remove last tag) */
  onBackspace?: () => void;
  /** Dropdown content — pass DropdownMenu here */
  children?: ReactNode;
  /** Legacy click handler — prefer onOpenChange */
  onClick?: (e: MouseEvent) => void;
  /** Additional class name */
  className?: string;
}

export const SelectInput = forwardRef<HTMLInputElement, SelectInputProps>(
  (
    {
      multiType = 'multiple',
      label,
      name,
      placeholder,
      value,
      tags,
      maxVisibleTags = 2,
      helpText,
      errorText,
      validationState = 'none',
      isDisabled = false,
      searchable = false,
      inputValue,
      onInputChange,
      isOpen,
      onOpenChange,
      leadingIcon,
      leadingText,
      onBackspace,
      children,
      onClick,
      className,
    },
    ref,
  ) => {
    const isMultiple = tags != null;
    const wrapperRef = useRef<HTMLDivElement>(null);

    const [openRaw, setOpenBase] = useControllableState<boolean>({
      value: isOpen,
      defaultValue: false,
      onChange: onOpenChange,
    });
    const open = openRaw ?? false;
    const prevOpen = useRef(open);
    const closingRef = useRef(false);

    const setOpen = useCallback(
      (next: boolean) => {
        if (!next) closingRef.current = true;
        setOpenBase(next);
      },
      [setOpenBase],
    );

    useClickOutside(wrapperRef, () => {
      if (open) setOpen(false);
    });

    useEffect(() => {
      if (open && !searchable && !isMultiple) {
        requestAnimationFrame(() => {
          const firstItem = wrapperRef.current?.querySelector<HTMLElement>(
            '.fds-select-input__popover [role="menuitem"]:not([aria-disabled="true"])',
          );
          firstItem?.focus();
        });
      }
    }, [open, searchable, isMultiple]);

    useEffect(() => {
      if (prevOpen.current && !open) {
        requestAnimationFrame(() => {
          const input = wrapperRef.current?.querySelector<HTMLElement>(
            '.fds-text-input__input, .fds-select-input__multi-input',
          );
          input?.focus();
        });
      }
      prevOpen.current = open;
    }, [open]);

    const handleFocus = useCallback(() => {
      if (closingRef.current) {
        closingRef.current = false;
        return;
      }
      if (!isDisabled && searchable) setOpen(true);
    }, [isDisabled, searchable, setOpen]);

    const handleClick = useCallback(
      (e: MouseEvent) => {
        if (isDisabled) return;
        if ((e.target as HTMLElement).closest('.fds-select-input__popover')) return;
        onClick?.(e);
        if (!searchable) setOpen(!open);
      },
      [isDisabled, open, searchable, onClick, setOpen],
    );

    const handleFieldKeyDown = useCallback(
      (e: KeyboardEvent<HTMLDivElement>) => {
        if (isDisabled) return;
        const target = e.target as HTMLElement;
        const isOnMenuItem = target.getAttribute('role') === 'menuitem';

        const queryItems = () =>
          wrapperRef.current?.querySelectorAll<HTMLElement>(
            '.fds-select-input__popover [role="menuitem"]:not([aria-disabled="true"])',
          );

        switch (e.key) {
          case 'Enter':
          case ' ':
            if (isOnMenuItem) break;
            if ((searchable || isMultiple) && open) {
              const first = queryItems()?.[0];
              if (first) {
                e.preventDefault();
                first.click();
              }
            } else if (!searchable) {
              e.preventDefault();
              setOpen(!open);
            }
            break;

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
              if (!open) {
                setOpen(true);
              } else {
                const items = queryItems();
                if (items && items.length > 0) items[0].focus();
              }
            }
            break;

          case 'ArrowUp':
            if (!isOnMenuItem) {
              e.preventDefault();
              if (!open) {
                setOpen(true);
              } else {
                const items = queryItems();
                if (items && items.length > 0) items[items.length - 1].focus();
              }
            }
            break;
        }
      },
      [isDisabled, open, searchable, isMultiple, setOpen],
    );

    if (isMultiple) {
      return (
        <div
          ref={wrapperRef}
          className={cn('fds-select-input', open && 'fds-select-input--open', className)}
          onClick={handleClick}
          onKeyDown={handleFieldKeyDown}
        >
          <MultiSelectField
            type={multiType}
            ref={ref}
            label={label}
            name={name}
            placeholder={placeholder ?? 'Select'}
            tags={tags}
            maxVisibleTags={maxVisibleTags}
            searchValue={inputValue}
            onSearchChange={onInputChange}
            onBackspace={onBackspace}
            helpText={validationState === 'error' ? undefined : helpText}
            errorText={errorText}
            validationState={validationState}
            isDisabled={isDisabled}
            isReadOnly={!onInputChange}
            isOpen={open}
            leadingIcon={leadingIcon}
            leadingText={leadingText}
            onFocus={handleFocus}
          >
            {children}
          </MultiSelectField>
        </div>
      );
    }

    const singleValue = searchable ? inputValue : value;
    const singlePlaceholder = placeholder ?? (searchable ? 'Search' : 'Select');

    return (
      <div
        ref={wrapperRef}
        className={cn('fds-select-input', open && 'fds-select-input--open', className)}
        onClick={handleClick}
        onKeyDown={handleFieldKeyDown}
      >
        <TextInput
          ref={ref}
          label={label}
          name={name}
          placeholder={singlePlaceholder}
          value={singleValue ?? ''}
          readOnly={!searchable}
          onChange={searchable ? (meta) => onInputChange?.(meta.value) : undefined}
          onFocus={handleFocus}
          helpText={validationState === 'error' ? undefined : helpText}
          errorText={errorText}
          validationState={validationState}
          isDisabled={isDisabled}
          icon={leadingIcon}
          prefix={leadingText}
          suffix={undefined}
          autoComplete={searchable ? 'off' : undefined}
          aria-expanded={open}
          aria-haspopup="listbox"
          aria-autocomplete={searchable ? 'list' : undefined}
        />

        <span className={cn('fds-select-input__chevron', open && 'fds-select-input__chevron--open')}>
          <ChevronDown size={16} />
        </span>

        {open && children && (
          <div className="fds-select-input__popover">
            {children}
          </div>
        )}
      </div>
    );
  },
);

SelectInput.displayName = 'SelectInput';
