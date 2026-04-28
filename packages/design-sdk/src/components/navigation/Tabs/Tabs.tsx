import {
  Children,
  forwardRef,
  isValidElement,
  useCallback,
  useId,
  useMemo,
  useRef,
  type HTMLAttributes,
  type KeyboardEvent,
  type ReactNode,
} from 'react';
import { cn } from '../../../utils/cn';
import { useControllableState } from '../../../hooks/useControllableState';
import {
  TabsContext,
  type TabsContextValue,
  type TabsOrientation,
  type TabsSize,
  type TabsVariant,
} from './TabsContext';
import { TabIndicator } from './TabIndicator';
import './Tabs.css';

export interface TabsProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** Controlled selected value. */
  value?: string;
  /** Uncontrolled initial selected value. */
  defaultValue?: string;
  /** Fired when selection changes (both controlled and uncontrolled).
   *  Named `onChange` to match Blade's Tabs API. */
  onChange?: (value: string) => void;
  /** Visual style. */
  variant?: TabsVariant;
  size?: TabsSize;
  orientation?: TabsOrientation;
  /**
   * When true, TabItems stretch to share the tablist width. Horizontal-only —
   * vertical TabItems always fill the parent width regardless of this prop.
   * Also ignored when `variant="Filled"`, which always renders as a segmented
   * enclosure per the Figma spec.
   */
  isFullWidthTabItem?: boolean;
  children: ReactNode;
}

/**
 * Walks direct children to find the first non-disabled TabItem's `value`.
 * Used as a fallback `tabIndex={0}` target when no tab is currently selected
 * so the tablist remains reachable via Tab key.
 */
function findFirstFocusableValue(children: ReactNode): string | undefined {
  let result: string | undefined;
  Children.forEach(children, (child) => {
    if (result !== undefined) return;
    if (!isValidElement(child)) return;
    const props = child.props as { value?: unknown; isDisabled?: unknown };
    if (typeof props.value === 'string' && !props.isDisabled) {
      result = props.value;
    }
  });
  return result;
}

export const Tabs = forwardRef<HTMLDivElement, TabsProps>(
  (
    {
      value,
      defaultValue,
      onChange,
      variant = 'Bordered',
      size = 'Medium',
      orientation = 'Horizontal',
      isFullWidthTabItem = false,
      className,
      children,
      onKeyDown,
      ...props
    },
    ref,
  ) => {
    const reactId = useId();
    const baseId = props.id ?? `fds-tabs-${reactId}`;

    const [selectedValue, setSelectedValue] = useControllableState<string>({
      value,
      defaultValue,
      onChange,
    });

    /** Insertion-ordered registry of TabItem buttons keyed by `value`. */
    const itemsRef = useRef<Map<string, HTMLButtonElement>>(new Map());
    const registerItem = useCallback((itemValue: string, el: HTMLButtonElement | null) => {
      if (el) itemsRef.current.set(itemValue, el);
      else itemsRef.current.delete(itemValue);
    }, []);

    const getItemEl = useCallback(
      (itemValue: string) => itemsRef.current.get(itemValue),
      [],
    );

    const firstFocusableValue = useMemo(
      () => findFirstFocusableValue(children),
      [children],
    );

    const focusItemAt = useCallback(
      (focusable: HTMLButtonElement[], index: number) => {
        if (focusable.length === 0) return;
        const target = focusable[(index + focusable.length) % focusable.length];
        // Manual activation per WAI-ARIA APG: arrow keys move focus only.
        // Selection (and the indicator slide) happens on Enter or Space —
        // those keys are handled natively by the <button>'s onClick.
        target.focus();
      },
      [],
    );

    const handleKeyDown = useCallback(
      (event: KeyboardEvent<HTMLDivElement>) => {
        onKeyDown?.(event);
        if (event.defaultPrevented) return;

        const focusable = Array.from(itemsRef.current.values()).filter(
          (el) => !el.disabled,
        );
        if (focusable.length === 0) return;

        const activeEl = document.activeElement as HTMLButtonElement | null;
        const currentIndex = activeEl ? focusable.indexOf(activeEl) : -1;

        const isHorizontal = orientation === 'Horizontal';
        const nextKey = isHorizontal ? 'ArrowRight' : 'ArrowDown';
        const prevKey = isHorizontal ? 'ArrowLeft' : 'ArrowUp';

        if (event.key === nextKey) {
          event.preventDefault();
          focusItemAt(focusable, currentIndex + 1);
        } else if (event.key === prevKey) {
          event.preventDefault();
          focusItemAt(focusable, currentIndex - 1);
        } else if (event.key === 'Home') {
          event.preventDefault();
          focusItemAt(focusable, 0);
        } else if (event.key === 'End') {
          event.preventDefault();
          focusItemAt(focusable, focusable.length - 1);
        }
      },
      [focusItemAt, onKeyDown, orientation],
    );

    const ctx = useMemo<TabsContextValue>(
      () => ({
        selectedValue,
        setSelectedValue,
        variant,
        size,
        orientation,
        isFullWidthTabItem,
        baseId,
        registerItem,
        getItemEl,
        firstFocusableValue,
      }),
      [
        selectedValue,
        setSelectedValue,
        variant,
        size,
        orientation,
        isFullWidthTabItem,
        baseId,
        registerItem,
        getItemEl,
        firstFocusableValue,
      ],
    );

    const classes = cn(
      'fds-tabs',
      `fds-tabs--variant-${variant.toLowerCase()}`,
      `fds-tabs--orientation-${orientation.toLowerCase()}`,
      `fds-tabs--size-${size.toLowerCase()}`,
      orientation === 'Horizontal' && isFullWidthTabItem && 'fds-tabs--full-width',
      className,
    );

    return (
      <TabsContext.Provider value={ctx}>
        <div
          ref={ref}
          role="tablist"
          aria-orientation={orientation === 'Horizontal' ? 'horizontal' : 'vertical'}
          className={classes}
          onKeyDown={handleKeyDown}
          {...props}
          id={baseId}
        >
          {children}
          <TabIndicator />
        </div>
      </TabsContext.Provider>
    );
  },
);

Tabs.displayName = 'Tabs';
