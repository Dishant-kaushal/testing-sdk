import { createContext, useContext } from 'react';
import type { ChipSize } from './Chip';

export type ChipGroupSelectionType = 'single' | 'multiple';

export interface ChipGroupContextValue {
  selectionType: ChipGroupSelectionType;
  selectedValues: Set<string>;
  onChipToggle: (value: string) => void;
  size: ChipSize;
  isDisabled: boolean;
  name: string;
}

export const ChipGroupContext = createContext<ChipGroupContextValue | null>(null);

/** Optional — returns `null` when a Chip is rendered outside a ChipGroup. */
export function useChipGroupContext(): ChipGroupContextValue | null {
  return useContext(ChipGroupContext);
}
