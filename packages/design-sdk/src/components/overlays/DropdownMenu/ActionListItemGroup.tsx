import type { ReactNode, HTMLAttributes } from 'react';
import { cn } from '../../../utils/cn';
import './ActionListItemGroup.css';

export interface ActionListItemGroupProps extends HTMLAttributes<HTMLDivElement> {
  /** ActionListItem components */
  children?: ReactNode;
}

export function ActionListItemGroup({
  children,
  className,
  ...props
}: ActionListItemGroupProps) {
  return (
    <div className={cn('fds-action-list-group', className)} role="group" {...props}>
      {children}
    </div>
  );
}

ActionListItemGroup.displayName = 'ActionListItemGroup';
