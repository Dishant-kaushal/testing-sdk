import { createContext, useContext } from 'react';

export type StepperOrientation = 'horizontal' | 'vertical';
export type StepperColor =
  | 'positive'
  | 'negative'
  | 'notice'
  | 'information'
  | 'primary'
  | 'neutral';

export interface StepperContextValue {
  orientation: StepperOrientation;
  itemsInGroupCount: number;
  totalItemsInParentGroupCount: number;
}

export const StepperContext = createContext<StepperContextValue>({
  orientation: 'vertical',
  itemsInGroupCount: 0,
  totalItemsInParentGroupCount: 0,
});

export function useStepper(): StepperContextValue {
  return useContext(StepperContext);
}
