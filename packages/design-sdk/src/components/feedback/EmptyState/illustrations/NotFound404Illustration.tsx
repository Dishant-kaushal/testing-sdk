import { forwardRef, useId } from 'react';
import type { EmptyStateIllustrationProps } from './types';
import { cn } from '../../../../utils/cn';

export type NotFound404IllustrationProps = EmptyStateIllustrationProps;

/* ═══════════════════════════════════════════════════════════════════════════
   NotFound404Illustration — Faclon Design System 2.0
   Figma node: 1034:2050 (illustration=404)
   Flattened single-SVG export from Figma, with all hex values replaced by
   Faclon semantic tokens so the illustration theme-maps cleanly.
   ═══════════════════════════════════════════════════════════════════════════ */

export const NotFound404Illustration = forwardRef<SVGSVGElement, NotFound404IllustrationProps>(
  ({ size = 120, className }, ref) => {
    const width = (131 * size) / 120;
    // useId() ensures mask + gradient refs are unique per instance — multiple
    // 404 illustrations on one page no longer collide on `#fds-404-mask`.
    const rawId = useId();
    const maskId = `fds-404-mask-${rawId}`;
    const gradientId = `fds-404-beam-gradient-${rawId}`;
    return (
      <svg
        ref={ref}
        xmlns="http://www.w3.org/2000/svg"
        width={width}
        height={size}
        viewBox="0 0 131 120"
        fill="none"
        className={cn('fds-illustration', className)}
        aria-hidden="true"
        focusable="false"
      >
      {/* UFO dome */}
      <path
        d="M96.2979 29.0485C96.2979 39.8042 87.7442 48.6983 77.1043 49.3188C76.6871 49.3188 76.2698 49.3188 75.8526 49.3188C72.3059 49.3188 68.7593 48.2846 65.8386 46.6299C59.5798 43.1136 55.4073 36.4947 55.4073 28.8417C55.4073 23.6707 57.2849 18.9134 60.6229 15.3971C64.3782 11.2603 69.8024 8.57141 75.8526 8.57141C83.7803 8.57141 90.665 13.1219 94.003 19.7407C95.4634 22.6365 96.2979 25.7391 96.2979 29.0485Z"
        fill="var(--background-surface-subtle)"
        stroke="var(--border-gray-default)"
        strokeWidth="1.71429"
        strokeMiterlimit="10"
      />
      {/* UFO dome inner shadow */}
      <path
        opacity="0.1"
        d="M96.1185 29.0485C96.1185 39.8042 87.5648 48.6983 76.9249 49.3188C72.9611 48.6983 69.2058 47.6641 65.6592 46.8367C59.4004 43.3205 55.2279 36.7016 55.2279 29.0485C55.2279 23.8775 57.1055 19.1202 60.4435 15.604C67.3282 15.3971 75.2559 16.0176 83.3923 17.4655C87.1476 18.086 90.6942 18.9134 94.0322 19.7408C95.284 22.6365 96.1185 25.7391 96.1185 29.0485Z"
        fill="var(--background-brand-default)"
        fillOpacity="0.09"
      />
      {/* UFO base ellipse */}
      <path
        d="M121.064 42.7376C122.638 33.9654 103.224 23.2037 77.7015 18.7006C52.1787 14.1975 30.2119 17.6582 28.6374 26.4304C27.0628 35.2025 46.4767 45.9643 71.9995 50.4674C97.5223 54.9705 119.489 51.5098 121.064 42.7376Z"
        fill="var(--background-surface-subtle)"
        stroke="var(--border-gray-default)"
        strokeWidth="1.71429"
        strokeMiterlimit="10"
      />
      {/* Dome dot 1 (centre) */}
      <path
        d="M71.195 23.7094C71.3111 22.2288 68.984 20.8419 65.9973 20.6116C63.0105 20.3814 60.4952 21.395 60.3791 22.8756C60.2629 24.3562 62.5901 25.7431 65.5768 25.9733C68.5636 26.2036 71.0789 25.19 71.195 23.7094Z"
        fill="var(--border-gray-default)"
      />
      {/* Dome dot 2 (left) */}
      <path
        d="M44.9444 27.5122C47.8161 26.6669 49.7985 24.8276 49.3722 23.404C48.9459 21.9805 46.2723 21.5117 43.4006 22.357C40.5289 23.2023 38.5465 25.0415 38.9728 26.4651C39.3991 27.8887 42.0727 28.3575 44.9444 27.5122Z"
        fill="var(--border-gray-default)"
      />
      {/* Dome dot 3 (right-centre) */}
      <path
        d="M92.2937 29.1513C92.5561 27.6893 90.378 26.0823 87.4287 25.5619C84.4794 25.0415 81.8758 25.8049 81.6133 27.267C81.3509 28.729 83.5291 30.336 86.4784 30.8564C89.4277 31.3767 92.0313 30.6134 92.2937 29.1513Z"
        fill="var(--border-gray-default)"
      />
      {/* Dome dot 4 (far right) */}
      <path
        d="M108.132 39.9665C108.818 38.6466 107.216 36.4731 104.553 35.1119C101.891 33.7507 99.1759 33.7172 98.4894 35.0372C97.803 36.3571 99.4049 38.5305 102.068 39.8917C104.73 41.2529 107.445 41.2864 108.132 39.9665Z"
        fill="var(--border-gray-default)"
      />
      {/* Light beam (clipped via alpha mask to a trapezoid) */}
      <mask id={maskId} style={{ maskType: 'alpha' }} maskUnits="userSpaceOnUse" x="24" y="36" width="80" height="61">
        <path
          d="M72.249 36.344L52.6382 36.1372L24.7099 88.0837L103.098 96.3275L94.3633 43.3766L72.249 36.344Z"
          fill={`url(#${gradientId})`}
        />
      </mask>
      <g mask={`url(#${maskId})`}>
        <path
          opacity="0.22"
          d="M72.249 36.344L52.6382 36.1372L24.7099 88.0837L103.098 96.3275L94.3633 43.3766L72.249 36.344Z"
          fill="var(--text-gray-tertiary)"
        />
      </g>
      {/* Ground surface (rounded pill under 404) */}
      <path
        d="M113.345 110.261H12.9958C15.7079 107.83 19.6718 105.399 24.2616 103.576C26.7651 102.665 29.6858 101.449 32.6066 100.842C41.3688 98.4111 52.0087 96.892 63.2745 96.892C76.8351 96.892 89.3527 99.0188 98.9494 102.361C102.287 103.576 105.208 104.792 107.712 106.311C110.007 107.526 111.884 108.741 113.345 110.261Z"
        fill="var(--background-surface-subtle)"
        stroke="var(--border-gray-default)"
        strokeWidth="1.71429"
        strokeMiterlimit="10"
      />
      {/* Ground pebble 1 (left) */}
      <path
        d="M33.6186 103.354C33.7501 104.588 31.5995 106.065 29.1101 106.33C26.6207 106.596 24.4366 105.788 24.0977 104.576C26.5214 103.694 29.3381 102.562 32.1986 101.841C33.0723 102.164 33.5529 102.737 33.6186 103.354Z"
        fill="var(--border-gray-default)"
      />
      {/* Ground pebble 2 (centre-left) */}
      <path
        d="M51.5915 101.442C54.9329 101.442 57.6417 100.794 57.6417 99.9944C57.6417 99.1947 54.9329 98.5465 51.5915 98.5465C48.2501 98.5465 45.5414 99.1947 45.5414 99.9944C45.5414 100.794 48.2501 101.442 51.5915 101.442Z"
        fill="var(--border-gray-default)"
      />
      {/* Ground pebble 3 (centre-right) */}
      <path
        d="M84.2032 101.324C84.2718 100.298 81.6246 99.2885 78.2905 99.0694C74.9565 98.8503 72.1981 99.5043 72.1295 100.53C72.061 101.556 74.7081 102.565 78.0422 102.784C81.3762 103.003 84.1346 102.349 84.2032 101.324Z"
        fill="var(--border-gray-default)"
      />
      {/* Ground pebble 4 (right) */}
      <path
        d="M106.637 106.666C105.808 106.57 104.813 106.602 103.593 106.253C100.3 105.665 97.7247 104.327 97.8432 103.3C97.8669 103.094 97.8669 103.094 98.0978 102.913C101.319 104.117 104.247 105.282 106.637 106.666Z"
        fill="var(--border-gray-default)"
      />
      {/* UFO underside shadow (darker ellipse on the ground) */}
      <path
        d="M94.2385 44.0229C94.945 40.0867 86.1382 35.2409 74.5679 33.1994C62.9975 31.158 53.0451 32.6941 52.3386 36.6303C51.6321 40.5665 60.4389 45.4124 72.0093 47.4538C83.5796 49.4952 93.532 47.9591 94.2385 44.0229Z"
        fill="var(--border-gray-default)"
        stroke="var(--border-gray-default)"
        strokeWidth="1.71429"
        strokeMiterlimit="10"
      />
      {/* Left paper streak (back) */}
      <path
        d="M19.3215 63.0856C19.3215 63.0856 12.115 64.9153 14.2988 66.3791C16.4826 67.7696 21.6509 70.1849 26.5281 68.5747C31.4052 66.9646 26.5281 64.6957 26.6009 64.6957C26.6737 64.6957 19.3215 63.0856 19.3215 63.0856Z"
        fill="var(--border-gray-default)"
      />
      {/* Left paper streak (front) */}
      <path
        d="M10.5134 62.5C13.134 63.3051 21.2141 61.9877 26.3824 58.621C30.4588 63.6711 31.9875 64.9885 33.4434 65.1348C31.1868 67.4037 23.689 71.0631 19.467 66.3059C14.5171 69.453 10.5134 62.5 10.5134 62.5Z"
        fill="var(--background-surface-subtle)"
      />
      {/* Right paper streak */}
      <path
        d="M97.0718 69.0881C99.838 69.2345 107.336 65.8678 111.412 61.3301C116.653 65.2091 118.4 66.0873 119.929 65.8678C118.255 68.6489 113.159 74.7236 105.953 75.1627C100.712 72.0888 97.0718 69.0881 97.0718 69.0881Z"
        fill="var(--background-surface-subtle)"
      />
      {/* Small floating paper (centre under beam) */}
      <path
        d="M73.099 69.1785C72.5517 66.4631 67.4235 60.0404 62.0134 57.2227C64.4646 51.1806 64.88 49.2698 64.2866 47.844C67.3971 48.7727 74.5496 52.1945 76.77 59.0645C75.0985 64.9061 73.099 69.1785 73.099 69.1785Z"
        fill="var(--background-surface-intense)"
      />
      {/* Ground line */}
      <path
        d="M129.559 110.261H123.224H9.04105H0.857117"
        stroke="var(--border-gray-default)"
        strokeWidth="1.71429"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* "4" glyph (left) */}
      <path
        d="M48.7161 93.6419V97.7787H46.2126V101.709H41.4142V97.7787H30.9829V93.0214L40.5797 79.7836H46.0039V93.6419H48.7161ZM41.6228 85.1615L35.5727 93.6419H41.6228V85.1615Z"
        fill="var(--border-gray-default)"
        stroke="var(--text-gray-tertiary)"
        strokeWidth="1.71429"
        strokeMiterlimit="10"
        strokeLinejoin="round"
      />
      {/* "0" glyph (middle) */}
      <path
        d="M62.0228 102.122C57.0158 102.122 52.6346 97.7787 52.6346 90.7462C52.6346 83.7137 57.0158 79.37 62.0228 79.37C67.0298 79.37 71.4109 83.7137 71.4109 90.7462C71.6196 97.5719 67.2384 102.122 62.0228 102.122ZM62.0228 97.7787C64.3177 97.7787 66.8212 95.5035 66.8212 90.5394C66.8212 85.7821 64.5263 83.3 62.0228 83.3C59.7279 83.3 57.2244 85.5752 57.2244 90.5394C57.433 95.5035 59.7279 97.7787 62.0228 97.7787Z"
        fill="var(--border-gray-default)"
        stroke="var(--text-gray-tertiary)"
        strokeWidth="1.71429"
        strokeMiterlimit="10"
        strokeLinejoin="round"
      />
      {/* "4" glyph (right) */}
      <path
        d="M93.4799 93.6419V97.7787H90.9764V101.709H86.178V97.7787H75.7468V93.0214L85.3435 79.7836H90.7678V93.6419H93.4799ZM86.178 85.1615L80.1279 93.6419H86.178V85.1615Z"
        fill="var(--border-gray-default)"
        stroke="var(--text-gray-tertiary)"
        strokeWidth="1.71429"
        strokeMiterlimit="10"
        strokeLinejoin="round"
      />
      <defs>
        <linearGradient
          id={gradientId}
          x1="63.904"
          y1="36.1372"
          x2="63.904"
          y2="96.3275"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="var(--background-surface-intense)" />
          <stop offset="1" stopColor="var(--background-surface-intense)" stopOpacity="0" />
        </linearGradient>
      </defs>
      </svg>
    );
  },
);

NotFound404Illustration.displayName = 'NotFound404Illustration';
