import type { HTMLAttributes, ReactNode } from 'react';

export interface TableSurfaceProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

export function TableSurface({ children, ...rest }: TableSurfaceProps) {
  return (
    <div className="fds-table__surface" {...rest}>
      {children}
    </div>
  );
}
