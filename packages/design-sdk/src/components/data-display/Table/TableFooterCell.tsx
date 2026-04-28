import type { ReactNode, TdHTMLAttributes } from 'react';
import { cn } from '../../../utils/cn';

export interface TableFooterCellProps extends TdHTMLAttributes<HTMLTableCellElement> {
  children?: ReactNode;
}

export function TableFooterCell({ children, className, ...rest }: TableFooterCellProps) {
  return (
    <td
      className={cn('fds-table__footer-cell', 'BodyMediumSemibold', className)}
      {...rest}
    >
      {children}
    </td>
  );
}
