import type { ReactNode } from 'react';
import './AccordionLeadingItem.css';

/* ═══════════════════════════════════════════════════════════════════════════
   Types
   ═══════════════════════════════════════════════════════════════════════════ */

export type AccordionLeadingType = 'None' | 'Icon' | 'Number';

export interface AccordionLeadingItemProps {
  /** Type of leading item */
  leading?: AccordionLeadingType;
  /** Icon element (when leading='Icon') */
  icon?: ReactNode;
  /** Number/text string (when leading='Number'), e.g. "1." */
  number?: string;
}

/* ═══════════════════════════════════════════════════════════════════════════
   AccordionLeadingItem
   ═══════════════════════════════════════════════════════════════════════════ */

export function AccordionLeadingItem({
  leading = 'None',
  icon,
  number,
}: AccordionLeadingItemProps) {
  if (leading === 'None') return null;

  if (leading === 'Icon') {
    return (
      <div className="fds-accordion-leading fds-accordion-leading--icon">
        <span className="fds-accordion-leading__icon">{icon}</span>
      </div>
    );
  }

  if (leading === 'Number') {
    return (
      <div className="fds-accordion-leading fds-accordion-leading--number">
        <span className="fds-accordion-leading__number BodyMediumMedium">
          {number}
        </span>
      </div>
    );
  }

  return null;
}

AccordionLeadingItem.displayName = 'AccordionLeadingItem';
