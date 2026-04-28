import {
  forwardRef,
  useCallback,
  useId,
  useMemo,
  useState,
  type HTMLAttributes,
  type ReactNode,
} from 'react';
import { cn } from '../../../utils/cn';
import { useControllableState } from '../../../hooks/useControllableState';
import {
  InputFieldHeader,
  type InputFieldNecessityIndicator,
} from '../../forms/InputFieldHeader';
import { InputFieldFooter } from '../../forms/InputFieldFooter';
import type { ChipSize } from './Chip';
import { ChipGroupContext, type ChipGroupSelectionType } from './ChipGroupContext';
import './ChipGroup.css';

export type { ChipGroupSelectionType } from './ChipGroupContext';

export type ChipGroupValidationState = 'none' | 'error';

export interface ChipGroupOnChangePayload {
  name: string;
  values: string[];
}

export interface ChipGroupProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** Children — typically `<Chip>` elements but any layout is allowed. */
  children: ReactNode;
  /** Selection mode. Default: `single`. */
  selectionType?: ChipGroupSelectionType;
  /** Controlled selection. `string` for single, `string[]` for multiple. */
  value?: string | string[];
  /** Uncontrolled default selection. `string` for single, `string[]` for multiple. */
  defaultValue?: string | string[];
  /** Fired whenever selection changes. Always passes `values` as an array. */
  onChange?: (payload: ChipGroupOnChangePayload) => void;
  /** Auto-generated via `useId` when omitted. */
  name?: string;
  /** Size applied to every child Chip. Default: `Small`. */
  size?: ChipSize;
  /** Disables every child Chip. */
  isDisabled?: boolean;
  /** Marks the group as required — shows asterisk and surfaces an error when the user clears their selection. */
  isRequired?: boolean;
  /** Overrides the inferred necessity indicator (`'required'` if `isRequired`, otherwise `'none'`). */
  necessityIndicator?: InputFieldNecessityIndicator;
  /** Explicit validation state. `'error'` forces the error footer regardless of `isRequired`. */
  validationState?: ChipGroupValidationState;
  /** Group label rendered above the chips. */
  label?: string;
  /** Hint text below the chips. Overridden by `errorText` when in an error state. */
  helpText?: string;
  /** Error message below the chips. Takes precedence over `helpText` when in an error state. */
  errorText?: string;
  /** `aria-label` used when `label` is absent. */
  accessibilityLabel?: string;
}

function toSet(input: string | string[] | undefined): Set<string> {
  if (input == null) return new Set();
  return new Set(Array.isArray(input) ? input : [input]);
}

export const ChipGroup = forwardRef<HTMLDivElement, ChipGroupProps>(
  (
    {
      children,
      selectionType = 'single',
      value,
      defaultValue,
      onChange,
      name: nameProp,
      size = 'Small',
      isDisabled = false,
      isRequired = false,
      necessityIndicator,
      validationState = 'none',
      label,
      helpText,
      errorText,
      accessibilityLabel,
      className,
      ...rest
    },
    ref,
  ) => {
    const autoId = useId();
    const name = nameProp ?? `chip-group-${autoId}`;

    const [current, setCurrent] = useControllableState<string | string[]>({
      value,
      defaultValue: defaultValue ?? (selectionType === 'multiple' ? [] : undefined),
    });

    const selectedValues = useMemo(() => toSet(current), [current]);

    const [hasInteracted, setHasInteracted] = useState(false);

    const onChipToggle = useCallback(
      (chipValue: string) => {
        let nextSet: Set<string>;
        if (selectionType === 'single') {
          nextSet = new Set([chipValue]);
        } else {
          nextSet = new Set(selectedValues);
          if (nextSet.has(chipValue)) nextSet.delete(chipValue);
          else nextSet.add(chipValue);
        }

        const nextArray = Array.from(nextSet);
        const nextState: string | string[] =
          selectionType === 'single' ? (nextArray[0] ?? '') : nextArray;

        setHasInteracted(true);
        setCurrent(nextState);
        onChange?.({ name, values: nextArray });
      },
      [selectionType, selectedValues, setCurrent, onChange, name],
    );

    const contextValue = useMemo(
      () => ({
        selectionType,
        selectedValues,
        onChipToggle,
        size,
        isDisabled,
        name,
      }),
      [selectionType, selectedValues, onChipToggle, size, isDisabled, name],
    );

    const resolvedNecessity: InputFieldNecessityIndicator =
      necessityIndicator ?? (isRequired ? 'required' : 'none');

    const isRequiredEmpty = isRequired && hasInteracted && selectedValues.size === 0;
    const hasError = validationState === 'error' || isRequiredEmpty;

    const footerState: 'default' | 'error' = hasError ? 'error' : 'default';
    const footerText = hasError
      ? (errorText ?? (label ? `${label} is required` : 'Selection is required'))
      : helpText;

    return (
      <div
        ref={ref}
        role="group"
        aria-label={!label ? accessibilityLabel : undefined}
        aria-invalid={hasError || undefined}
        className={cn('fds-chip-group', className)}
        {...rest}
      >
        {label && (
          <InputFieldHeader
            label={label}
            necessityIndicator={resolvedNecessity}
          />
        )}
        <div className="fds-chip-group__chips">
          <ChipGroupContext.Provider value={contextValue}>{children}</ChipGroupContext.Provider>
        </div>
        <InputFieldFooter helpText={footerText} state={footerState} />
      </div>
    );
  },
);

ChipGroup.displayName = 'ChipGroup';
