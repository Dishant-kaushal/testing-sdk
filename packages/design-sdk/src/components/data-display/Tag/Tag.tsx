import type { HTMLAttributes, ReactNode } from 'react';
import { X } from 'react-feather';
import { IconButton } from '../../actions/IconButton/IconButton';
import { cn } from '../../../utils/cn';
import './Tag.css';

export type TagSize = 'Medium' | 'Large';

export interface TagProps extends HTMLAttributes<HTMLDivElement> {
  /** Tag label text */
  label: string;
  /** Size of the tag */
  size?: TagSize;
  /** Whether the tag is disabled */
  isDisabled?: boolean;
  /** Optional leading icon slot */
  leadingIcon?: ReactNode;
  /** Called when the dismiss button is clicked */
  onDismiss?: () => void;
}

export function Tag({
  label,
  size = 'Medium',
  isDisabled = false,
  leadingIcon,
  onDismiss,
  className,
  ...props
}: TagProps) {
  const classes = cn(
    'fds-tag',
    `fds-tag--size-${size.toLowerCase()}`,
    isDisabled && 'fds-tag--disabled',
    className,
  );

  return (
    <div className={classes} {...props}>
      {leadingIcon && (
        <span className="fds-tag__icon">{leadingIcon}</span>
      )}
      <span className="fds-tag__label BodySmallRegular">{label}</span>
      <IconButton
        icon={<X size={12} />}
        size="12"
        onClick={isDisabled ? undefined : onDismiss}
        isDisabled={isDisabled}
        aria-label="Dismiss"
        className="fds-tag__dismiss"
      />
    </div>
  );
}

Tag.displayName = 'Tag';
