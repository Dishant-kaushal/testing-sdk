import type { HTMLAttributes } from 'react';
import { ChevronDown, ChevronLeft, ChevronRight } from 'react-feather';
import { cn } from '../../../utils/cn';
import { Button } from '../../actions/Button/Button';
import './CalendarHeader.css';

/* ═══════════════════════════════════════════════════════════════════════════
   Types
   ═══════════════════════════════════════════════════════════════════════════ */

export interface CalendarHeaderProps extends HTMLAttributes<HTMLDivElement> {
  /** Display label (e.g. "March 2026") */
  label: string;
  /** Called when prev (up) button is clicked */
  onPrev?: () => void;
  /** Called when next (down) button is clicked */
  onNext?: () => void;
  /** Called when the label area is clicked (to open month/year picker) */
  onLabelClick?: () => void;
}

/* ═══════════════════════════════════════════════════════════════════════════
   CalendarHeader
   ═══════════════════════════════════════════════════════════════════════════ */

export function CalendarHeader({
  label,
  onPrev,
  onNext,
  onLabelClick,
  className,
  ...props
}: CalendarHeaderProps) {
  return (
    <div className={cn('fds-calendar-header', className)} {...props}>
      <div className="fds-calendar-header__label">
        <span className="fds-calendar-header__label-text BodyMediumMedium">{label}</span>
        <button
          type="button"
          className="fds-calendar-header__label-btn"
          onClick={onLabelClick}
          aria-label="Change view"
        >
          <ChevronDown size={16} />
        </button>
      </div>

      <div className="fds-calendar-header__nav">
        <Button
          variant="Gray"
          size="XSmall"
          iconOnly
          leadingIcon={<ChevronLeft size={16} />}
          onClick={onPrev}
          aria-label="Previous month"
        />
        <Button
          variant="Gray"
          size="XSmall"
          iconOnly
          leadingIcon={<ChevronRight size={16} />}
          onClick={onNext}
          aria-label="Next month"
        />
      </div>
    </div>
  );
}

CalendarHeader.displayName = 'CalendarHeader';
