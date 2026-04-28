import { forwardRef } from 'react';
import type { EmptyStateIllustrationProps } from './types';
import { cn } from '../../../../utils/cn';

export type TechnicalHiccupIllustrationProps = EmptyStateIllustrationProps;

/* ═══════════════════════════════════════════════════════════════════════════
   TechnicalHiccupIllustration — Faclon Design System 2.0
   Figma node: 1034:2049 (illustration=Technical Hiccup)
   Flat single-SVG export with Faclon semantic tokens.
   ═══════════════════════════════════════════════════════════════════════════ */

export const TechnicalHiccupIllustration = forwardRef<
  SVGSVGElement,
  TechnicalHiccupIllustrationProps
>(({ size = 120, className }, ref) => {
  const width = (115 * size) / 120;
  return (
    <svg
      ref={ref}
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={size}
      viewBox="0 0 115 120"
      fill="none"
      className={cn('fds-illustration', className)}
      aria-hidden="true"
      focusable="false"
    >
      {/* Circular backdrop */}
      <path
        d="M47.4118 107.172C72.649 107.172 93.1093 86.7122 93.1093 61.3848C93.1093 36.0574 72.5589 15.5972 47.4118 15.5972C22.1745 15.5972 1.71426 36.0574 1.71426 61.3848C1.71426 86.7122 22.1745 107.172 47.4118 107.172Z"
        fill="var(--background-gray-default)"
        stroke="var(--border-gray-default)"
        strokeWidth="1.80266"
        strokeMiterlimit="10"
      />
      {/* Browser window body */}
      <path
        d="M90.9561 37.3343V90.3666C90.9561 91.9225 89.6595 93.2192 88.1035 93.2192H7.51787C5.96192 93.284 4.66528 91.9874 4.66528 90.4314V37.3343C4.66528 35.7136 5.96192 34.4818 7.51787 34.4818H88.1035C89.7243 34.4818 90.9561 35.7784 90.9561 37.3343Z"
        fill="var(--background-surface-intense)"
        stroke="var(--border-gray-default)"
        strokeWidth="1.80266"
        strokeMiterlimit="10"
      />
      {/* Browser window header bar */}
      <path
        d="M90.9561 37.3343V41.4187H4.66528V37.3343C4.66528 35.7136 5.96192 34.4818 7.51787 34.4818H88.1035C89.7243 34.4818 90.9561 35.7784 90.9561 37.3343Z"
        fill="var(--background-surface-subtle)"
        stroke="var(--border-gray-default)"
        strokeWidth="1.80266"
        strokeMiterlimit="10"
      />
      {/* Window-control dots */}
      <path
        d="M8.49036 39.1495C9.02744 39.1495 9.46283 38.7141 9.46283 38.177C9.46283 37.6399 9.02744 37.2045 8.49036 37.2045C7.95327 37.2045 7.51788 37.6399 7.51788 38.177C7.51788 38.7141 7.95327 39.1495 8.49036 39.1495Z"
        fill="var(--text-gray-tertiary)"
      />
      <path
        d="M11.5374 39.1495C12.0745 39.1495 12.5099 38.7141 12.5099 38.177C12.5099 37.6399 12.0745 37.2045 11.5374 37.2045C11.0003 37.2045 10.5649 37.6399 10.5649 38.177C10.5649 38.7141 11.0003 39.1495 11.5374 39.1495Z"
        fill="var(--text-gray-tertiary)"
      />
      <path
        d="M14.6494 39.1495C15.1865 39.1495 15.6218 38.7141 15.6218 38.177C15.6218 37.6399 15.1865 37.2045 14.6494 37.2045C14.1123 37.2045 13.6769 37.6399 13.6769 38.177C13.6769 38.7141 14.1123 39.1495 14.6494 39.1495Z"
        fill="var(--text-gray-tertiary)"
      />
      {/* Decorative ray 1 (vertical, top-right) */}
      <path
        d="M87.4552 27.6095C86.8069 27.6095 86.2883 27.0909 86.2883 26.4426V13.4114C86.2883 12.7631 86.8069 12.2444 87.4552 12.2444C88.1036 12.2444 88.6222 12.7631 88.6222 13.4114V26.4426C88.6222 27.0909 88.1036 27.6095 87.4552 27.6095Z"
        fill="var(--text-gray-tertiary)"
      />
      {/* Decorative ray 2 (horizontal, right) */}
      <path
        d="M96.9206 37.5936C96.9206 36.9453 97.4393 36.4266 98.0876 36.4266H111.119C111.767 36.4266 112.286 36.9453 112.286 37.5936C112.286 38.2419 111.767 38.7605 111.119 38.7605H98.0876C97.4393 38.7605 96.9206 38.2419 96.9206 37.5936Z"
        fill="var(--text-gray-tertiary)"
      />
      {/* Decorative ray 3 (diagonal) */}
      <path
        d="M95.8833 29.1655C95.4295 28.7117 95.4295 27.9337 95.8833 27.4799L105.154 18.2738C105.608 17.82 106.386 17.82 106.84 18.2738C107.294 18.7276 107.294 19.5056 106.84 19.9594L97.6338 29.1655C97.1151 29.6193 96.3371 29.6193 95.8833 29.1655Z"
        fill="var(--text-gray-tertiary)"
      />
      {/* Warning triangle — body */}
      <path
        d="M64.8725 94.0086L78.8761 71.8454C80.4003 69.7658 83.5916 69.7658 85.1158 71.8454L99.1193 94.0086C100.596 95.9958 99.1193 98.8147 96.5949 98.8147H67.4446C64.8725 98.7685 63.396 95.9958 64.8725 94.0086Z"
        fill="var(--border-gray-default)"
        stroke="var(--text-gray-tertiary)"
        strokeWidth="1.71429"
        strokeMiterlimit="10"
      />
      {/* Warning triangle — exclamation stem */}
      <path
        d="M81.9966 76.6621C83.8559 76.6623 85.2557 78.2342 85.1246 80.1289V80.1377L85.1236 80.1465L84.3824 88.4082L84.3814 88.4072C84.294 89.6468 83.2505 90.6678 81.9966 90.668C80.7427 90.668 79.6993 89.6469 79.6119 88.4072L79.6109 88.4082L78.8687 80.1465V80.1387L78.8677 80.1309C78.7361 78.2959 80.1271 76.6621 81.9966 76.6621Z"
        fill="var(--background-surface-intense)"
        stroke="var(--text-gray-tertiary)"
        strokeWidth="1.71429"
      />
      {/* Warning triangle — exclamation dot */}
      <path
        d="M81.9966 90.4835C83.4836 90.4836 84.6323 91.7092 84.6324 93.1769C84.6324 94.6446 83.4836 95.8702 81.9966 95.8702C80.5096 95.8702 79.3599 94.6447 79.3599 93.1769C79.36 91.7091 80.5096 90.4835 81.9966 90.4835Z"
        fill="var(--background-surface-intense)"
        stroke="var(--text-gray-tertiary)"
        strokeWidth="1.71429"
      />
    </svg>
  );
});

TechnicalHiccupIllustration.displayName = 'TechnicalHiccupIllustration';
