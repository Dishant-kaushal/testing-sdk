import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import {
  AlertCircle,
  AlertTriangle,
  CheckCircle,
  Info,
  X,
} from 'react-feather';
import { cn } from '../../../utils/cn';
import { IconButton } from '../../actions/IconButton/IconButton';
import './Alert.css';

export type AlertColor = 'Positive' | 'Negative' | 'Notice' | 'Information' | 'Neutral';
export type AlertEmphasis = 'Subtle' | 'Intense';

export interface AlertProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Bold title — required. */
  title: string;
  /** Body text below the title. */
  description?: ReactNode;
  /** Semantic color family. Default: `Information`. */
  color?: AlertColor;
  /** Visual weight. Default: `Subtle`. */
  emphasis?: AlertEmphasis;
  /** Drives both width AND layout:
   *  - `true`  → full width + stacked (close × top-right, actions below description)
   *  - `false` → compact width + inline (primary/secondary/close × trailing). Default. */
  isFullWidth?: boolean;
  /** Override the auto-picked icon for the given `color`. */
  icon?: ReactNode;
  /** Primary action — usually a `<Button>`. */
  primaryAction?: ReactNode;
  /** Secondary action — usually a `<LinkButton>`. */
  secondaryAction?: ReactNode;
  /** Renders the close × button. Default: `false`. */
  isDismissible?: boolean;
  /** Fired when the × is clicked. */
  onDismiss?: () => void;
  /** `aria-label` for the close × button. Default: `'Dismiss alert'`. */
  dismissAriaLabel?: string;
}

const DEFAULT_ICON: Record<AlertColor, ReactNode> = {
  Positive: <CheckCircle />,
  Negative: <AlertCircle />,
  Notice: <AlertTriangle />,
  Information: <Info />,
  Neutral: <Info />,
};

export const Alert = forwardRef<HTMLDivElement, AlertProps>(
  (
    {
      title,
      description,
      color = 'Information',
      emphasis = 'Subtle',
      isFullWidth = false,
      icon,
      primaryAction,
      secondaryAction,
      isDismissible = false,
      onDismiss,
      dismissAriaLabel = 'Dismiss alert',
      className,
      ...rest
    },
    ref,
  ) => {
    const resolvedIcon = icon ?? DEFAULT_ICON[color];

    const closeButton = isDismissible ? (
      <IconButton
        size="16"
        icon={<X />}
        onClick={onDismiss}
        aria-label={dismissAriaLabel}
        className="fds-alert__close"
      />
    ) : null;

    const hasActions = Boolean(primaryAction || secondaryAction);

    return (
      <div
        ref={ref}
        role="alert"
        className={cn('fds-alert', className)}
        data-color={color}
        data-emphasis={emphasis}
        data-full-width={isFullWidth || undefined}
        {...rest}
      >
        <span className="fds-alert__leading-icon" aria-hidden="true">
          {resolvedIcon}
        </span>

        <div className="fds-alert__content">
          <div className="fds-alert__header">
            <p className="fds-alert__title BodyMediumSemibold">{title}</p>
            {isFullWidth && closeButton}
          </div>
          {description && (
            <p className="fds-alert__description BodySmallRegular">{description}</p>
          )}
          {isFullWidth && hasActions && (
            <div className="fds-alert__actions">
              {primaryAction}
              {secondaryAction}
            </div>
          )}
        </div>

        {!isFullWidth && (hasActions || closeButton) && (
          <div className="fds-alert__trailing">
            {primaryAction}
            {secondaryAction}
            {closeButton}
          </div>
        )}
      </div>
    );
  },
);

Alert.displayName = 'Alert';
