import {
  forwardRef,
  useId,
  useState,
  useCallback,
  useRef,
  type ChangeEvent,
  type FocusEvent,
  type InputHTMLAttributes,
  type KeyboardEvent,
  type ReactNode,
} from 'react';
import { Minus, Plus } from 'react-feather';
import { Button } from '../../actions/Button/Button';
import { InputFieldHeader } from '../../forms/InputFieldHeader/InputFieldHeader';
import { InputFieldFooter } from '../../forms/InputFieldFooter/InputFieldFooter';
import { cn } from '../../../utils/cn';
import './CounterInput.css';

export type CounterInputValidationState = 'none' | 'error' | 'success';
export type CounterInputNecessityIndicator = 'optional' | 'required';

export interface CounterInputChangeMeta {
  name: string;
  value: number | null;
}

export interface CounterInputProps
  extends Omit<
    InputHTMLAttributes<HTMLInputElement>,
    'value' | 'defaultValue' | 'onChange' | 'onBlur' | 'onFocus' | 'type' | 'prefix' | 'size'
  > {
  /** Label for the input field */
  label: string;
  /** Indicator next to label */
  necessityIndicator?: CounterInputNecessityIndicator;
  /** Field name for form submissions */
  name?: string;
  /** Controlled numeric value. Use `null` to represent empty. */
  value?: number | null;
  /** Default value for uncontrolled usage */
  defaultValue?: number | null;
  /** Minimum allowed value */
  min?: number;
  /** Maximum allowed value */
  max?: number;
  /** Amount added/removed per button click or arrow key press */
  step?: number;
  /** Placeholder shown when value is empty */
  placeholder?: string;
  /** Help text shown below the field */
  helpText?: string;
  /** Error text shown when validationState is 'error' */
  errorText?: string;
  /** Success text shown when validationState is 'success' */
  successText?: string;
  /** Validation state */
  validationState?: CounterInputValidationState;
  /** Disables the input and both buttons */
  isDisabled?: boolean;
  /** Marks the field as required */
  isRequired?: boolean;
  /**
   * When true, the user can only adjust the value via the +/- buttons;
   * the input itself is not typeable. Defaults to `false`.
   */
  isReadOnly?: boolean;
  /** Leading icon slot (defaults to none) */
  leadingIcon?: ReactNode;
  /** Short label rendered before the value (e.g. a unit like "px") */
  leadingLabel?: string;
  /** Called when value changes */
  onChange?: (meta: CounterInputChangeMeta) => void;
  /** Called when field receives focus */
  onFocus?: (meta: CounterInputChangeMeta) => void;
  /** Called when field loses focus */
  onBlur?: (meta: CounterInputChangeMeta) => void;
  /** Accessibility label for the decrement button */
  decrementLabel?: string;
  /** Accessibility label for the increment button */
  incrementLabel?: string;
}

const clamp = (n: number, min?: number, max?: number): number => {
  let v = n;
  if (typeof min === 'number' && v < min) v = min;
  if (typeof max === 'number' && v > max) v = max;
  return v;
};

const toNumberOrNull = (raw: string): number | null => {
  if (raw.trim() === '' || raw === '-') return null;
  const n = Number(raw);
  return Number.isFinite(n) ? n : null;
};

