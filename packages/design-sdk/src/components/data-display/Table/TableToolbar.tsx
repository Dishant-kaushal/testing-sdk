import './TableToolbar.css';
import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '../../../utils/cn';

export interface TableToolbarProps extends HTMLAttributes<HTMLDivElement> {
  /** Title text — Body/LargeSemibold, primary color. */
  title?: string;
  /** Subtitle text — Body/MediumRegular, secondary color. */
  subtitle?: string;
  /** Optional leading slot (e.g. icon, badge) to the LEFT of the title block. */
  leading?: ReactNode;
  /** Trailing items (IconButton, Button, Menu) — right-aligned, gap 8 px. */
  trailing?: ReactNode;
  /** Optional secondary row BELOW the title (e.g. search input, filter chips). */
  section?: ReactNode;
  /** Override the entire content. */
  children?: ReactNode;
}

/**
 * TableToolbar — Figma 1313:14632 (_Table/Header-Base).
 *
 * Layout (per Figma):
 *   [leading?]  [title / subtitle]                        [trailing items]
 *   [optional section row below — full width]
 *
 * Sits in the surface's `toolbar` slot — never scrolls (the data area scrolls
 * beneath it). Pass `<TableToolbar>` to `<Table toolbar={...}>`.
 */
export function TableToolbar({
  title,
  subtitle,
  leading,
  trailing,
  section,
  children,
  className,
  ...rest
}: TableToolbarProps) {
  // If `children` is provided, render as a free-form slot — consumer controls layout.
  if (children) {
    return (
      <div className={cn('fds-table-toolbar', className)} {...rest}>
        {children}
      </div>
    );
  }

  return (
    <div className={cn('fds-table-toolbar', className)} {...rest}>
      <div className="fds-table-toolbar__row">
        {leading && <div className="fds-table-toolbar__leading">{leading}</div>}
        <div className="fds-table-toolbar__titles">
          {title && (
            <span className="fds-table-toolbar__title BodyLargeSemibold">{title}</span>
          )}
          {subtitle && (
            <span className="fds-table-toolbar__subtitle BodyMediumRegular">{subtitle}</span>
          )}
        </div>
        {trailing && <div className="fds-table-toolbar__trailing">{trailing}</div>}
      </div>
      {section && <div className="fds-table-toolbar__section">{section}</div>}
    </div>
  );
}
