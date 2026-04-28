import type { HTMLAttributes } from 'react';
import { cn } from '../../../utils/cn';
import './Indicator.css';

/* ═══════════════════════════════════════════════════════════════════════════
   Types
   ═══════════════════════════════════════════════════════════════════════════ */

export type IndicatorIntent = 'Positive' | 'Negative' | 'Notice' | 'Information' | 'Neutral';
export type IndicatorSize = 'Small' | 'Medium' | 'Large';

export interface IndicatorProps extends HTMLAttributes<HTMLDivElement> {
  /** Semantic color intent */
  intent?: IndicatorIntent;
  /** Dot size — Small 6px, Medium 8px, Large 10px */
  size?: IndicatorSize;
  /** Label text next to the dot */
  label?: string;
}

/* ═══════════════════════════════════════════════════════════════════════════
   Typography map
   ═══════════════════════════════════════════════════════════════════════════ */

const TYPOGRAPHY: Record<IndicatorSize, string> = {
  Small: 'BodySmallMedium',
  Medium: 'BodyMediumMedium',
  Large: 'BodyMediumMedium',
};

/* ═══════════════════════════════════════════════════════════════════════════
   Indicator
   ═══════════════════════════════════════════════════════════════════════════ */

export function Indicator({
  intent = 'Positive',
  size = 'Small',
  label,
  className,
  ...props
}: IndicatorProps) {
  return (
    <div
      className={cn('fds-indicator', className)}
      {...props}
    >
      <div className="fds-indicator__wrapper">
        <span
          className={cn(
            'fds-indicator__dot',
            `fds-indicator__dot--${intent.toLowerCase()}`,
            `fds-indicator__dot--${size.toLowerCase()}`,
          )}
        />
        {label && (
          <span className={cn('fds-indicator__label', TYPOGRAPHY[size])}>
            {label}
          </span>
        )}
      </div>
    </div>
  );
}

Indicator.displayName = 'Indicator';
