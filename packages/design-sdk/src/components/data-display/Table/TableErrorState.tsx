import './TableErrorState.css';
import type { ReactNode } from 'react';

export interface TableErrorStateProps {
  children?: ReactNode;
}

export function TableErrorState({ children }: TableErrorStateProps) {
  return <div className="fds-table__error-state">{children}</div>;
}
