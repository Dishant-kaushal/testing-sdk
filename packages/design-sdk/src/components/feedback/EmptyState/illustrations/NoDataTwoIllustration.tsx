import { forwardRef } from 'react';
import type { EmptyStateIllustrationProps } from './types';
import { cn } from '../../../../utils/cn';

export type NoDataTwoIllustrationProps = EmptyStateIllustrationProps;

/* ═══════════════════════════════════════════════════════════════════════════
   NoDataTwoIllustration — Faclon Design System 2.0
   Figma node: 1034:2052 (illustration=No Data 2)
   Flat single-SVG export from Figma, with all hex values replaced by Faclon
   semantic tokens so the illustration theme-maps cleanly.
   ═══════════════════════════════════════════════════════════════════════════ */

export const NoDataTwoIllustration = forwardRef<SVGSVGElement, NoDataTwoIllustrationProps>(
  ({ size = 120, className }, ref) => {
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
          d="M57.0409 25.2581C82.889 25.2581 103.848 46.2138 103.848 72.1584C103.847 98.1031 82.8889 119.058 57.0409 119.058C31.193 119.058 10.2353 98.1029 10.2352 72.1584C10.2352 46.2139 31.193 25.2583 57.0409 25.2581Z"
          fill="var(--background-gray-default)"
          stroke="var(--border-gray-default)"
          strokeWidth="1.88353"
          strokeMiterlimit="10"
        />
        {/* Open-box top-left face */}
        <path
          d="M23.311 104.315L55.8565 94.1167V52.3053L23.311 62.4248V104.315Z"
          fill="var(--background-surface-intense)"
          stroke="var(--border-gray-default)"
          strokeWidth="1.84347"
          strokeMiterlimit="10"
          strokeLinejoin="round"
        />
        {/* Open-box top-right face */}
        <path
          d="M88.402 104.315L55.8565 94.1167V52.3053L88.402 62.4248V104.315Z"
          fill="var(--background-surface-intense)"
          stroke="var(--border-gray-default)"
          strokeWidth="1.84347"
          strokeMiterlimit="10"
          strokeLinejoin="round"
        />
        {/* Open-box front-left face */}
        <path
          d="M55.8565 114.591L23.311 104.393V62.5815L55.8565 72.7794V114.591Z"
          fill="var(--background-surface-intense)"
          stroke="var(--border-gray-default)"
          strokeWidth="1.84347"
          strokeMiterlimit="10"
          strokeLinejoin="round"
        />
        {/* Open-box front-right face */}
        <path
          d="M55.8565 114.591L88.402 104.393V62.5815L55.8565 72.7794V114.591Z"
          fill="var(--background-surface-intense)"
          stroke="var(--border-gray-default)"
          strokeWidth="1.84347"
          strokeMiterlimit="10"
          strokeLinejoin="round"
        />
        {/* Flap left-top */}
        <path
          d="M55.8565 52.3053L40.5547 40.8522L7.46552 51.9915L23.311 62.4247L55.8565 52.3053Z"
          fill="var(--background-surface-intense)"
          stroke="var(--border-gray-default)"
          strokeWidth="1.84347"
          strokeMiterlimit="10"
          strokeLinejoin="round"
        />
        {/* Flap right-top */}
        <path
          d="M55.8565 52.3053L71.1583 40.8522L104.248 51.9915L88.402 62.4247L55.8565 52.3053Z"
          fill="var(--background-surface-intense)"
          stroke="var(--border-gray-default)"
          strokeWidth="1.84347"
          strokeMiterlimit="10"
          strokeLinejoin="round"
        />
        {/* Flap left-bottom */}
        <path
          d="M23.311 62.5815L55.8565 72.7794L39.6226 83.1342L7.46552 72.4656L23.311 62.5815Z"
          fill="var(--background-surface-intense)"
          stroke="var(--border-gray-default)"
          strokeWidth="1.84347"
          strokeMiterlimit="10"
          strokeLinejoin="round"
        />
        {/* Flap right-bottom */}
        <path
          d="M88.402 62.5815L55.8565 72.7794L72.0904 83.1342L104.248 72.4656L88.402 62.5815Z"
          fill="var(--background-surface-intense)"
          stroke="var(--border-gray-default)"
          strokeWidth="1.84347"
          strokeMiterlimit="10"
          strokeLinejoin="round"
        />
        {/* Dashed arrow trailing into the box */}
        <path
          d="M64.9369 12.1649C69.4964 24.5387 70.8554 27.288 71.3014 39.4806C71.1299 42.2638 71.0235 45.2902 69.7114 47.7271C67.9591 51.455 63.6729 54.0368 59.6235 54.0786C55.4518 54.1532 51.362 51.5989 49.5211 47.6602C48.226 45.2699 48.2672 42.0003 50.0437 39.83C51.9751 37.7486 55.3728 37.2296 57.8169 38.5301C60.5055 39.7652 62.1103 42.3333 62.7047 45.0417C63.2991 47.7501 63.0379 50.6876 62.3124 53.3584C60.7949 59.8543 59.5382 60.1686 55.8169 71.1665"
          stroke="var(--border-gray-default)"
          strokeWidth="1.84347"
          strokeMiterlimit="10"
          strokeDasharray="3.69 3.69"
        />
        {/* Paper floating 1 */}
        <path
          d="M70.486 5.61544C70.4754 7.43492 68.7822 8.54902 66.635 7.96806C64.3742 7.58267 62.7741 7.18547 62.6711 5.56156C62.723 3.89618 64.54 3.24438 66.6667 2.50962C69.2168 1.49634 70.3417 3.83744 70.486 5.61544Z"
          fill="var(--background-surface-intense)"
          stroke="var(--border-gray-default)"
          strokeWidth="1.84347"
          strokeMiterlimit="10"
          strokeLinejoin="round"
        />
        {/* Paper floating 2 */}
        <path
          d="M55.8774 11.1794C57.0231 12.3589 59.4387 12.7028 60.6159 10.9012C61.9066 8.90398 63.0114 7.45203 61.8244 6.11845C60.6787 4.93897 59.5636 5.73306 57.0136 6.74634C54.9694 7.78929 54.5355 9.88729 55.8774 11.1794Z"
          fill="var(--background-surface-intense)"
          stroke="var(--border-gray-default)"
          strokeWidth="1.84347"
          strokeMiterlimit="10"
          strokeLinejoin="round"
        />
        {/* Paper floating 3 (with overlap) */}
        <path
          d="M61.1641 3.65315C62.2069 3.20872 63.456 3.53477 64.0133 4.3764C64.2507 4.64311 64.5294 5.06392 64.6119 5.37211C65.4995 7.4465 65.2204 9.50303 64.0228 9.98893C62.7117 10.6704 60.9052 9.50273 60.2138 7.54096C60.0487 6.92458 59.9662 6.61639 59.8424 6.1541C59.7083 5.03396 60.1214 4.09758 61.1641 3.65315C61.319 3.61167 61.1641 3.65315 61.1641 3.65315Z"
          fill="var(--background-surface-intense)"
        />
        <path
          d="M61.1641 3.65315C62.2069 3.20872 63.456 3.53477 64.0133 4.3764C64.2507 4.64311 64.5294 5.06392 64.6119 5.37211C65.4995 7.4465 65.2204 9.50303 64.0228 9.98893C62.7117 10.6704 60.9052 9.50273 60.2138 7.54096C60.0487 6.92458 59.9662 6.61639 59.8424 6.1541C59.7083 5.03396 60.1214 4.09758 61.1641 3.65315ZM61.1641 3.65315C61.1641 3.65315 61.319 3.61167 61.1641 3.65315Z"
          stroke="var(--border-gray-default)"
          strokeWidth="1.84347"
          strokeMiterlimit="10"
          strokeLinejoin="round"
        />
        {/* Sparkle 1 (top-left) */}
        <path
          d="M13.233 37.0456H11.2144V35.027H9.48415V37.0456H7.46552V38.8335H9.48415V40.8522H11.2144V38.8335H13.233V37.0456Z"
          fill="var(--text-gray-tertiary)"
        />
        {/* Sparkle 2 (mid-left) */}
        <path
          d="M17.6672 87.6923H15.6486V85.6736H13.9183V87.6923H11.8997V89.4802H13.9183V91.4989H15.6486V89.4802H17.6672V87.6923Z"
          fill="var(--text-gray-tertiary)"
        />
        {/* Sparkle 3 (right, rotated) */}
        <path
          d="M105.912 87.8066L103.442 86.5596L104.689 84.0897L102.572 83.0209L101.325 85.4907L98.8552 84.2438L97.7508 86.4313L100.221 87.6783L98.9736 90.1481L101.091 91.217L102.338 88.7471L104.807 89.9941L105.912 87.8066Z"
          fill="var(--text-gray-tertiary)"
        />
      </svg>
    );
  },
);

NoDataTwoIllustration.displayName = 'NoDataTwoIllustration';
