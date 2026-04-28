import type { ReactNode, HTMLAttributes } from 'react';
import { cn } from '../../../utils/cn';
import { Divider } from '../../layout/Divider/Divider';
import './ActionListItem.css';

export type ActionListContentType = 'Item' | 'Separator' | 'SectionHeading';
export type ActionListSelectionType = 'None' | 'Single' | 'Multiple';

export interface ActionListItemProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Content type — Item (interactive), Separator (divider), or SectionHeading (group label) */
  contentType?: ActionListContentType;
  /** Selection type — None (default), Single (highlight only), Multiple (checkbox indicator) */
  selectionType?: ActionListSelectionType;
  /** Item title text */
  title?: string;
  /** Description text below the title */
  description?: string;
  /** Leading icon slot — pass a 16px icon. Ignored when selectionType is Multiple. */
  leadingIcon?: ReactNode;
  /** Trailing content slot — keyboard shortcut text, icon, etc. */
  trailing?: ReactNode;
  /** Badge group slot — shown next to the title */
  badges?: ReactNode;
  /** Whether the item is selected */
  isSelected?: boolean;
  /** Whether the item is disabled */
  isDisabled?: boolean;
  /** Whether the item is destructive (red text) */
  isDestructive?: boolean;
}

const CheckIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 3L4.5 8.5L2 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export function ActionListItem({
  contentType = 'Item',
  selectionType = 'None',
  title,
  description,
  leadingIcon,
  trailing,
  badges,
  isSelected = false,
  isDisabled = false,
  isDestructive = false,
  className,
  ...props
}: ActionListItemProps) {
  if (contentType === 'Separator') {
    return (
      <div className={cn('fds-action-list-item fds-action-list-item--separator', className)} {...props}>
        <Divider variant="Muted" />
      </div>
    );
  }

  if (contentType === 'SectionHeading') {
    return (
      <div className={cn('fds-action-list-item fds-action-list-item--heading', className)} {...props}>
        <div className="fds-action-list-item__heading-wrapper">
          <div className="fds-action-list-item__heading-body">
            <span className="fds-action-list-item__heading-title BodySmallSemibold">
              {title}
            </span>
          </div>
          {trailing && (
            <div className="fds-action-list-item__trailing BodySmallRegular">
              {trailing}
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        'fds-action-list-item',
        isSelected && 'fds-action-list-item--selected',
        selectionType === 'Multiple' && 'fds-action-list-item--selection-multiple',
        isDisabled && 'fds-action-list-item--disabled',
        isDestructive && 'fds-action-list-item--destructive',
        className,
      )}
      role="menuitem"
      aria-disabled={isDisabled || undefined}
      tabIndex={isDisabled ? -1 : 0}
      {...props}
    >
      <div className="fds-action-list-item__wrapper">
        <div className="fds-action-list-item__body">
          {selectionType === 'Multiple' ? (
            <div className="fds-action-list-item__checkbox-container">
              <div className={cn('fds-action-list-item__checkbox-box', isSelected && 'fds-action-list-item__checkbox-box--checked')}>
                {isSelected && <CheckIcon />}
              </div>
            </div>
          ) : leadingIcon ? (
            <span className="fds-action-list-item__leading">{leadingIcon}</span>
          ) : null}
          <div className="fds-action-list-item__content">
            <div className="fds-action-list-item__title-row">
              <span className="fds-action-list-item__title BodyMediumRegular">{title}</span>
              {badges && (
                <div className="fds-action-list-item__badge-group">
                  {badges}
                </div>
              )}
            </div>
            {description && (
              <span className="fds-action-list-item__description BodySmallRegular">
                {description}
              </span>
            )}
          </div>
        </div>
        {trailing && (
          <div className="fds-action-list-item__trailing BodySmallRegular">
            {trailing}
          </div>
        )}
      </div>
    </div>
  );
}

ActionListItem.displayName = 'ActionListItem';
