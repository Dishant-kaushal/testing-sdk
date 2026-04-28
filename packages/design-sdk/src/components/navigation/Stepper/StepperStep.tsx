import {
  Children,
  cloneElement,
  forwardRef,
  isValidElement,
  useMemo,
  type CSSProperties,
  type MouseEvent,
  type ReactElement,
  type ReactNode,
} from 'react';
import { cn } from '../../../utils/cn';
import { useStepper } from './StepperContext';
import { StepperIndicator } from './StepperIndicator';
import { StepLine, type StepLineStepProgress, type StepLineStepType } from './StepLine';
import './StepperStep.css';

export type StepperStepProgress = StepLineStepProgress;

export interface StepperStepProps {
  /** Header title text. */
  title: string;
  /** Optional title colour override. Same Faclon token names used elsewhere. */
  titleColor?: string;
  /** Optional subtitle. */
  description?: string;
  /** Connector line state. Default `'none'`. */
  stepProgress?: StepperStepProgress;
  /** Marker JSX slot — `<StepperIndicator>` or `<StepperIcon>`. Defaults to a
   *  neutral indicator. */
  marker?: ReactElement;
  /** Vertical-only. Right-aligned slot in the header — typically a `<Badge>`. */
  trailing?: ReactElement;
  /** Selected highlight. Style hooks land in Step 4. */
  isSelected?: boolean;
  /** Mutes text + suppresses interaction. Forwarded to the marker. */
  isDisabled?: boolean;
  /** Anchor `href` — turns the step into an `<a>`. */
  href?: string;
  /** Anchor `target` — used alongside `href`. */
  target?: string;
  /** Click handler — turns the step into a `<button>`. */
  onClick?: (event: MouseEvent) => void;
  /** Children rendered below the header — additional custom content. */
  children?: ReactNode;
  /** @internal — injected by parent <Stepper>. */
  _index?: number;
  /** @internal — injected by parent <Stepper>. Global index across nesting. */
  _totalIndex?: number;
  /** @internal — injected by parent <Stepper>. */
  _nestingLevel?: number;
  className?: string;
  style?: CSSProperties;
}

function getStepType(
  index: number,
  nestingLevel: number,
  itemsCount: number,
): StepLineStepType {
  if (nestingLevel === 0) return 'default';
  if (itemsCount === 1) return 'single-item';
  if (index === 0) return 'start';
  if (index === itemsCount - 1) return 'end';
  return 'middle';
}

const DEFAULT_MARKER = <StepperIndicator color="neutral" />;

export const StepperStep = forwardRef<HTMLDivElement, StepperStepProps>(
  (
    {
      title,
      titleColor,
      description,
      stepProgress = 'none',
      marker,
      trailing,
      isSelected,
      isDisabled,
      href,
      target,
      onClick,
      children,
      _index = 0,
      _totalIndex = 0,
      _nestingLevel = 0,
      className,
      style,
    },
    ref,
  ) => {
    const {
      itemsInGroupCount,
      totalItemsInParentGroupCount,
      orientation,
    } = useStepper();

    const stepType = useMemo(
      () => getStepType(_index, _nestingLevel, itemsInGroupCount),
      [_index, _nestingLevel, itemsInGroupCount],
    );

    const isVertical = orientation === 'vertical';
    const isFirstItem = _totalIndex === 0;
    const isLastItem = _totalIndex === totalItemsInParentGroupCount - 1;
    const isInteractive = Boolean(href) || Boolean(onClick);

    if (process.env.NODE_ENV !== 'production') {
      if (trailing && orientation === 'horizontal') {
        // eslint-disable-next-line no-console
        console.warn('[StepperStep] `trailing` is ignored in horizontal Stepper.');
      }
      if (_nestingLevel >= 1 && orientation === 'horizontal') {
        // eslint-disable-next-line no-console
        console.warn(
          '[StepperStep] Nested Steppers are not supported in horizontal orientation.',
        );
      }
      // Nested Steppers must be SIBLINGS of StepperStep items in the parent
      // Stepper, not children of one. Otherwise the flattener never sees them
      // and the nested-curve geometry can't render.
      let hasNestedStepperInChildren = false;
      Children.forEach(children, (child) => {
        if (
          isValidElement(child) &&
          (child.type as { displayName?: string })?.displayName === 'Stepper'
        ) {
          hasNestedStepperInChildren = true;
        }
      });
      if (hasNestedStepperInChildren) {
        // eslint-disable-next-line no-console
        console.warn(
          '[StepperStep] Found a nested <Stepper> inside `children`. ' +
            'Move it OUT of <StepperStep> and render it as a SIBLING of the ' +
            'StepperStep items in the parent <Stepper> for nesting curves to render.',
        );
      }
    }

    const resolvedMarker = isValidElement(marker)
      ? cloneElement(marker as ReactElement<{ isDisabled?: boolean }>, {
          isDisabled:
            isDisabled ?? (marker.props as { isDisabled?: boolean }).isDisabled,
        })
      : DEFAULT_MARKER;

    // Hover + selected backgrounds follow the marker's color family per
    // Figma 3391:17811 / 3520:16271. Read the colour off the marker prop so
    // CSS rules under `[data-color='...']` can pick the right token.
    const markerColor =
      (isValidElement(marker)
        ? (marker.props as { color?: string }).color
        : undefined) ?? 'neutral';

    const headerInner = (
      <div className="fds-stepper-step__header">
        <div className="fds-stepper-step__text-stack">
          <p
            className="fds-stepper-step__title BodyMediumRegular"
            style={titleColor ? { color: titleColor } : undefined}
          >
            {title}
          </p>
          {description && (
            <p className="fds-stepper-step__description BodySmallRegular">
              {description}
            </p>
          )}
        </div>
        {trailing && isVertical && (
          <span className="fds-stepper-step__trailing">{trailing}</span>
        )}
      </div>
    );

    const headerProps = {
      className: cn(
        'fds-stepper-step__header-box',
        isInteractive && 'fds-stepper-step__header-box--interactive',
      ),
    };

    let header: ReactElement;
    if (href) {
      header = (
        <a
          {...headerProps}
          href={isDisabled ? undefined : href}
          target={target}
          aria-disabled={isDisabled || undefined}
          onClick={isDisabled ? (e) => e.preventDefault() : onClick}
        >
          {headerInner}
        </a>
      );
    } else if (onClick) {
      header = (
        <button
          {...headerProps}
          type="button"
          disabled={isDisabled}
          onClick={onClick}
        >
          {headerInner}
        </button>
      );
    } else {
      header = <div {...headerProps}>{headerInner}</div>;
    }

    return (
      <div
        ref={ref}
        className={cn('fds-stepper-step', className)}
        style={style}
        role="group"
        aria-label={title}
        aria-current={isSelected ? 'step' : undefined}
        aria-disabled={isDisabled || undefined}
        data-orientation={orientation}
        data-nesting-level={_nestingLevel}
        data-selected={isSelected || undefined}
        data-disabled={isDisabled || undefined}
        data-color={markerColor}
      >
        <StepLine
          stepType={stepType}
          shouldShowStartBranch={!isFirstItem}
          shouldShowEndBranch={!isLastItem}
          marker={resolvedMarker}
          stepProgress={stepProgress}
        />
        <div
          className={cn(
            'fds-stepper-step__body',
            isInteractive && 'fds-stepper-step__body--interactive',
          )}
          data-selected={isSelected || undefined}
          data-interactive={isInteractive || undefined}
        >
          {header}
          {children && <div className="fds-stepper-step__slot">{children}</div>}
        </div>
      </div>
    );
  },
);

StepperStep.displayName = 'StepperStep';
