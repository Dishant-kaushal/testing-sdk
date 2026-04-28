import type { HTMLAttributes, ReactNode } from 'react';

export interface TableToolbarActionsProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

export function TableToolbarActions({ children, ...rest }: TableToolbarActionsProps) {
  return (
    <div className="fds-table__toolbar-actions" {...rest}>
      {children}
    </div>
  );
}
