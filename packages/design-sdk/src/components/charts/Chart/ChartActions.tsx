import type { ReactNode } from 'react';
import { Info, Settings, Menu } from 'react-feather';
import { IconButton } from '../../actions/IconButton/IconButton';

/* ═══════════════════════════════════════════════════════════════════════════
   Types
   ═══════════════════════════════════════════════════════════════════════════ */

export interface ChartActionsProps {
  /**
   * Click handler for the Info icon. Use this to open a popover describing
   * the selected chart. The button is rendered when this is provided
   * (or when `showInfo` is explicitly `true`).
   */
  onInfoClick?: () => void;
  /**
   * Click handler for the Settings icon. Use this to open the chart's
   * configuration panel (time drill-down, legends, data labels, clipping,
   * scrollable, inexact multiple, etc).
   */
  onSettingsClick?: () => void;
  /**
   * Click handler for the More icon. Use this to open the export menu
   * (PNG / JPEG / Excel / SVG / CSV / Full-screen) or any other menu.
   */
  onMoreClick?: () => void;

  /** Force-show the Info button even if `onInfoClick` is undefined */
  showInfo?: boolean;
  /** Force-show the Settings button even if `onSettingsClick` is undefined */
  showSettings?: boolean;
  /** Force-show the More button even if `onMoreClick` is undefined */
  showMore?: boolean;

  /** Override the default `aria-label` for the Info button */
  infoLabel?: string;
  /** Override the default `aria-label` for the Settings button */
  settingsLabel?: string;
  /** Override the default `aria-label` for the More button */
  moreLabel?: string;

  /**
   * Optional extra trailing actions rendered after the More button.
   * Pass `<IconButton>` elements (or any node) to extend the standard set.
   */
  trailing?: ReactNode;
}

/* ═══════════════════════════════════════════════════════════════════════════
   ChartActions — standard Info / Settings / More icon group for <Chart>
   ═══════════════════════════════════════════════════════════════════════════

   Drop into the `<Chart actions={...} />` slot. Reuses the design-system
   `IconButton` so styling, focus, and disabled behaviour stay consistent
   with every other icon button in the SDK.

   Each button is hidden by default unless its `onXxxClick` handler is
   provided (or `showXxx` is set to `true`). This prevents shipping dead UI
   when a chart only needs a subset of the standard actions.

   Behaviours described in the chart spec are wired by the consumer:
   - Info     → typically opens a popover with the chart description
   - Settings → typically opens a settings panel (drill-down, legends, etc.)
   - More     → typically opens an export menu (PNG / SVG / CSV / fullscreen)

   These popovers/menus are intentionally NOT baked in here, because they
   depend on the concrete chart instance (e.g. the Highcharts ref) that the
   consuming chart type owns.
   ═══════════════════════════════════════════════════════════════════════════ */

export function ChartActions({
  onInfoClick,
  onSettingsClick,
  onMoreClick,
  showInfo,
  showSettings,
  showMore,
  infoLabel = 'Info',
  settingsLabel = 'Settings',
  moreLabel = 'More',
  trailing,
}: ChartActionsProps) {
  const renderInfo = showInfo ?? onInfoClick != null;
  const renderSettings = showSettings ?? onSettingsClick != null;
  const renderMore = showMore ?? onMoreClick != null;

  return (
    <>
      {renderInfo && (
        <IconButton
          size="20"
          icon={<Info size={20} />}
          aria-label={infoLabel}
          onClick={onInfoClick}
        />
      )}
      {renderSettings && (
        <IconButton
          size="20"
          icon={<Settings size={20} />}
          aria-label={settingsLabel}
          onClick={onSettingsClick}
        />
      )}
      {renderMore && (
        <IconButton
          size="20"
          icon={<Menu size={20} />}
          aria-label={moreLabel}
          onClick={onMoreClick}
        />
      )}
      {trailing}
    </>
  );
}

ChartActions.displayName = 'ChartActions';
