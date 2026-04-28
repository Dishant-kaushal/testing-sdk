import type { HTMLAttributes, ReactNode } from 'react';

export interface TableFooterRowProps extends HTMLAttributes<HTMLTableRowElement> {
  children?: ReactNode;
}

export function TableFooterRow({ children, ...rest }: TableFooterRowProps) {
  return (
    <tr className="fds-table__footer-row" {...rest}>
      {children}
    </tr>
  );
}
