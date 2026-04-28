import {
  forwardRef,
  useId,
  useState,
  useCallback,
  type FocusEvent,
  type ChangeEvent,
  type InputHTMLAttributes,
  type ReactNode,
} from 'react';
import { X } from 'react-feather';
import { IconButton } from '../../actions/IconButton/IconButton';
import { Spinner } from '../../feedback/Spinner/Spinner';
import { InputFieldHeader } from '../../forms/InputFieldHeader/InputFieldHeader';
import { InputFieldFooter } from '../../forms/InputFieldFooter/InputFieldFooter';
import { cn } from '../../../utils/cn';
import './TextInput.css';

/* ═══════════════════════════════════════════════════════════════════════════
   Types
   ═══════════════════════════════════════════════════════════════════════════ */

export type TextInputType = 'text' | 'search' | 'telephone' | 'email' | 'url' | 'number' | 'password';
export type TextInputValidationState = 'none' | 'error' | 'success';
export type TextInputNecessityIndicator = 'optional' | 'required';
export type TextInputLabelPosition = 'top' | 'left';
export type TextInputSize = 'Medium' | 'Large';
export type TextInputAutoComplete =
  | 'currentPassword'
  | 'newPassword'
  | 'oneTimeCode'
  | 'name' | 'email' | 'countryName' | 'postalCode'
  | 'telephone' | 'username' | 'none';
export type TextInputKeyboardReturn =
  | 'default' | 'go' | 'done' | 'next' | 'search' | 'send';

export interface TextInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'prefix' | 'type' | 'onChange' | 'onBlur' | 'onFocus'> {
  /** Label for the input field */
  label: string;
  /** Field size — Medium: 36px/14px text/16px icons (default); Large: 48px/16px text/20px icons. For Large, pass a 20px icon (e.g. `<Search size={20} />`). */
  size?: TextInputSize;
  /** Position of the label */
  labelPosition?: TextInputLabelPosition;
  /** Indicator next to label */
  necessityIndicator?: TextInputNecessityIndicator;
  /** Field name for form submissions */
  name?: string;
  /** Input type */
  type?: TextInputType;
  /** Placeholder text */
  placeholder?: string;
  /** Controlled value */
  value?: string;
  /** Default value for uncontrolled usage */
  defaultValue?: string;
  /** Validation state */
  validationState?: TextInputValidationState;
  /** Help text shown below the field */
  helpText?: string;
  /** Error text shown when validationState is 'error' */
  errorText?: string;
  /** Success text shown when validationState is 'success' */
  successText?: string;
  /** Called when value changes */
  onChange?: (meta: { name: string; value: string }) => void;
  /** Called when field receives focus */
  onFocus?: (meta: { name: string; value: string }) => void;
  /** Called when field loses focus */
  onBlur?: (meta: { name: string; value: string }) => void;
  /** Disables the input */
  isDisabled?: boolean;
  /** Marks the field as required */
  isRequired?: boolean;
  /** Icon displayed at the start of the field */
  icon?: ReactNode;
  /** Interactive element rendered at the start of the field (before input), flush
   *  to the left edge with a right separator. Used by composite inputs such as
   *  PhoneNumberInput for an inline country selector. When provided, `icon` and
   *  `prefix` are ignored. */
  leadingSlot?: ReactNode;
  /** Show clear button */
  showClearButton?: boolean;
  /** Callback when clear button is clicked */
  onClearButtonClicked?: () => void;
  /** Prefix string */
  prefix?: string;
  /** Suffix string */
  suffix?: string;
  /** Trailing slot for arbitrary actions (e.g. PasswordInput's reveal toggle).
   *  Renders inside the trailing row alongside `suffix`/clear/spinner. */
  trailingIcon?: ReactNode;
  /** Shows a loading spinner */
  isLoading?: boolean;
  /** Max character count */
  maxCharacters?: number;
  /** Auto focus on mount */
  autoFocus?: boolean;
  /** Autocomplete hint */
  autoCompleteSuggestionType?: TextInputAutoComplete;
  /** Return key type */
  keyboardReturnKeyType?: TextInputKeyboardReturn;
}

