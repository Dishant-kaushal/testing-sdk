import type { HTMLAttributes } from 'react';
import { cn } from '../../../utils/cn';
import './ProgressBar.css';

/* ═══════════════════════════════════════════════════════════════════════════
   Types
   ═══════════════════════════════════════════════════════════════════════════ */

export type ProgressBarSize = 'Large' | 'Small';
export type ProgressBarIntent =
  | 'None'
  | 'Positive'
  | 'Negative'
  | 'Notice'
  | 'Information'
  | 'Neutral';

export interface ProgressBarProps extends HTMLAttributes<HTMLDivElement> {
  /** Label text shown above the track */
  label?: string;
  /** Progress value 0–100 */
  value?: number;
  /** Size of the track — Large (4px) or Small (2px) */
  size?: ProgressBarSize;
  /** Color intent of the indicator */
  intent?: ProgressBarIntent;
  /** Whether the progress is indeterminate (animated, no percentage) */
  isIndeterminate?: boolean;
  /** Whether to show the percentage text (default true, hidden when indeterminate) */
  showPercentage?: boolean;
}

/* ═══════════════════════════════════════════════════════════════════════════
   ProgressBar
   Figma: 3067:2490
   ═══════════════════════════════════════════════════════════════════════════ */

export function ProgressBar({
  label,
  value = 0,
  size = 'Large',
  intent = 'None',
  isIndeterminate = false,
  showPercentage = true,
  className,
  ...props
}: ProgressBarProps) {
  const clampedValue = Math.min(100, Math.max(0, value));
  const showHeader = !!label || (showPercentage && !isIndeterminate);

  return (
    <div
      className={cn(
        'fds-progress-bar',
        `fds-progress-bar--size-${size.toLowerCase()}`,
        `fds-progress-bar--intent-${intent.toLowerCase()}`,
        isIndeterminate && 'fds-progress-bar--indeterminate',
        className,
      )}
      role="progressbar"
      aria-valuenow={isIndeterminate ? undefined : clampedValue}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={label ?? 'Progress'}
      {...props}
    >
      {showHeader && (
        <div className="fds-progress-bar__header">
          {label && (
            <span className="fds-progress-bar__label BodySmallRegular">{label}</span>
          )}
          {showPercentage && !isIndeterminate && (
            <span className="fds-progress-bar__percentage BodySmallRegular">
              {`${Math.round(clampedValue)}%`}
            </span>
          )}
        </div>
      )}

      <div className="fds-progress-bar__track">
        <div
          className="fds-progress-bar__indicator"
          style={isIndeterminate ? undefined : { width: `${clampedValue}%` }}
        />
      </div>
    </div>
  );
}

ProgressBar.displayName = 'ProgressBar';
