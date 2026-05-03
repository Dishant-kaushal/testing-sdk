import { createContext, useContext } from 'react';

export interface CheckboxGroupContextValue {
  /** Form name propagated to all child inputs */
  name?: string;
  /** When true, all child checkboxes are disabled */
  isDisabled?: boolean;
  /** Set of currently checked values */
  groupValues: Set<string>;
  /** Toggle a value in/out of the checked set */
  toggleValue: (value: string) => void;
  /** Group-level validation state — propagates aria-invalid to children */
  validationState?: 'none' | 'error';
}

export const CheckboxGroupContext = createContext<CheckboxGroupContextValue | null>(null);

export function useCheckboxGroupContext(): CheckboxGroupContextValue | null {
  return useContext(CheckboxGroupContext);
}
