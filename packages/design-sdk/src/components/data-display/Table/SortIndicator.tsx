import { ChevronDown, ChevronUp } from 'react-feather';
import { cn } from '../../../utils/cn';

export interface SortIndicatorProps {
  direction: 'asc' | 'desc' | null;
}

/**
 * Sort indicator — two stacked react-feather chevrons. Mirrors Blade's
 * `SortIcon` shape (up on top, down below) but built from react-feather glyphs
 * + Faclon text-color tokens. Direction convention (Material / Blade):
 *   - asc  → DOWN arrow active   (data flows: smallest at top → largest at bottom)
 *   - desc → UP   arrow active
 *
 * The slot is ALWAYS reserved (rendered in the disabled colour when not
 * active) so columns don't jump on first sort.
 */
export function SortIndicator({ direction }: SortIndicatorProps) {
  const upActive = direction === 'desc';
  const downActive = direction === 'asc';
  return (
    <span className="fds-table__sort-indicator" aria-hidden="true">
      <ChevronUp
        size={12}
        className={cn(
          'fds-table__sort-indicator__chevron',
          upActive && 'fds-table__sort-indicator__chevron--active',
        )}
      />
      <ChevronDown
        size={12}
        className={cn(
          'fds-table__sort-indicator__chevron',
          downActive && 'fds-table__sort-indicator__chevron--active',
        )}
      />
    </span>
  );
}
