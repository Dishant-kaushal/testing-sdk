import type { HTMLAttributes, ReactNode } from 'react';

import { cn } from '../../../utils/cn';

import './Badge.css';

export type BadgeColor =
  | 'Positive'
  | 'Negative'
  | 'Notice'
  | 'Information'
  | 'Neutral'
  | 'Primary';

export type BadgeEmphasis = 'Subtle' | 'Intense';

export type BadgeSize = 'Small' | 'Medium' | 'Large';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  /** Semantic color of the badge */
  color?: BadgeColor;
  /** Visual weight — Subtle (tinted bg) or Intense (solid bg) */
  emphasis?: BadgeEmphasis;
  /** Size of the badge */
  size?: BadgeSize;
  /** Badge label text */
  label?: string;
  /** Optional leading icon slot */
  leadingIcon?: ReactNode;
}

const TYPOGRAPHY_CLASS: Record<BadgeSize, Record<BadgeEmphasis, string>> = {
  Small: { Subtle: 'BodyXSmallMedium', Intense: 'BodyXSmallRegular' },
  Medium: { Subtle: 'BodySmallMedium', Intense: 'BodySmallRegular' },
  Large: { Subtle: 'BodySmallMedium', Intense: 'BodySmallRegular' },
};

export function Badge({
  color = 'Positive',
  emphasis = 'Subtle',
  size = 'Small',
  label = 'Label',
  leadingIcon,
  className,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        'fds-badge',
        `fds-badge--color-${color.toLowerCase()}`,
        `fds-badge--emphasis-${emphasis.toLowerCase()}`,
        `fds-badge--size-${size.toLowerCase()}`,
        TYPOGRAPHY_CLASS[size][emphasis],
        className,
      )}
      {...props}
    >
      {leadingIcon ? (
        <span className="fds-badge__icon">{leadingIcon}</span>
      ) : null}
      <span className="fds-badge__label">{label}</span>
    </span>
  );
}

Badge.displayName = 'Badge';