/* ═══════════════════════════════════════════════════════════════════════════
   Helpers
   ═══════════════════════════════════════════════════════════════════════════ */

const AUTO_COMPLETE_MAP: Record<TextInputAutoComplete, string> = {
  name: 'name',
  email: 'email',
  countryName: 'country-name',
  postalCode: 'postal-code',
  telephone: 'tel',
  username: 'username',
  none: 'off',
  currentPassword: 'current-password',
  newPassword: 'new-password',
  oneTimeCode: 'one-time-code',
};

const INPUT_TYPE_MAP: Record<TextInputType, string> = {
  text: 'text',
  search: 'search',
  telephone: 'tel',
  email: 'email',
  url: 'url',
  number: 'number',
  password: 'password',
};

/* ═══════════════════════════════════════════════════════════════════════════
   TextInput
   ═══════════════════════════════════════════════════════════════════════════ */

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  (
    {
      label,
      size = 'Medium',
      labelPosition = 'top',
      necessityIndicator,
      name: nameProp,
      type = 'text',
      placeholder,
      value,
      defaultValue,
      validationState = 'none',
      helpText,
      errorText,
      successText,
      onChange,
      onFocus,
      onBlur,
      isDisabled = false,
      isRequired = false,
      icon,
      leadingSlot,
      showClearButton = false,
      onClearButtonClicked,
      prefix,
      suffix,
      trailingIcon,
      isLoading = false,
      maxCharacters,
      autoFocus = false,
      autoCompleteSuggestionType,
      keyboardReturnKeyType,
      className,
      id: idProp,
      disabled,
      ...restProps
    },
    ref,
  ) => {
    const autoId = useId();
    const id = idProp ?? autoId;
    const helpId = `${id}-help`;
    const fieldName = nameProp ?? '';
    const resolvedDisabled = isDisabled || disabled || false;
    const resolvedPlaceholder = placeholder ?? 'Enter value';

    const resolvedNecessity = necessityIndicator ?? (isRequired ? 'required' : undefined);

    const [hasBlurred, setHasBlurred] = useState(false);
    const [internalValue, setInternalValue] = useState(defaultValue ?? '');
    const isControlled = value !== undefined;
    const currentValue = isControlled ? value : internalValue;

    const isRequiredEmpty = (resolvedNecessity === 'required' || isRequired) && hasBlurred && !currentValue;
    const hasError = validationState === 'error' || isRequiredEmpty;
    const hasSuccess = validationState === 'success' && !hasError;

    const resolvedFooterText = hasError
      ? (validationState === 'error'
          ? (errorText ?? 'Error')
          : (errorText ?? `${label} is required`))
      : hasSuccess
        ? (successText ?? '')
        : (helpText ?? '');
    const resolvedFooterState: 'error' | 'success' | 'default' = hasError ? 'error' : hasSuccess ? 'success' : 'default';

    const showFooter = !isLoading && (!!resolvedFooterText || maxCharacters !== undefined);

    const charCount = currentValue.length;
    const counterText = maxCharacters !== undefined ? `${charCount}/${maxCharacters}` : '';

    const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value;
      if (maxCharacters !== undefined && val.length > maxCharacters) return;
      if (!isControlled) setInternalValue(val);
      onChange?.({ name: fieldName, value: val });
    }, [isControlled, fieldName, onChange, maxCharacters]);

    const handleBlur = useCallback((e: FocusEvent<HTMLInputElement>) => {
      setHasBlurred(true);
      onBlur?.({ name: fieldName, value: e.target.value });
    }, [fieldName, onBlur]);

    const handleFocus = useCallback((e: FocusEvent<HTMLInputElement>) => {
      onFocus?.({ name: fieldName, value: e.target.value });
    }, [fieldName, onFocus]);

    const handleClear = useCallback(() => {
      if (!isControlled) setInternalValue('');
      onClearButtonClicked?.();
      onChange?.({ name: fieldName, value: '' });
    }, [isControlled, fieldName, onClearButtonClicked, onChange]);

    const isLarge = size === 'Large';
    const bodyTypography = isLarge ? 'BodyLargeRegular' : 'BodyMediumRegular';
    const iconPixelSize = isLarge ? 20 : 16;
    const clearButtonSize = isLarge ? '20' : '16';

    const hasLeadingSlot = leadingSlot !== undefined && leadingSlot !== null && leadingSlot !== false;

    if (process.env.NODE_ENV !== 'production' && hasLeadingSlot && (icon || prefix)) {
      console.warn(
        '[TextInput] `leadingSlot` is set — `icon` and `prefix` are ignored.',
      );
    }

    const rootClasses = cn(
      'fds-text-input',
      isLarge && 'fds-text-input--size-large',
      labelPosition === 'left' && 'fds-text-input--label-left',
      resolvedDisabled && 'fds-text-input--disabled',
      isLoading && 'fds-text-input--loading',
      hasError && 'fds-text-input--error',
      hasSuccess && 'fds-text-input--success',
      hasLeadingSlot && 'fds-text-input--with-leading-slot',
      className,
    );

    return (
      <div className={rootClasses}>
        {/* —— Label ——————————————————————————————————————————————————————— */}
        <InputFieldHeader
          label={resolvedNecessity === 'optional' ? `${label} (optional)` : label}
          necessityIndicator={resolvedNecessity === 'required' ? 'required' : 'none'}
          size={size}
          htmlFor={id}
        />

        {/* —— Field ——————————————————————————————————————————————————————— */}
        <div className="fds-text-input__field-wrapper">
          <div className="fds-text-input__field">
            {hasLeadingSlot && (
              <div className="fds-text-input__leading-slot">{leadingSlot}</div>
            )}
            <div className="fds-text-input__leading">
              {!hasLeadingSlot && icon && (
                <span className="fds-text-input__icon">{icon}</span>
              )}
              {!hasLeadingSlot && prefix && (
                <span className={cn('fds-text-input__prefix', bodyTypography)}>{prefix}</span>
              )}
              <input
                ref={ref}
                className={cn('fds-text-input__input', bodyTypography)}
                type={INPUT_TYPE_MAP[type]}
                id={id}
                name={fieldName || undefined}
                placeholder={resolvedPlaceholder}
                value={isControlled ? value : undefined}
                defaultValue={!isControlled ? defaultValue : undefined}
                disabled={resolvedDisabled}
                required={resolvedNecessity === 'required' || isRequired || undefined}
                autoFocus={autoFocus || undefined}
                autoComplete={autoCompleteSuggestionType ? AUTO_COMPLETE_MAP[autoCompleteSuggestionType] : undefined}
                enterKeyHint={keyboardReturnKeyType !== 'default' ? keyboardReturnKeyType : undefined}
                maxLength={maxCharacters}
                aria-label={label}
                aria-required={resolvedNecessity === 'required' || isRequired || undefined}
                aria-disabled={resolvedDisabled || undefined}
                aria-invalid={hasError || undefined}
                aria-describedby={showFooter ? helpId : undefined}
                aria-busy={isLoading || undefined}
                onChange={handleChange}
                onBlur={handleBlur}
                onFocus={handleFocus}
                {...restProps}
              />
            </div>

            {(suffix || showClearButton || isLoading || trailingIcon) && (
              <span className="fds-text-input__trailing">
                {suffix && (
                  <span className={cn('fds-text-input__suffix', bodyTypography)}>{suffix}</span>
                )}
                {showClearButton && currentValue && !resolvedDisabled && !isLoading && (
                  <IconButton
                    icon={<X size={iconPixelSize} />}
                    size={clearButtonSize}
                    onClick={handleClear}
                    aria-label="Clear"
                    className="fds-text-input__clear"
                  />
                )}
                {isLoading && (
                  <Spinner color="Brand" size="Medium" accessibilityLabel="Loading" />
                )}
                {trailingIcon}
              </span>
            )}
          </div>
        </div>

        {/* —— Footer ——————————————————————————————————————————————————————— */}
        {showFooter && (
          <InputFieldFooter
            helpText={resolvedFooterText || undefined}
            counterText={maxCharacters !== undefined ? counterText : undefined}
            state={resolvedFooterState}
            size={size}
            id={helpId}
          />
        )}
      </div>
    );
  },
);

TextInput.displayName = 'TextInput';
