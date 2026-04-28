import type { CSSProperties, ReactElement } from 'react';
import { Divider } from '../../layout/Divider/Divider';
import { StepperIndicator } from './StepperIndicator';
import { useStepper } from './StepperContext';
import './StepLine.css';

/* StepLine — port of Blade StepGroup/StepLine.web.tsx
 *
 * Renders the connector geometry around a step's marker:
 *   • Vertical / horizontal straight runs (solid or dotted per `stepProgress`)
 *   • Top + bottom curves at the start / end of a nested group
 *
 * `stepType` is computed by StepperStep from the item's index inside its
 * immediate group (`_index`, `itemsInGroupCount`) and its nesting depth
 * (`_nestingLevel`). `shouldShowStartBranch` / `shouldShowEndBranch` use the
 * item's GLOBAL position (`_totalIndex`, `totalItemsInParentGroupCount`) to
 * suppress the leading line on the first item and the trailing line on the
 * last item — even across nesting boundaries. */

export type StepLineStepType = 'single-item' | 'start' | 'middle' | 'end' | 'default';
export type StepLineStepProgress = 'full' | 'start' | 'end' | 'none';

export interface StepLineProps {
  stepType: StepLineStepType;
  shouldShowStartBranch: boolean;
  shouldShowEndBranch: boolean;
  marker?: ReactElement;
  stepProgress: StepLineStepProgress;
}

/* Geometry constants — single-size (Blade medium values). */
const ITEM_TOP_MARGIN = 6; // px — fixed height of the line above the marker
const INDENT = 31;
const MARKER_BG = 20;
const MARKER_MARGIN = 2;
const MARKER_LEFT_ALIGNMENT = (MARKER_BG + MARKER_MARGIN) / 2;
// Negative margin pulls the top curve up so it overlaps with the marker.
const MARKER_TOP_ALIGNMENT = -(MARKER_BG + MARKER_MARGIN * 2 + 2) / 2;

const DEFAULT_MARKER = <StepperIndicator color="neutral" />;

function dottedTop(p: StepLineStepProgress): boolean {
  return p === 'none' || p === 'end';
}
function dottedBottom(p: StepLineStepProgress): boolean {
  return p === 'none' || p === 'start';
}

/* —— Straight-line primitives — Faclon DS Divider ————————————————————————
   Solid stretches use lineStyle="Solid"; dotted progress uses "Dashed"
   (the closest dotted-feel style the Divider component exposes). The
   marker-line colour comes from `variant="Muted"` → --border-gray-muted. */

function StraightVertical(props: {
  isDotted: boolean;
  visible: boolean;
  fixedHeight?: number;
  marginLeft?: number;
}) {
  const style: CSSProperties = {
    visibility: props.visible ? 'visible' : 'hidden',
    marginLeft: props.marginLeft,
  };
  if (props.fixedHeight != null) {
    style.height = `${props.fixedHeight}px`;
  } else {
    style.flex = '1 1 0';
  }
  return (
    <Divider
      orientation="Vertical"
      thickness="Thicker"
      variant="Muted"
      lineStyle={props.isDotted ? 'Dashed' : 'Solid'}
      className="fds-step-line__straight fds-step-line__straight--vertical"
      style={style}
    />
  );
}

function StraightHorizontal(props: { isDotted: boolean; visible: boolean }) {
  return (
    <Divider
      orientation="Horizontal"
      thickness="Thicker"
      variant="Muted"
      lineStyle={props.isDotted ? 'Dashed' : 'Solid'}
      className="fds-step-line__straight fds-step-line__straight--horizontal"
      style={{ visibility: props.visible ? 'visible' : 'hidden', flex: '1 1 0' }}
    />
  );
}

/* —— Curve primitives — Blade SVG paths verbatim ———————————————————————— */

