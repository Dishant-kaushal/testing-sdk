import type { HTMLAttributes } from 'react';
import { cn } from '../../../utils/cn';
import './Divider.css';

export type DividerThickness = 'Thinner' | 'Thin' | 'Thick' | 'Thicker';
export type DividerLineStyle = 'Solid' | 'Dashed';
export type DividerVariant = 'Normal' | 'Subtle' | 'Muted';
export type DividerOrientation = 'Horizontal' | 'Vertical';

export interface DividerProps extends HTMLAttributes<HTMLElement> {
  /** Border width — Thinner (0.5px), Thin (1px), Thick (1.5px), Thicker (2px) */
  thickness?: DividerThickness;
  /** Line style — solid or dashed */
  lineStyle?: DividerLineStyle;
  /** Color variant */
  variant?: DividerVariant;
  /** Orientation — horizontal (full width) or vertical (full height of parent) */
  orientation?: DividerOrientation;
}

export function Divider({
  thickness = 'Thin',
  lineStyle = 'Solid',
  variant = 'Normal',
  orientation = 'Horizontal',
  className,
  ...props
}: DividerProps) {
  const classes = cn(
    'fds-divider',
    `fds-divider--thickness-${thickness.toLowerCase()}`,
    `fds-divider--style-${lineStyle.toLowerCase()}`,
    `fds-divider--variant-${variant.toLowerCase()}`,
    `fds-divider--orientation-${orientation.toLowerCase()}`,
    className,
  );

  if (orientation === 'Vertical') {
    return (
      <div
        role="separator"
        aria-orientation="vertical"
        className={classes}
        {...props}
      />
    );
  }

  return <hr className={classes} {...props} />;
}

Divider.displayName = 'Divider';
