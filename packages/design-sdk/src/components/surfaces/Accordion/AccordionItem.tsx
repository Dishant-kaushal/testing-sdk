import { useState, useCallback, type ReactNode, type KeyboardEvent } from 'react';
import { cn } from '../../../utils/cn';
import { useAccordionContext } from './Accordion';
import { AccordionLeadingItem, type AccordionLeadingType } from './AccordionLeadingItem';
import './AccordionItem.css';

/* ═══════════════════════════════════════════════════════════════════════════
   Types
   ═══════════════════════════════════════════════════════════════════════════ */

export interface AccordionItemProps {
  /** Unique key identifying this item within an Accordion group */
  value?: string;
  /** Title text displayed in the header */
  title: string;
  /** Body text content (simple text mode) */
  bodyText?: string;
  /** Custom body content (slot — takes precedence over bodyText) */
  children?: ReactNode;
  /** Type of leading item */
  leading?: AccordionLeadingType;
  /** Icon element for leading (when leading='Icon') */
  leadingIcon?: ReactNode;
  /** Number/text for leading (when leading='Number') */
  leadingNumber?: string;
  /** Controlled expanded state (standalone mode) */
  isExpanded?: boolean;
  /** Default expanded state (standalone uncontrolled mode) */
  defaultExpanded?: boolean;
  /** Called when expanded state changes */
  onExpandedChange?: (expanded: boolean) => void;
  /** Additional class name */
  className?: string;
}

/* ═══════════════════════════════════════════════════════════════════════════
   Chevron Icon (from Figma — down arrow, rotated 180deg when expanded)
   ═══════════════════════════════════════════════════════════════════════════ */

function ChevronDown() {
  return (
    <svg viewBox="0 0 9.33 5.33" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0.195 0.195C0.456-0.065 0.878-0.065 1.138 0.195L4.667 3.724L8.195 0.195C8.456-0.065 8.878-0.065 9.138 0.195C9.398 0.456 9.398 0.878 9.138 1.138L5.138 5.138C4.878 5.398 4.456 5.398 4.195 5.138L0.195 1.138C-0.065 0.878-0.065 0.456 0.195 0.195Z"
        fill="currentColor"
      />
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   AccordionItem
   ═══════════════════════════════════════════════════════════════════════════ */

export function AccordionItem({
  value,
  title,
  bodyText,
  children,
  leading = 'None',
  leadingIcon,
  leadingNumber,
  isExpanded: controlledExpanded,
  defaultExpanded = false,
  onExpandedChange,
  className,
}: AccordionItemProps) {
  const accordionCtx = useAccordionContext();

  // Standalone state (used when not inside an Accordion wrapper)
  const [internalExpanded, setInternalExpanded] = useState(defaultExpanded);

  // Determine expanded state — context takes priority over local state
  const isControlled = controlledExpanded !== undefined;
  const expanded = accordionCtx && value
    ? accordionCtx.expandedKeys.has(value)
    : isControlled
      ? controlledExpanded
      : internalExpanded;

  const toggle = useCallback(() => {
    if (accordionCtx && value) {
      accordionCtx.toggleKey(value);
    } else {
      const next = !expanded;
      if (!isControlled) setInternalExpanded(next);
      onExpandedChange?.(next);
    }
  }, [accordionCtx, value, expanded, isControlled, onExpandedChange]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLButtonElement>) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggle();
      }
    },
    [toggle],
  );

  const rootClasses = cn(
    'fds-accordion-item',
    expanded && 'fds-accordion-item--expanded',
    className,
  );

  const hasBody = children || bodyText;

  return (
    <div className={rootClasses}>
      <div className="fds-accordion-item__root">
        <button
          className="fds-accordion-item__header"
          type="button"
          onClick={toggle}
          onKeyDown={handleKeyDown}
          aria-expanded={expanded}
        >
          <div className="fds-accordion-item__title-area">
            <AccordionLeadingItem
              leading={leading}
              icon={leadingIcon}
              number={leadingNumber}
            />
            <span className="fds-accordion-item__title BodyMediumMedium">
              {title}
            </span>
          </div>
          <span className="fds-accordion-item__chevron">
            <ChevronDown />
          </span>
        </button>

        {hasBody && (
          <div className="fds-accordion-item__body" role="region">
            {bodyText && !children && (
              <p className="fds-accordion-item__body-text BodyMediumRegular">
                {bodyText}
              </p>
            )}
            {children}
          </div>
        )}
      </div>
    </div>
  );
}

AccordionItem.displayName = 'AccordionItem';
