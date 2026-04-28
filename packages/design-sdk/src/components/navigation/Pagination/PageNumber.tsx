import type { ButtonHTMLAttributes } from 'react';
import { cn } from '../../../utils/cn';
import './PageNumber.css';

export interface PageNumberProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  page: number;
  isSelected?: boolean;
}

export function PageNumber({ page, isSelected = false, className, ...props }: PageNumberProps) {
  return (
    <button
      type="button"
      className={cn('fds-page-number', isSelected && 'fds-page-number--selected', isSelected ? 'BodyMediumSemibold' : 'BodyMediumRegular', className)}
      aria-current={isSelected ? 'page' : undefined}
      tabIndex={isSelected ? -1 : 0}
      {...props}
    >
      {page}
    </button>
  );
}

PageNumber.displayName = 'PageNumber';
