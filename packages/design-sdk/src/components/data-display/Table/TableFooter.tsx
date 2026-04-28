import './TableFooter.css';
import type { HTMLAttributes, ReactNode } from 'react';

export interface TableFooterProps extends HTMLAttributes<HTMLTableSectionElement> {
  children?: ReactNode;
}

/** Native `<tfoot>`. Used for column summaries / totals when needed. */
export function TableFooter({ children, ...rest }: TableFooterProps) {
  return (
    <tfoot className="fds-table__footer" {...rest}>
      {children}
    </tfoot>
  );
}
