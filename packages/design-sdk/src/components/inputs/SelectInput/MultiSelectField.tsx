import {
  forwardRef,
  useId,
  useRef,
  useCallback,
  type ReactNode,
  type MouseEvent,
  type ChangeEvent,
  type KeyboardEvent,
} from 'react';
import { ChevronDown } from 'react-feather';
import { cn } from '../../../utils/cn';
import { Tag } from '../../data-display/Tag/Tag';
import { InputFieldHeader } from '../../forms/InputFieldHeader/InputFieldHeader';
import { InputFieldFooter } from '../../forms/InputFieldFooter/InputFieldFooter';

export interface SelectInputTag {
  label: string;
  onDismiss?: () => void;
}

export type MultiSelectType = 'multiple' | 'multiple-flex';

export interface MultiSelectFieldProps {
  type?: MultiSelectType;
  label: string;
  name?: string;
  placeholder?: string;
  tags?: SelectInputTag[];
  maxVisibleTags?: number;
  helpText?: string;
  errorText?: string;
  validationState?: 'none' | 'error';
  isDisabled?: boolean;
  isOpen?: boolean;
  isReadOnly?: boolean;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  onBackspace?: () => void;
  onSubmit?: (value: string) => void;
  leadingIcon?: ReactNode;
  leadingText?: string;
  children?: ReactNode;
  onClick?: (e: MouseEvent<HTMLDivElement>) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  className?: string;
}

