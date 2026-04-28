import './CellButtons.css';
import type { MouseEvent as ReactMouseEvent, ReactNode } from 'react';
import { Button } from '../../../actions/Button/Button';
import { cn } from '../../../../utils/cn';

export interface CellButton {
  label: string;
  onClick: (e: ReactMouseEvent) => void;
  leadingIcon?: ReactNode;
  isDisabled?: boolean;
  isLoading?: boolean;
}

export interface CellButtonsProps {
  /** Primary action — rendered on the right (button order: secondary, primary). */
  primary?: CellButton;
  /** Secondary action — rendered to the left of primary (if both present). */
  secondary?: CellButton;
  className?: string;
}

/**
 * CellButtons — up to two XSmall Buttons, right-aligned.
 * Drop inside `<TableCell contentType="buttons">`. Maps to Figma node
 * 1313:12938. Primary = DS `Primary` variant, Secondary = DS `Gray`
 * variant (matches Figma's gray-bg filled-outline secondary). Both use
 * `size="XSmall"` (28 px tall) to fit the 40 px row.
 */
export function CellButtons({ primary, secondary, className }: CellButtonsProps) {
  return (
    <span className={cn('fds-table-cell-buttons', className)}>
      {secondary && (
        <Button
          variant="Gray"
          size="XSmall"
          label={secondary.label}
          leadingIcon={secondary.leadingIcon}
          isDisabled={secondary.isDisabled}
          isLoading={secondary.isLoading}
          onClick={(e) => {
            e.stopPropagation();
            secondary.onClick(e);
          }}
        />
      )}
      {primary && (
        <Button
          variant="Primary"
          size="XSmall"
          label={primary.label}
          leadingIcon={primary.leadingIcon}
          isDisabled={primary.isDisabled}
          isLoading={primary.isLoading}
          onClick={(e) => {
            e.stopPropagation();
            primary.onClick(e);
          }}
        />
      )}
    </span>
  );
}
