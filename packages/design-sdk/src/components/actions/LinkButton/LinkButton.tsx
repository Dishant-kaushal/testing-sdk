import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { cn } from '../../../utils/cn';
import './LinkButton.css';

export type LinkType = 'Anchor' | 'Action';
export type LinkColor = 'Primary' | 'Neutral' | 'Negative' | 'Positive' | 'Warning' | 'Info';
export type LinkSize = 'Large' | 'Medium' | 'Small' | 'XSmall';

export interface LinkButtonProps extends Omit<HTMLAttributes<HTMLElement>, 'onClick'> {
  /** Link variant — Anchor (navigational <a>) or Action (interactive <button>) */
  type?: LinkType;
  /** Semantic color — Primary (brand), Neutral (default text), Negative (destructive), Positive (success), Warning (notice), Info (information) */
  color?: LinkColor;
  /** Size of the link */
  size?: LinkSize;
  /** Link label text */
  label?: string;
  /** Leading icon slot */
  leadingIcon?: ReactNode;
  /** Trailing icon slot */
  trailingIcon?: ReactNode;
  /** Disables interaction (Action type only) */
  isDisabled?: boolean;
  /** Content (alternative to label) */
  children?: ReactNode;
  /** href for Anchor type */
  href?: string;
  /** target for Anchor type */
  target?: string;
  /** rel for Anchor type */
  rel?: string;
  /** Click handler */
  onClick?: React.MouseEventHandler;
}

const TYPOGRAPHY_ANCHOR: Record<LinkSize, string> = {
  Large: 'BodyLargeRegular',
  Medium: 'BodyMediumRegular',
  Small: 'BodySmallRegular',
  XSmall: 'BodyXSmallRegular',
};

const TYPOGRAPHY_ACTION: Record<LinkSize, string> = {
  Large: 'BodyLargeSemibold',
  Medium: 'BodyMediumSemibold',
  Small: 'BodySmallSemibold',
  XSmall: 'BodyXSmallSemibold',
};

export const LinkButton = forwardRef<HTMLAnchorElement | HTMLButtonElement, LinkButtonProps>(
  (
    {
      type = 'Anchor',
      color = 'Primary',
      size = 'Large',
      label,
      leadingIcon,
      trailingIcon,
      isDisabled = false,
      className,
      children,
      href,
      target,
      rel,
      onClick,
      ...rest
    },
    ref
  ) => {
    const typographyMap = type === 'Action' ? TYPOGRAPHY_ACTION : TYPOGRAPHY_ANCHOR;

    const classes = cn(
      'fds-link',
      `fds-link--type-${type.toLowerCase()}`,
      `fds-link--color-${color.toLowerCase()}`,
      typographyMap[size],
      className,
    );

    // When the label is a plain string, expose it via data-text so the CSS
    // grid trick in LinkButton.css can pre-reserve the heavier font-weight's
    // width — this prevents layout shift on hover/focus (Anchor variants
    // bump font-weight from Regular→Medium on state change).
    const labelContent = label ?? children;
    const labelDataText = typeof labelContent === 'string' ? labelContent : undefined;

    const content = (
      <>
        {leadingIcon && <span className="fds-link__icon">{leadingIcon}</span>}
        <span className="fds-link__label" data-text={labelDataText}>
          <span className="fds-link__label-inner">{labelContent}</span>
        </span>
        {trailingIcon && <span className="fds-link__icon">{trailingIcon}</span>}
      </>
    );

    if (type === 'Action') {
      return (
        <button
          ref={ref as React.Ref<HTMLButtonElement>}
          className={classes}
          type="button"
          disabled={isDisabled}
          aria-disabled={isDisabled || undefined}
          onClick={onClick}
          {...rest}
        >
          {content}
        </button>
      );
    }

    return (
      <a
        ref={ref as React.Ref<HTMLAnchorElement>}
        className={classes}
        href={href}
        target={target}
        rel={rel}
        onClick={onClick}
        {...rest}
      >
        {content}
      </a>
    );
  }
);

LinkButton.displayName = 'LinkButton';
