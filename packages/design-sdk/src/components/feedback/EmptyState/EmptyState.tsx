import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { Info } from 'react-feather';
import { cn } from '../../../utils/cn';
import './EmptyState.css';

/** Default icon size for the help-row info glyph (Figma 1025:9446 spec). */
const HELP_ICON_SIZE = 12;

export type EmptyStateSize = 'Medium' | 'Large';

export interface EmptyStateProps extends HTMLAttributes<HTMLDivElement> {
  /** Illustration slot. Pass one of the exported illustrations (e.g. <NoDataOneIllustration />)
   *  or any custom ReactNode (img, svg, icon). */
  illustration?: ReactNode;
  /** Main heading — always required */
  title: string;
  /** Muted secondary text below the title */
  description?: string;
  /** Primary action — typically a `<Button variant="Primary">` */
  primaryAction?: ReactNode;
  /** Secondary action — typically a `<Button variant="Secondary">` rendered beside primary */
  secondaryAction?: ReactNode;
  /** Static text before the help link — e.g. "Need help?". Typed as `BodyXSmallRegular`. */
  helpText?: string;
  /** Clickable help link, usually a `<LinkButton>`. Typed as `BodyXSmallMedium`. */
  helpLink?: ReactNode;
  /** Leading icon for the help row. Defaults to react-feather `<Info size={12} />`.
   *  Pass `null` to hide the icon. */
  helpLinkIcon?: ReactNode;
  /** Size variant — Medium (default) or Large. Controls illustration size + title typography. */
  size?: EmptyStateSize;
}

/* ═══════════════════════════════════════════════════════════════════════════
   EmptyState — Faclon Design System 2.0
   Figma: 1058:252 (component) + 1079:1397 (action variants)
   ═══════════════════════════════════════════════════════════════════════════ */

export const EmptyState = forwardRef<HTMLDivElement, EmptyStateProps>(
  (
    {
      illustration,
      title,
      description,
      primaryAction,
      secondaryAction,
      helpText,
      helpLink,
      helpLinkIcon = <Info size={HELP_ICON_SIZE} />,
      size = 'Medium',
      className,
      ...props
    },
    ref,
  ) => {
    const showActions = !!primaryAction || !!secondaryAction;
    const showHelp = !!helpText || !!helpLink;
    const showActionsBlock = showActions || showHelp;

    return (
      <div
        ref={ref}
        className={cn(
          'fds-empty-state',
          `fds-empty-state--size-${size.toLowerCase()}`,
          className,
        )}
        role="status"
        {...props}
      >
        {illustration && (
          <div className="fds-empty-state__illustration">{illustration}</div>
        )}

        <div className="fds-empty-state__text">
          <p className="fds-empty-state__title HeadingSmallSemibold">{title}</p>
          {description && (
            <p className="fds-empty-state__description BodySmallRegular">
              {description}
            </p>
          )}
        </div>

        {showActionsBlock && (
          <div className="fds-empty-state__actions-block">
            {showActions && (
              <div className="fds-empty-state__actions">
                {secondaryAction}
                {primaryAction}
              </div>
            )}
            {showHelp && (
              <div className="fds-empty-state__help">
                {helpLinkIcon && (
                  <span className="fds-empty-state__help-icon">{helpLinkIcon}</span>
                )}
                {helpText && (
                  <span className="fds-empty-state__help-text BodyXSmallRegular">
                    {helpText}
                  </span>
                )}
                {helpLink && (
                  <span className="fds-empty-state__help-link">{helpLink}</span>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    );
  },
);

EmptyState.displayName = 'EmptyState';