export const CounterInput = forwardRef<HTMLInputElement, CounterInputProps>(
  (
    {
      label,
      necessityIndicator,
      name: nameProp,
      value,
      defaultValue = null,
      min,
      max,
      step = 1,
      placeholder = 'Enter value',
      helpText,
      errorText,
      successText,
      validationState = 'none',
      isDisabled = false,
      isRequired = false,
      isReadOnly = false,
      leadingIcon,
      leadingLabel,
      onChange,
      onFocus,
      onBlur,
      decrementLabel = 'Decrease value',
      incrementLabel = 'Increase value',
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
    const resolvedNecessity = necessityIndicator ?? (isRequired ? 'required' : undefined);

    const isControlled = value !== undefined;
    const [internalValue, setInternalValue] = useState<number | null>(defaultValue);
    const currentValue = isControlled ? value ?? null : internalValue;

    const [rawText, setRawText] = useState<string>(
      currentValue === null ? '' : String(currentValue),
    );
    const isTypingRef = useRef(false);
    const syncedValueRef = useRef<number | null>(currentValue);
    // Sync rawText with external controlled `value` changes, but only when the
    // user is not mid-type — otherwise reformatting would clobber typing.
    if (!isTypingRef.current && syncedValueRef.current !== currentValue) {
      syncedValueRef.current = currentValue;
      const next = currentValue === null ? '' : String(currentValue);
      if (next !== rawText) setRawText(next);
    }

    const [hasBlurred, setHasBlurred] = useState(false);
    const isRequiredEmpty =
      (resolvedNecessity === 'required' || isRequired) && hasBlurred && currentValue === null;
    const hasError = validationState === 'error' || isRequiredEmpty;
    const hasSuccess = validationState === 'success' && !hasError;

    const resolvedFooterText = hasError
      ? (validationState === 'error'
          ? (errorText ?? 'Error')
          : (errorText ?? `${label} is required`))
      : hasSuccess
        ? (successText ?? '')
        : (helpText ?? '');
    const resolvedFooterState: 'error' | 'success' | 'default' =
      hasError ? 'error' : hasSuccess ? 'success' : 'default';
    const showFooter = !!resolvedFooterText;

    const atMin = typeof min === 'number' && currentValue !== null && currentValue <= min;
    const atMax = typeof max === 'number' && currentValue !== null && currentValue >= max;
    const decDisabled = resolvedDisabled || atMin;
    const incDisabled = resolvedDisabled || atMax;

    const commit = useCallback(
      (next: number | null) => {
        if (!isControlled) setInternalValue(next);
        onChange?.({ name: fieldName, value: next });
      },
      [isControlled, fieldName, onChange],
    );

    const adjust = useCallback(
      (delta: number) => {
        const base = currentValue ?? (typeof min === 'number' ? min : 0);
        const next = clamp(base + delta, min, max);
        syncedValueRef.current = next;
        setRawText(String(next));
        commit(next);
      },
      [currentValue, min, max, commit],
    );

    const handleDecrement = useCallback(() => {
      if (decDisabled) return;
      adjust(-step);
    }, [decDisabled, adjust, step]);

    const handleIncrement = useCallback(() => {
      if (incDisabled) return;
      adjust(step);
    }, [incDisabled, adjust, step]);

    const handleChange = useCallback(
      (e: ChangeEvent<HTMLInputElement>) => {
        const raw = e.target.value;
        if (raw !== '' && raw !== '-' && !/^-?\d*\.?\d*$/.test(raw)) return;
        isTypingRef.current = true;
        setRawText(raw);
        const parsed = toNumberOrNull(raw);
        commit(parsed);
      },
      [commit],
    );

    const handleKeyDown = useCallback(
      (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'ArrowUp') {
          e.preventDefault();
          handleIncrement();
        } else if (e.key === 'ArrowDown') {
          e.preventDefault();
          handleDecrement();
        }
      },
      [handleIncrement, handleDecrement],
    );

    const handleFocus = useCallback(
      (e: FocusEvent<HTMLInputElement>) => {
        onFocus?.({ name: fieldName, value: toNumberOrNull(e.target.value) });
      },
      [fieldName, onFocus],
    );

    const handleBlur = useCallback(
      (e: FocusEvent<HTMLInputElement>) => {
        isTypingRef.current = false;
        setHasBlurred(true);
        const parsed = toNumberOrNull(e.target.value);
        const clamped = parsed === null ? null : clamp(parsed, min, max);
        if (clamped !== parsed) {
          syncedValueRef.current = clamped;
          setRawText(clamped === null ? '' : String(clamped));
          commit(clamped);
        }
        onBlur?.({ name: fieldName, value: clamped });
      },
      [fieldName, min, max, commit, onBlur],
    );

    const rootClasses = cn(
      'fds-counter-input',
      resolvedDisabled && 'fds-counter-input--disabled',
      hasError && 'fds-counter-input--error',
      hasSuccess && 'fds-counter-input--success',
      className,
    );

    return (
      <div className={rootClasses}>
        <InputFieldHeader
          label={resolvedNecessity === 'optional' ? `${label} (optional)` : label}
          necessityIndicator={resolvedNecessity === 'required' ? 'required' : 'none'}
          htmlFor={id}
        />

        <div className="fds-counter-input__field-wrapper">
          <div className="fds-counter-input__field">
            <div className="fds-counter-input__leading">
              {leadingIcon && (
                <span className="fds-counter-input__icon">{leadingIcon}</span>
              )}
              {leadingLabel && (
                <span className="fds-counter-input__leading-label BodyMediumRegular">
                  {leadingLabel}
                </span>
              )}
              <input
                ref={ref}
                className="fds-counter-input__input BodyMediumRegular"
                type="text"
                inputMode="numeric"
                id={id}
                name={fieldName || undefined}
                placeholder={placeholder}
                value={rawText}
                readOnly={isReadOnly}
                disabled={resolvedDisabled}
                required={resolvedNecessity === 'required' || isRequired || undefined}
                aria-label={label}
                aria-required={resolvedNecessity === 'required' || isRequired || undefined}
                aria-disabled={resolvedDisabled || undefined}
                aria-invalid={hasError || undefined}
                aria-describedby={showFooter ? helpId : undefined}
                aria-valuenow={currentValue ?? undefined}
                aria-valuemin={min}
                aria-valuemax={max}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                onFocus={handleFocus}
                onBlur={handleBlur}
                {...restProps}
              />
            </div>

            <div className="fds-counter-input__trailing">
              <Button
                iconOnly
                size="XSmall"
                variant="Gray"
                color="Primary"
                leadingIcon={<Minus size={16} />}
                onClick={handleDecrement}
                isDisabled={decDisabled}
                aria-label={decrementLabel}
                tabIndex={-1}
              />
              <Button
                iconOnly
                size="XSmall"
                variant="Gray"
                color="Primary"
                leadingIcon={<Plus size={16} />}
                onClick={handleIncrement}
                isDisabled={incDisabled}
                aria-label={incrementLabel}
                tabIndex={-1}
              />
            </div>
          </div>
        </div>

        {showFooter && (
          <InputFieldFooter
            helpText={resolvedFooterText || undefined}
            state={resolvedFooterState}
            id={helpId}
          />
        )}
      </div>
    );
  },
);

CounterInput.displayName = 'CounterInput';