function TopCurveVertical({ isDotted, visible }: { isDotted: boolean; visible: boolean }) {
  const style: React.CSSProperties = { visibility: visible ? 'visible' : 'hidden' };
  if (isDotted) {
    return (
      <svg
        className="fds-step-line__curve"
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="currentColor"
        style={style}
        aria-hidden="true"
      >
        <path d="M2 1C2 1.55228 1.55228 2 1 2C0.447715 2 0 1.55228 0 1C0 0.447715 0.447715 0 1 0C1.55228 0 2 0.447715 2 1Z" />
        <path d="M2 6C2 6.55228 1.55228 7 1 7C0.447715 7 0 6.55228 0 6C0 5.44772 0.447715 5 1 5C1.55228 5 2 5.44772 2 6Z" />
        <path d="M1 12C1.55228 12 2 11.5523 2 11C2 10.4477 1.55228 10 1 10C0.447715 10 0 10.4477 0 11C0 11.5523 0.447715 12 1 12Z" />
        <path d="M3 16C3 16.5523 2.55228 17 2 17C1.44772 17 1 16.5523 1 16C1 15.4477 1.44772 15 2 15C2.55228 15 3 15.4477 3 16Z" />
        <path d="M7 20C7.55228 20 8 19.5523 8 19C8 18.4477 7.55228 18 7 18C6.44772 18 6 18.4477 6 19C6 19.5523 6.44772 20 7 20Z" />
        <path d="M14 19C14 19.5523 13.5523 20 13 20C12.4477 20 12 19.5523 12 19C12 18.4477 12.4477 18 13 18C13.5523 18 14 18.4477 14 19Z" />
        <path d="M19 20C19.5523 20 20 19.5523 20 19C20 18.4477 19.5523 18 19 18C18.4477 18 18 18.4477 18 19C18 19.5523 18.4477 20 19 20Z" />
      </svg>
    );
  }
  return (
    <svg
      className="fds-step-line__curve"
      width="20"
      height="14"
      viewBox="0 0 20 14"
      fill="none"
      style={style}
      aria-hidden="true"
    >
      <path
        d="M1 0V5C1 9.41828 4.58172 13 9 13H20"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  );
}

function BottomCurveVertical({ isDotted, visible }: { isDotted: boolean; visible: boolean }) {
  const style: React.CSSProperties = { visibility: visible ? 'visible' : 'hidden' };
  if (isDotted) {
    return (
      <svg
        className="fds-step-line__curve"
        width="42"
        height="5"
        viewBox="0 0 42 5"
        fill="currentColor"
        style={style}
        aria-hidden="true"
      >
        <path d="M32 1C32 1.55228 31.5523 2 31 2C30.4477 2 30 1.55228 30 1C30 0.447715 30.4477 0 31 0C31.5523 0 32 0.447715 32 1Z" />
        <path d="M2 4C2 4.55228 1.55228 5 1 5C0.447715 5 0 4.55228 0 4C0 3.44772 0.447715 3 1 3C1.55228 3 2 3.44772 2 4Z" />
        <path d="M27.5 3.5C28.0523 3.5 28.5 3.05228 28.5 2.5C28.5 1.94772 28.0523 1.5 27.5 1.5C26.9477 1.5 26.5 1.94772 26.5 2.5C26.5 3.05228 26.9477 3.5 27.5 3.5Z" />
        <path d="M5.5 2.5C5.5 3.05228 5.05228 3.5 4.5 3.5C3.94772 3.5 3.5 3.05228 3.5 2.5C3.5 1.94772 3.94772 1.5 4.5 1.5C5.05228 1.5 5.5 1.94772 5.5 2.5Z" />
        <path d="M16.5 3.5C17.0523 3.5 17.5 3.05228 17.5 2.5C17.5 1.94772 17.0523 1.5 16.5 1.5C15.9477 1.5 15.5 1.94772 15.5 2.5C15.5 3.05228 15.9477 3.5 16.5 3.5Z" />
        <path d="M11.5 2.5C11.5 3.05228 11.0523 3.5 10.5 3.5C9.94771 3.5 9.5 3.05228 9.5 2.5C9.5 1.94772 9.94771 1.5 10.5 1.5C11.0523 1.5 11.5 1.94772 11.5 2.5Z" />
        <path d="M22.5 3.5C23.0523 3.5 23.5 3.05228 23.5 2.5C23.5 1.94772 23.0523 1.5 22.5 1.5C21.9477 1.5 21.5 1.94772 21.5 2.5C21.5 3.05228 21.9477 3.5 22.5 3.5Z" />
      </svg>
    );
  }
  return (
    <svg
      className="fds-step-line__curve"
      width="33"
      height="5"
      viewBox="0 0 33 5"
      fill="none"
      style={style}
      aria-hidden="true"
    >
      <path
        d="M1 5V5C1 3.63251 2.108 2.52363 3.47549 2.52255L29.5 2.50198C30.881 2.50088 32 1.38103 32 1.19209e-07V1.19209e-07"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  );
}

/* —— Branch composers (one per stepType) ————————————————————————————————— */

function StepLineVertical(props: {
  marker: ReactElement;
  stepProgress: StepLineStepProgress;
  isIndented: boolean;
  shouldShowStartBranch: boolean;
  shouldShowEndBranch: boolean;
}) {
  const indent = props.isIndented ? INDENT : undefined;
  return (
    <span className="fds-step-line__column" style={{ marginLeft: indent }}>
      <StraightVertical
        isDotted={dottedTop(props.stepProgress)}
        visible={props.shouldShowStartBranch}
        fixedHeight={ITEM_TOP_MARGIN}
      />
      <span
        className="fds-step-line__marker"
        style={{ marginLeft: -MARKER_LEFT_ALIGNMENT }}
      >
        {props.marker}
      </span>
      <StraightVertical
        isDotted={dottedBottom(props.stepProgress)}
        visible={props.shouldShowEndBranch}
      />
    </span>
  );
}

