import { Children, isValidElement, cloneElement, type HTMLAttributes, type ReactNode } from 'react';
import { cn } from '../../../utils/cn';
import type { BreadcrumbSize } from './BreadcrumbItem';
import './Breadcrumb.css';

/* ═══════════════════════════════════════════════════════════════════════════
   Types
   ═══════════════════════════════════════════════════════════════════════════ */

export interface BreadcrumbProps extends HTMLAttributes<HTMLElement> {
  /** Size passed down to all BreadcrumbItem children */
  size?: BreadcrumbSize;
  /** BreadcrumbItem children */
  children?: ReactNode;
}

/* ═══════════════════════════════════════════════════════════════════════════
   Breadcrumb
   Figma: 2782:18712
   ═══════════════════════════════════════════════════════════════════════════ */

export function Breadcrumb({ size = 'Medium', children, className, ...props }: BreadcrumbProps) {
  const items = Children.toArray(children);

  return (
    <nav className={cn('fds-breadcrumb', className)} aria-label="Breadcrumb" {...props}>
      <ol className="fds-breadcrumb__list">
        {items.map((child, index) => {
          if (!isValidElement(child)) return child;
          return cloneElement(child as React.ReactElement<Record<string, unknown>>, {
            size,
            showSeparator: (child.props as Record<string, unknown>).showSeparator ?? index < items.length - 1,
          });
        })}
      </ol>
    </nav>
  );
}

Breadcrumb.displayName = 'Breadcrumb';
