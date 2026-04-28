import {
  Children,
  cloneElement,
  forwardRef,
  isValidElement,
  useMemo,
  type HTMLAttributes,
  type ReactElement,
  type ReactNode,
} from 'react';
import { cn } from '../../../utils/cn';
import { StepperStep } from './StepperStep';
import {
  StepperContext,
  useStepper,
  type StepperContextValue,
  type StepperOrientation,
} from './StepperContext';
import './Stepper.css';

export type { StepperOrientation } from './StepperContext';

export interface StepperProps extends HTMLAttributes<HTMLDivElement> {
  /** `<StepperStep>` children. For nesting, render a nested `<Stepper>` as a
   *  SIBLING of the StepperStep items (not inside one of them). The flattener
   *  walks siblings to build the curved connector between parent and nested
   *  groups — Blade's StepGroup model verbatim. */
  children: ReactNode;
  /** Flow direction. Default `'vertical'`. */
  orientation?: StepperOrientation;
  /** @internal — set by parent Stepper when this is a nested group. */
  _nestingLevel?: number;
}

/* ═══════════════════════════════════════════════════════════════════════════
   Stepper — port of Blade StepGroup.web.tsx
   ═══════════════════════════════════════════════════════════════════════════ */

function isStepperType(type: unknown): type is typeof Stepper {
  return (
    typeof type !== 'string' &&
    (type as { displayName?: string })?.displayName === 'Stepper'
  );
}

function isStepperStepType(type: unknown): boolean {
  return type === StepperStep;
}

interface InjectedStepProps {
  _index?: number;
  _totalIndex?: number;
  _nestingLevel?: number;
}

/** Walks the child tree and injects `_index` / `_totalIndex` / `_nestingLevel`
 *  into every <StepperStep>. Nested <Stepper>s are recursed into; their
 *  children get continued indexing. Mirrors Blade's `useChildrenWithIndexes`. */
function useChildrenWithIndexes({
  children,
  orientation,
  _nestingLevel,
}: {
  children: ReactNode;
  orientation: StepperOrientation;
  _nestingLevel: number;
}): { childrenWithIndex: ReactNode; totalItemsInParentGroupCount: number } {
  const parent = useStepper();

  const result = useMemo(() => {
    let totalIndex = 0;
    const traverse = (
      node: ReactNode,
      nestingLevelOfGroup: number,
      stepItemIndex: number,
    ): ReactNode => {
      let runningIndex = stepItemIndex;
      return Children.map(node, (child, key) => {
        if (!isValidElement(child)) return child;

        if (isStepperStepType(child.type)) {
          const injected: InjectedStepProps = {
            _index: runningIndex++,
            _totalIndex: totalIndex++,
            _nestingLevel: nestingLevelOfGroup,
          };
          return cloneElement(child as ReactElement, { ...injected, key });
        }

        if (isStepperType(child.type) && nestingLevelOfGroup < 3) {
          return cloneElement(child as ReactElement<StepperProps>, {
            orientation,
            _nestingLevel: nestingLevelOfGroup + 1,
            children: traverse(
              (child.props as StepperProps).children,
              nestingLevelOfGroup + 1,
              0,
            ),
          });
        }

        return child;
      });
    };

    const out = _nestingLevel === 0 ? traverse(children, 0, 0) : children;
    return {
      childrenWithIndex: out,
      totalIndex,
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [children, _nestingLevel, orientation]);

  const totalItemsInParentGroupCount =
    _nestingLevel === 0 ? result.totalIndex : parent.totalItemsInParentGroupCount;

  return {
    childrenWithIndex: result.childrenWithIndex,
    totalItemsInParentGroupCount,
  };
}

export const Stepper = forwardRef<HTMLDivElement, StepperProps>(
  (
    {
      children,
      orientation = 'vertical',
      _nestingLevel = 0,
      className,
      ...props
    },
    ref,
  ) => {
    const itemsInGroupCount = Children.count(children);
    const { childrenWithIndex, totalItemsInParentGroupCount } = useChildrenWithIndexes({
      children,
      orientation,
      _nestingLevel,
    });

    const ctx: StepperContextValue = useMemo(
      () => ({
        orientation,
        itemsInGroupCount,
        totalItemsInParentGroupCount,
      }),
      [orientation, itemsInGroupCount, totalItemsInParentGroupCount],
    );

    return (
      <StepperContext.Provider value={ctx}>
        <div
          ref={ref}
          className={cn('fds-stepper', className)}
          data-orientation={orientation}
          data-nesting-level={_nestingLevel}
          {...props}
        >
          {childrenWithIndex}
        </div>
      </StepperContext.Provider>
    );
  },
);

Stepper.displayName = 'Stepper';