function StepLineStart(props: {
  marker: ReactElement;
  stepProgress: StepLineStepProgress;
  shouldShowStartBranch: boolean;
  shouldShowEndBranch: boolean;
}) {
  return (
    <span className="fds-step-line__column">
      <TopCurveVertical
        visible={props.shouldShowStartBranch}
        isDotted={dottedTop(props.stepProgress)}
      />
      <span
        className="fds-step-line__marker"
        style={{
          marginLeft: -MARKER_LEFT_ALIGNMENT + INDENT,
          marginTop: MARKER_TOP_ALIGNMENT,
        }}
      >
        {props.marker}
      </span>
      <StraightVertical
        visible={props.shouldShowEndBranch}
        marginLeft={INDENT}
        isDotted={dottedBottom(props.stepProgress)}
      />
    </span>
  );
}

function StepLineEnd(props: {
  marker: ReactElement;
  stepProgress: StepLineStepProgress;
  shouldShowStartBranch: boolean;
  shouldShowEndBranch: boolean;
}) {
  return (
    <span className="fds-step-line__column">
      <StraightVertical
        visible={props.shouldShowStartBranch}
        marginLeft={INDENT}
        fixedHeight={ITEM_TOP_MARGIN}
        isDotted={dottedTop(props.stepProgress)}
      />
      <span
        className="fds-step-line__marker"
        style={{ marginLeft: -MARKER_LEFT_ALIGNMENT + INDENT }}
      >
        {props.marker}
      </span>
      <StraightVertical
        marginLeft={INDENT}
        visible={props.shouldShowEndBranch}
        isDotted={dottedBottom(props.stepProgress)}
      />
      <BottomCurveVertical
        visible={props.shouldShowEndBranch}
        isDotted={dottedBottom(props.stepProgress)}
      />
    </span>
  );
}

function StepLineSingleItem(props: {
  marker: ReactElement;
  stepProgress: StepLineStepProgress;
  shouldShowStartBranch: boolean;
  shouldShowEndBranch: boolean;
}) {
  return (
    <span className="fds-step-line__column">
      <TopCurveVertical
        visible={props.shouldShowStartBranch}
        isDotted={dottedTop(props.stepProgress)}
      />
      <span
        className="fds-step-line__marker"
        style={{
          marginLeft: -MARKER_LEFT_ALIGNMENT + INDENT,
          marginTop: MARKER_TOP_ALIGNMENT,
        }}
      >
        {props.marker}
      </span>
      <StraightVertical
        marginLeft={INDENT}
        visible={props.shouldShowEndBranch}
        isDotted={dottedBottom(props.stepProgress)}
      />
      <BottomCurveVertical
        visible={props.shouldShowEndBranch}
        isDotted={dottedBottom(props.stepProgress)}
      />
    </span>
  );
}

function StepLineHorizontal(props: {
  marker: ReactElement;
  stepProgress: StepLineStepProgress;
  shouldShowStartBranch: boolean;
  shouldShowEndBranch: boolean;
}) {
  return (
    <span className="fds-step-line__row">
      <StraightHorizontal
        isDotted={dottedTop(props.stepProgress)}
        visible={props.shouldShowStartBranch}
      />
      <span className="fds-step-line__marker">{props.marker}</span>
      <StraightHorizontal
        isDotted={dottedBottom(props.stepProgress)}
        visible={props.shouldShowEndBranch}
      />
    </span>
  );
}

/* —— Public StepLine ——————————————————————————————————————————————————— */

export function StepLine({
  stepType,
  shouldShowStartBranch,
  shouldShowEndBranch,
  marker,
  stepProgress,
}: StepLineProps): ReactElement {
  const { orientation } = useStepper();
  const resolvedMarker = marker ?? DEFAULT_MARKER;
  const common = {
    marker: resolvedMarker,
    stepProgress,
    shouldShowStartBranch,
    shouldShowEndBranch,
  } as const;

  if (orientation === 'horizontal') {
    return <StepLineHorizontal {...common} />;
  }

  if (stepType === 'start') return <StepLineStart {...common} />;
  if (stepType === 'middle') return <StepLineVertical {...common} isIndented={true} />;
  if (stepType === 'end') return <StepLineEnd {...common} />;
  if (stepType === 'single-item') return <StepLineSingleItem {...common} />;
  return <StepLineVertical {...common} isIndented={false} />;
}

StepLine.displayName = 'StepLine';
