import { createContext, useContext } from 'react';
import type { ButtonColor, ButtonSize, ButtonVariant } from '../Button/Button';

export interface ButtonGroupContextValue {
  size: ButtonSize;
  variant: ButtonVariant;
  color: ButtonColor;
  isFullWidth: boolean;
  isDisabled: boolean;
}

export const ButtonGroupContext = createContext<ButtonGroupContextValue | null>(null);

/** Optional — returns `null` when a ButtonGroupItem is rendered outside a ButtonGroup. */
export function useButtonGroupContext(): ButtonGroupContextValue | null {
  return useContext(ButtonGroupContext);
}
