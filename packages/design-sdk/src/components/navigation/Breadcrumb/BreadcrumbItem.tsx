import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '../../../utils/cn';
import { LinkButton } from '../../actions/LinkButton/LinkButton';
import { IconButton } from '../../actions/IconButton/IconButton';
import type { LinkSize } from '../../actions/LinkButton/LinkButton';
import type { IconButtonSize } from '../../actions/IconButton/IconButton';
import './BreadcrumbItem.css';

/* ═══════════════════════════════════════════════════════════════════════════
   Types
   ═══════════════════════════════════════════════════════════════════════════ */

export type BreadcrumbItemType = 'Text' | 'Icon';
export type BreadcrumbSize = 'Small' | 'Medium' | 'Large';

export interface BreadcrumbItemProps
  extends Omit<HTMLAttributes<HTMLLIElement>, 'onClick'> {
  /** Whether this item renders text or an icon */
  type?: BreadcrumbItemType;
  /** Whether this is the current/active page */
  currentItem?: boolean;
  /** Whether to show the "/" separator after this item */
  showSeparator?: boolean;
  /** Size — controls typography and icon dimensions */
  size?: BreadcrumbSize;
  /** Display text for Text type */
  value?: string;
  /** Icon slot for Icon type (e.g. <Home size={12} />) */
  icon?: ReactNode;
  /** href for navigation (passed to LinkButton) */
  href?: string;
  /** target for anchor (passed to LinkButton) */
  target?: string;
  /** rel for anchor (passed to LinkButton) */
  rel?: string;
  /** Click handler */
  onClick?: React.MouseEventHandler;
  /** Accessible label (especially useful for Icon type) */
  'aria-label'?: string;
}

/* ═══════════════════════════════════════════════════════════════════════════
   Token maps
   ═══════════════════════════════════════════════════════════════════════════ */

const TYPOGRAPHY: Record<BreadcrumbSize, string> = {
  Small: 'BodySmallMedium',
  Medium: 'BodyMediumMedium',
  Large: 'BodyLargeMedium',
};

const ICON_BTN_SIZE: Record<BreadcrumbSize, IconButtonSize> = {
  Small: '12',
  Medium: '16',
  Large: '16',
};

const LINK_BTN_SIZE: Record<BreadcrumbSize, LinkSize> = {
  Small: 'Small',
  Medium: 'Medium',
  Large: 'Large',
};

/* ═══════════════════════════════════════════════════════════════════════════
   BreadcrumbItem
   Figma: 2774:11736
   Reuses LinkButton (text items) and IconButton (icon items) internally
   ═══════════════════════════════════════════════════════════════════════════ */

export function BreadcrumbItem({
  type = 'Text',
  currentItem = false,
  showSeparator = true,
  size = 'Medium',
  value,
  icon,
  href,
  target,
  rel,
  onClick,
  'aria-label': ariaLabel,
  className,
  ...rest
}: BreadcrumbItemProps) {
  const typoClass = TYPOGRAPHY[size];

  return (
    <li className={cn('fds-breadcrumb-item', className)} {...rest}>
      {currentItem ? (
        <span className={cn('fds-breadcrumb-item__current', typoClass)} aria-current="page">
          {type === 'Icon' ? icon : value}
        </span>
      ) : type === 'Icon' ? (
        <IconButton
          icon={icon}
          size={ICON_BTN_SIZE[size]}
          className="fds-breadcrumb-item__action"
          onClick={onClick}
          aria-label={ariaLabel}
        />
      ) : (
        <LinkButton
          type="Action"
          color="Neutral"
          size={LINK_BTN_SIZE[size]}
          label={value}
          href={href}
          target={target}
          rel={rel}
          onClick={onClick}
          className="fds-breadcrumb-item__action"
          aria-label={ariaLabel}
        />
      )}
      {showSeparator && (
        <span className={cn('fds-breadcrumb-item__separator', typoClass)} aria-hidden="true">
          /
        </span>
      )}
    </li>
  );
}

BreadcrumbItem.displayName = 'BreadcrumbItem';
