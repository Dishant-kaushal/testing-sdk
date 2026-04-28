import './TableBody.css';
import type { HTMLAttributes, ReactNode } from 'react';

export interface TableBodyProps extends HTMLAttributes<HTMLTableSectionElement> {
  children?: ReactNode;
}

export function TableBody({ children, ...rest }: TableBodyProps) {
  return (
    <tbody className="fds-table__body" {...rest}>
      {children}
    </tbody>
  );
}
