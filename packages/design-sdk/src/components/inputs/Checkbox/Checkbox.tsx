import {
  forwardRef,
  useId,
  useEffect,
  useRef,
  useCallback,
  type InputHTMLAttributes,
  type KeyboardEvent,
} from 'react';
import { cn } from '../../../utils/cn';
import './Checkbox.css';

/* ═══════════════════════════════════════════════════════════════════════════
   Types
   ═══════════════════════════════════════════════════════════════════════════ */

export type CheckboxSize = 'Small' | 'Medium' | 'Large';

export interface CheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
  /** Label text displayed next to the checkbox */
  label: string;
  /** Size of the checkbox */
  size?: CheckboxSize;
  /** Whether the checkbox is disabled */
  isDisabled?: boolean;
  /** Whether the checkbox is in the indeterminate (intermediate) state */
  isIndeterminate?: boolean;
}

/* ═══════════════════════════════════════════════════════════════════════════
   Typography map
   ═══════════════════════════════════════════════════════════════════════════ */

const TYPOGRAPHY: Record<CheckboxSize, string> = {
  Small: 'BodySmallRegular',
  Medium: 'BodyMediumRegular',
  Large: 'BodyLargeRegular',
};

/* ═══════════════════════════════════════════════════════════════════════════
   Inline SVG icons (from Figma assets)
   ═══════════════════════════════════════════════════════════════════════════ */

function CheckIcon() {
  return (
    <svg viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path
        d="M9.46967 2.46967C9.76256 2.17678 10.2373 2.17678 10.5302 2.46967C10.8231 2.76256 10.8231 3.23732 10.5302 3.53022L5.03022 9.03022C4.73732 9.32311 4.26256 9.32311 3.96967 9.03022L1.46967 6.53022C1.17678 6.23732 1.17678 5.76256 1.46967 5.46967C1.76256 5.17678 2.23732 5.17678 2.53022 5.46967L4.49994 7.4394L9.46967 2.46967Z"
        fill="currentColor"
      />
    </svg>
  );
}

function MinusIcon() {
  return (
    <svg viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path
        d="M9.5 5.25C9.91421 5.25 10.25 5.58579 10.25 6C10.25 6.41421 9.91421 6.75 9.5 6.75H2.5C2.08579 6.75 1.75 6.41421 1.75 6C1.75 5.58579 2.08579 5.25 2.5 5.25H9.5Z"
        fill="currentColor"
      />
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   Checkbox
   ═══════════════════════════════════════════════════════════════════════════ */

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      label,
      size = 'Small',
      isDisabled = false,
      isIndeterminate = false,
      className,
      id: idProp,
      disabled,
      onChange,
      ...props
    },
    outerRef,
  ) => {
    const autoId = useId();
    const id = idProp ?? autoId;
    const resolvedDisabled = isDisabled || disabled || false;

    // Internal ref to set indeterminate property (not available as HTML attribute)
    const internalRef = useRef<HTMLInputElement>(null);

    // Merge refs
    const setRef = useCallback(
      (node: HTMLInputElement | null) => {
        (internalRef as React.MutableRefObject<HTMLInputElement | null>).current = node;
        if (typeof outerRef === 'function') {
          outerRef(node);
        } else if (outerRef) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (outerRef as any).current = node;
        }
      },
      [outerRef],
    );

    // Set indeterminate property on the native input
    useEffect(() => {
      if (internalRef.current) {
        internalRef.current.indeterminate = isIndeterminate;
      }
    }, [isIndeterminate]);

    // Enter key support
    const handleKeyDown = useCallback(
      (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          const input = e.currentTarget;
          input.checked = !input.checked;
          input.dispatchEvent(new Event('change', { bubbles: true }));
        }
      },
      [],
    );

    const rootClasses = cn(
      'fds-checkbox',
      `fds-checkbox--size-${size.toLowerCase()}`,
      resolvedDisabled && 'fds-checkbox--disabled',
      isIndeterminate && 'fds-checkbox--indeterminate',
      className,
    );

    return (
      <label className={rootClasses} htmlFor={id}>
        <input
          ref={setRef}
          className="fds-checkbox__input"
          type="checkbox"
          id={id}
          disabled={resolvedDisabled}
          aria-disabled={resolvedDisabled || undefined}
          onChange={onChange}
          onKeyDown={handleKeyDown}
          {...props}
        />
        <span className="fds-checkbox__box" aria-hidden="true">
          <span className="fds-checkbox__icon fds-checkbox__icon--check">
            <CheckIcon />
          </span>
          <span className="fds-checkbox__icon fds-checkbox__icon--minus">
            <MinusIcon />
          </span>
        </span>
        <span className={cn('fds-checkbox__label', TYPOGRAPHY[size])}>{label}</span>
      </label>
    );
  },
);

Checkbox.displayName = 'Checkbox';
