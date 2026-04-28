import {
  forwardRef,
  useCallback,
  useMemo,
  useRef,
  type ReactNode,
} from 'react';
import {
  AsYouType,
  getCountryCallingCode,
  getExampleNumber,
  parsePhoneNumberFromString,
} from 'libphonenumber-js';
import examples from 'libphonenumber-js/examples.mobile.json';
import { TextInput, type TextInputProps } from '../TextInput/TextInput';
import { useControllableState } from '../../../hooks/useControllableState';
import { cn } from '../../../utils/cn';
import { CountrySelector } from './CountrySelector';
import { getCountryByIso, type CountryIso } from './countries';
import './PhoneNumberInput.css';

export type { CountryIso } from './countries';

export interface PhoneNumberChangeMeta {
  name: string;
  /** Full E.164 value (e.g. `+919876543210`) or empty string */
  value: string;
  /** Formatted national number as displayed (e.g. `98765 43210`) */
  phoneNumber: string;
  /** Dial code including `+` (e.g. `+91`) */
  dialCode: string;
  /** Current country ISO */
  country: CountryIso;
  /** Whether the current number is a valid phone number for the country */
  isValid: boolean;
}

export interface PhoneNumberCountryChangeMeta {
  country: CountryIso;
  dialCode: string;
}

export interface PhoneNumberInputProps
  extends Omit<
    TextInputProps,
    | 'type'
    | 'value'
    | 'defaultValue'
    | 'onChange'
    | 'prefix'
    | 'icon'
    | 'leadingSlot'
    | 'maxCharacters'
    | 'autoCompleteSuggestionType'
    | 'suffix'
    | 'trailingIcon'
  > {
  /** Controlled national number string (digits + formatting, no dial code) */
  value?: string;
  /** Uncontrolled initial national number */
  defaultValue?: string;
  /** Controlled country ISO */
  country?: CountryIso;
  /** Uncontrolled initial country (default 'IN') */
  defaultCountry?: CountryIso;
  /** Fires on every input change */
  onChange?: (meta: PhoneNumberChangeMeta) => void;
  /** Fires when the user picks a different country */
  onCountryChange?: (meta: PhoneNumberCountryChangeMeta) => void;
  /** Show the country selector trigger (flag + dial code). Default true. */
  showCountrySelector?: boolean;
  /** Show the dial code inside the trigger. Default true. */
  showDialCode?: boolean;
  /** Restrict the country list to this set (ISO codes) */
  allowedCountries?: CountryIso[];
}

function formatAsYouType(raw: string, country: CountryIso): string {
  if (!raw) return '';
  const formatter = new AsYouType(country);
  return formatter.input(raw);
}

function toNationalDigits(raw: string): string {
  return (raw ?? '').replace(/\D/g, '');
}

function buildE164(nationalDigits: string, country: CountryIso): string {
  if (!nationalDigits) return '';
  const parsed = parsePhoneNumberFromString(nationalDigits, country);
  if (parsed) return parsed.number;
  // Fall back to a manual composition so partial numbers still carry the dial code.
  return `+${getCountryCallingCode(country)}${nationalDigits}`;
}

function getPlaceholderForCountry(country: CountryIso): string {
  try {
    const example = getExampleNumber(country, examples);
    return example?.formatNational() ?? '';
  } catch {
    return '';
  }
}

export const PhoneNumberInput = forwardRef<HTMLInputElement, PhoneNumberInputProps>(
  (
    {
      label,
      name,
      value,
      defaultValue,
      country: countryProp,
      defaultCountry = 'IN',
      onChange,
      onCountryChange,
      onFocus,
      onBlur,
      showCountrySelector = true,
      showDialCode = true,
      allowedCountries,
      size = 'Medium',
      placeholder,
      isDisabled = false,
      isRequired = false,
      validationState = 'none',
      errorText,
      helpText,
      successText,
      showClearButton = false,
      onClearButtonClicked,
      ...rest
    },
    ref,
  ) => {
    const [country = defaultCountry, setCountry] = useControllableState<CountryIso>({
      value: countryProp,
      defaultValue: defaultCountry,
      onChange: (next) => {
        const dialCode = `+${getCountryCallingCode(next)}`;
        onCountryChange?.({ country: next, dialCode });
      },
    });

    const [displayValue = '', setDisplayValue] = useControllableState<string>({
      value,
      defaultValue: defaultValue ?? '',
    });

    // Keep national digits in a ref so formatting is pure on every render.
    const digitsRef = useRef<string>(toNationalDigits(displayValue));

    const fireChange = useCallback(
      (nextDigits: string, nextCountry: CountryIso) => {
        const formatted = formatAsYouType(nextDigits, nextCountry);
        digitsRef.current = nextDigits;
        setDisplayValue(formatted);
        const e164 = buildE164(nextDigits, nextCountry);
        const parsed = parsePhoneNumberFromString(e164);
        onChange?.({
          name: name ?? '',
          value: e164,
          phoneNumber: formatted,
          dialCode: `+${getCountryCallingCode(nextCountry)}`,
          country: nextCountry,
          isValid: parsed?.isValid() ?? false,
        });
      },
      [name, onChange, setDisplayValue],
    );

    const handleTextChange = useCallback(
      ({ value: rawValue }: { name: string; value: string }) => {
        const digits = toNationalDigits(rawValue);
        fireChange(digits, country);
      },
      [country, fireChange],
    );

    const handleCountryChange = useCallback(
      (next: CountryIso) => {
        setCountry(next);
        // Re-format the current digits under the new country's rules.
        fireChange(digitsRef.current, next);
      },
      [setCountry, fireChange],
    );

    const handleClearClicked = useCallback(() => {
      digitsRef.current = '';
      setDisplayValue('');
      onClearButtonClicked?.();
      onChange?.({
        name: name ?? '',
        value: '',
        phoneNumber: '',
        dialCode: `+${getCountryCallingCode(country)}`,
        country,
        isValid: false,
      });
    }, [country, name, onChange, onClearButtonClicked, setDisplayValue]);

    const resolvedPlaceholder = useMemo(
      () => placeholder ?? getPlaceholderForCountry(country),
      [placeholder, country],
    );

    const leadingSlot: ReactNode = showCountrySelector ? (
      <CountrySelector
        country={country}
        onCountryChange={handleCountryChange}
        allowedCountries={allowedCountries}
        showDialCode={showDialCode}
        size={size}
        isDisabled={isDisabled}
      />
    ) : undefined;

    // When the country selector is hidden, fall back to a static dial-code prefix
    // so the number always carries its dial code visually.
    const resolvedPrefix = !showCountrySelector && showDialCode
      ? `+${getCountryCallingCode(country)}`
      : undefined;

    return (
      <TextInput
        {...rest}
        ref={ref}
        label={label}
        name={name}
        type="telephone"
        size={size}
        placeholder={resolvedPlaceholder}
        value={displayValue}
        onChange={handleTextChange}
        onFocus={onFocus}
        onBlur={onBlur}
        validationState={validationState}
        errorText={errorText}
        helpText={helpText}
        successText={successText}
        isDisabled={isDisabled}
        isRequired={isRequired}
        showClearButton={showClearButton}
        onClearButtonClicked={handleClearClicked}
        leadingSlot={leadingSlot}
        prefix={resolvedPrefix}
        className={cn('fds-phone-number-input', rest.className)}
      />
    );
  },
);

PhoneNumberInput.displayName = 'PhoneNumberInput';