export const MultiSelectField = forwardRef<HTMLInputElement, MultiSelectFieldProps>(
  (
    {
      type = 'multiple',
      label,
      name,
      placeholder = 'Select',
      tags = [],
      maxVisibleTags = 2,
      helpText,
      errorText,
      validationState = 'none',
      isDisabled = false,
      isOpen = false,
      isReadOnly = false,
      searchValue,
      onSearchChange,
      onBackspace,
      onSubmit,
      leadingIcon,
      leadingText,
      children,
      onClick,
      onFocus,
      onBlur,
      className,
    },
    ref,
  ) => {
    const id = useId();
    const internalRef = useRef<HTMLInputElement>(null);
    const inputRef = (ref as React.RefObject<HTMLInputElement>) ?? internalRef;

    const isFlex = type === 'multiple-flex';
    const hasValue = tags.length > 0;
    const isError = validationState === 'error';
    const footerText = isError ? errorText : helpText;

    const visibleTags = isFlex ? tags : tags.slice(0, maxVisibleTags);
    const overflowCount = isFlex ? 0 : tags.length - maxVisibleTags;

    const handleTriggerClick = useCallback(
      (e: MouseEvent<HTMLDivElement>) => {
        if (isDisabled) return;
        inputRef.current?.focus();
        onClick?.(e);
      },
      [isDisabled, onClick, inputRef],
    );

    const handleInputChange = useCallback(
      (e: ChangeEvent<HTMLInputElement>) => {
        onSearchChange?.(e.target.value);
      },
      [onSearchChange],
    );

    const handleKeyDown = useCallback(
      (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Backspace' && !searchValue) {
          onBackspace?.();
        }
        if (e.key === 'Enter' && searchValue && onSubmit) {
          e.preventDefault();
          onSubmit(searchValue);
        }
      },
      [searchValue, onBackspace, onSubmit],
    );

    return (
      <div className={cn('fds-select-input__multi', className)}>
        <div
          className={cn(
            'fds-text-input',
            isDisabled && 'fds-text-input--disabled',
            isError && 'fds-text-input--error',
            isOpen && 'fds-select-input--open',
          )}
        >
          <InputFieldHeader label={label} htmlFor={id} />

          <div className="fds-text-input__field-wrapper fds-select-input__multi-field-wrapper">
            <div
              className={cn(
                'fds-text-input__field fds-select-input__multi-trigger',
                isFlex && 'fds-select-input__multi-trigger--flex',
              )}
              role="combobox"
              aria-expanded={isOpen}
              aria-haspopup="listbox"
              aria-disabled={isDisabled || undefined}
              onClick={handleTriggerClick}
            >
              {isFlex ? (
                <>
                  <span className="fds-select-input__leading-col">
                    {hasValue && (
                      <span className="fds-select-input__tags fds-select-input__tags--flex">
                        {visibleTags.map((tag) => (
                          <Tag
                            id={tag.label}
                            label={tag.label}
                            size="Medium"
                            isDisabled={isDisabled}
                            onDismiss={tag.onDismiss}
                          />
                        ))}
                      </span>
                    )}

                    <span
                      className={cn(
                        'fds-select-input__input-row',
                        hasValue && !isOpen && 'fds-select-input__input-row--hidden',
                      )}
                    >
                      {leadingIcon && (
                        <span className="fds-text-input__icon">{leadingIcon}</span>
                      )}
                      {leadingText && (
                        <span className="fds-text-input__prefix BodyMediumRegular">{leadingText}</span>
                      )}
                      <input
                        ref={inputRef}
                        id={id}
                        type="text"
                        role="searchbox"
                        className="fds-select-input__multi-input BodyMediumRegular"
                        name={name}
                        placeholder={hasValue ? '' : placeholder}
                        value={searchValue ?? ''}
                        disabled={isDisabled}
                        readOnly={isReadOnly}
                        aria-label={label}
                        aria-autocomplete="list"
                        autoComplete="off"
                        onChange={handleInputChange}
                        onKeyDown={handleKeyDown}
                        onFocus={onFocus}
                        onBlur={onBlur}
                      />
                    </span>
                  </span>

                  <span className="fds-select-input__trailing--flex">
                    <span
                      className={cn(
                        'fds-select-input__multi-chevron',
                        isOpen && 'fds-select-input__multi-chevron--open',
                      )}
                    >
                      <ChevronDown size={16} />
                    </span>
                  </span>
                </>
              ) : (
                <>
                  <span className="fds-text-input__leading">
                    {leadingIcon && (
                      <span className="fds-text-input__icon">{leadingIcon}</span>
                    )}
                    {leadingText && (
                      <span className="fds-text-input__prefix BodyMediumRegular">{leadingText}</span>
                    )}

                    {hasValue && (
                      <span className="fds-select-input__tags">
                        {visibleTags.map((tag) => (
                          <Tag
                            id={tag.label}
                            label={tag.label}
                            size="Medium"
                            isDisabled={isDisabled}
                            onDismiss={tag.onDismiss}
                          />
                        ))}
                        {overflowCount > 0 && (
                          <span className="fds-select-input__overflow BodySmallRegular">
                            +{overflowCount} more
                          </span>
                        )}
                      </span>
                    )}

                    <input
                      ref={inputRef}
                      id={id}
                      type="text"
                      role="searchbox"
                      className="fds-select-input__multi-input BodyMediumRegular"
                      name={name}
                      placeholder={hasValue ? '' : placeholder}
                      value={searchValue ?? ''}
                      disabled={isDisabled}
                      readOnly={isReadOnly}
                      aria-label={label}
                      aria-autocomplete="list"
                      autoComplete="off"
                      onChange={handleInputChange}
                      onKeyDown={handleKeyDown}
                      onFocus={onFocus}
                      onBlur={onBlur}
                    />
                  </span>

                  <span className="fds-text-input__trailing">
                    <span
                      className={cn(
                        'fds-select-input__multi-chevron',
                        isOpen && 'fds-select-input__multi-chevron--open',
                      )}
                    >
                      <ChevronDown size={16} />
                    </span>
                  </span>
                </>
              )}
            </div>

            {isOpen && children && (
              <div className="fds-select-input__popover">
                {children}
              </div>
            )}
          </div>

          {footerText && (
            <InputFieldFooter
              helpText={footerText}
              state={isError ? 'error' : 'default'}
            />
          )}
        </div>
      </div>
    );
  },
);

MultiSelectField.displayName = 'MultiSelectField';
