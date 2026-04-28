/* ═══════════════════════════════════════════════════════════════════════════
   Shared prop contract for every EmptyState illustration.
   Keeps the API uniform across single-SVG and multi-layer implementations.
   ═══════════════════════════════════════════════════════════════════════════ */

export interface EmptyStateIllustrationProps {
  /** Pixel size for height. Width auto-scales from the illustration's native
   *  aspect ratio. Default 120. */
  size?: number;
  /** Additional CSS class merged onto the illustration's root element. */
  className?: string;
}
