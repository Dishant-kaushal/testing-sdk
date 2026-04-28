/// <reference types="vitest/config" />
import { resolve } from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
import { playwright } from '@vitest/browser-playwright';

const dirname = typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react()],
  build: {
    emptyOutDir: false,
    sourcemap: false,
    assetsInlineLimit: 0,
    lib: {
      entry: {
        // Root barrel
        index: resolve(__dirname, "src/index.ts"),

        // Category barrels
        "components/actions/index": resolve(__dirname, "src/components/actions/index.ts"),
        "components/data-display/index": resolve(__dirname, "src/components/data-display/index.ts"),
        "components/feedback/index": resolve(__dirname, "src/components/feedback/index.ts"),
        "components/forms/index": resolve(__dirname, "src/components/forms/index.ts"),
        "components/inputs/index": resolve(__dirname, "src/components/inputs/index.ts"),
        "components/layout/index": resolve(__dirname, "src/components/layout/index.ts"),
        "components/navigation/index": resolve(__dirname, "src/components/navigation/index.ts"),
        "components/overlays/index": resolve(__dirname, "src/components/overlays/index.ts"),
        "components/product/index": resolve(__dirname, "src/components/product/index.ts"),
        "components/surfaces/index": resolve(__dirname, "src/components/surfaces/index.ts"),

        // Per-component entries — Actions
        "components/actions/Button/index": resolve(__dirname, "src/components/actions/Button/index.ts"),
        "components/actions/ButtonGroup/index": resolve(__dirname, "src/components/actions/ButtonGroup/index.ts"),
        "components/actions/IconButton/index": resolve(__dirname, "src/components/actions/IconButton/index.ts"),
        "components/actions/LinkButton/index": resolve(__dirname, "src/components/actions/LinkButton/index.ts"),
        "components/actions/SwitchButton/index": resolve(__dirname, "src/components/actions/SwitchButton/index.ts"),

        // Per-component entries — Data Display
        "components/data-display/Badge/index": resolve(__dirname, "src/components/data-display/Badge/index.ts"),
        "components/data-display/Tag/index": resolve(__dirname, "src/components/data-display/Tag/index.ts"),
        "components/data-display/Chip/index": resolve(__dirname, "src/components/data-display/Chip/index.ts"),
        "components/data-display/Indicator/index": resolve(__dirname, "src/components/data-display/Indicator/index.ts"),
        "components/data-display/Table/index": resolve(__dirname, "src/components/data-display/Table/index.ts"),

        // Per-component entries — Charts
        "components/charts/index": resolve(__dirname, "src/components/charts/index.ts"),
        "components/charts/Chart/index": resolve(__dirname, "src/components/charts/Chart/index.ts"),
        "components/charts/ColumnChart/index": resolve(__dirname, "src/components/charts/ColumnChart/index.ts"),
        "components/charts/LineChart/index": resolve(__dirname, "src/components/charts/LineChart/index.ts"),
        "components/charts/AreaChart/index": resolve(__dirname, "src/components/charts/AreaChart/index.ts"),
        "components/charts/BarChart/index": resolve(__dirname, "src/components/charts/BarChart/index.ts"),
        "components/charts/Gauge/index": resolve(__dirname, "src/components/charts/Gauge/index.ts"),

        // Per-component entries — Feedback
        "components/feedback/Spinner/index": resolve(__dirname, "src/components/feedback/Spinner/index.ts"),
        "components/feedback/ProgressBar/index": resolve(__dirname, "src/components/feedback/ProgressBar/index.ts"),
        "components/feedback/EmptyState/index": resolve(__dirname, "src/components/feedback/EmptyState/index.ts"),
        "components/feedback/Alert/index": resolve(__dirname, "src/components/feedback/Alert/index.ts"),

        // Per-component entries — Forms
        "components/forms/InputFieldHeader/index": resolve(__dirname, "src/components/forms/InputFieldHeader/index.ts"),
        "components/forms/InputFieldFooter/index": resolve(__dirname, "src/components/forms/InputFieldFooter/index.ts"),

        // Per-component entries — Inputs
        "components/inputs/Checkbox/index": resolve(__dirname, "src/components/inputs/Checkbox/index.ts"),
        "components/inputs/Radio/index": resolve(__dirname, "src/components/inputs/Radio/index.ts"),
        "components/inputs/TextArea/index": resolve(__dirname, "src/components/inputs/TextArea/index.ts"),
        "components/inputs/TextInput/index": resolve(__dirname, "src/components/inputs/TextInput/index.ts"),
        "components/inputs/PhoneNumberInput/index": resolve(__dirname, "src/components/inputs/PhoneNumberInput/index.ts"),
        "components/inputs/PasswordInput/index": resolve(__dirname, "src/components/inputs/PasswordInput/index.ts"),
        "components/inputs/CounterInput/index": resolve(__dirname, "src/components/inputs/CounterInput/index.ts"),
        "components/inputs/SelectInput/index": resolve(__dirname, "src/components/inputs/SelectInput/index.ts"),
        "components/inputs/Switch/index": resolve(__dirname, "src/components/inputs/Switch/index.ts"),
        "components/inputs/SearchInput/index": resolve(__dirname, "src/components/inputs/SearchInput/index.ts"),
        "components/inputs/UploadCta/index": resolve(__dirname, "src/components/inputs/UploadCta/index.ts"),

        // Per-component entries — Layout
        "components/layout/Divider/index": resolve(__dirname, "src/components/layout/Divider/index.ts"),

        // Per-component entries — Navigation
        "components/navigation/Tabs/index": resolve(__dirname, "src/components/navigation/Tabs/index.ts"),
        "components/navigation/Pagination/index": resolve(__dirname, "src/components/navigation/Pagination/index.ts"),
        "components/navigation/Breadcrumb/index": resolve(__dirname, "src/components/navigation/Breadcrumb/index.ts"),
        "components/navigation/Stepper/index": resolve(__dirname, "src/components/navigation/Stepper/index.ts"),

        // Per-component entries — Overlays
        "components/overlays/DropdownMenu/index": resolve(__dirname, "src/components/overlays/DropdownMenu/index.ts"),
        "components/overlays/Modal/index": resolve(__dirname, "src/components/overlays/Modal/index.ts"),
        "components/overlays/Popover/index": resolve(__dirname, "src/components/overlays/Popover/index.ts"),
        "components/overlays/Tooltip/index": resolve(__dirname, "src/components/overlays/Tooltip/index.ts"),

        // Per-component entries — Surfaces
        "components/surfaces/Accordion/index": resolve(__dirname, "src/components/surfaces/Accordion/index.ts"),
        "components/surfaces/Card/index": resolve(__dirname, "src/components/surfaces/Card/index.ts"),

        // Per-component entries — Inputs (continued)
        "components/inputs/ColorPicker/index": resolve(__dirname, "src/components/inputs/ColorPicker/index.ts"),
        "components/inputs/DatePicker/index": resolve(__dirname, "src/components/inputs/DatePicker/index.ts"),
        "components/inputs/TimeInput/index": resolve(__dirname, "src/components/inputs/TimeInput/index.ts"),

        // Per-component entries — Product
        "components/product/ComparisonToggle/index": resolve(__dirname, "src/components/product/ComparisonToggle/index.ts"),
        "components/product/DateSelector/index": resolve(__dirname, "src/components/product/DateSelector/index.ts"),
        "components/product/ListCard/index": resolve(__dirname, "src/components/product/ListCard/index.ts"),
        "components/product/ProductAccordion/index": resolve(__dirname, "src/components/product/ProductAccordion/index.ts"),

      },
      formats: ["es"],
      cssFileName: "style",
    },
    minify: "esbuild",
    rollupOptions: {
      external: ["react", "react-dom", "react/jsx-runtime", "react-feather", "highcharts", "highcharts/esm/highcharts", "highcharts/esm/highcharts-more", "highcharts/esm/modules/solid-gauge", "highcharts-react-official", "apexcharts", "react-apexcharts", "libphonenumber-js", "libphonenumber-js/min", "libphonenumber-js/max", "libphonenumber-js/examples.mobile.json", "libphonenumber-js/examples.mobile"],
      output: {
        format: "es",
        preserveModules: true,
        preserveModulesRoot: "src",
        entryFileNames: "[name].js",
        assetFileNames: "style[extname]",
      },
    },
  },
  test: {
    projects: [{
      extends: true,
      plugins: [
        storybookTest({
          configDir: path.join(dirname, '.storybook')
        }),
      ],
      test: {
        name: 'storybook',
        browser: {
          enabled: true,
          headless: true,
          provider: playwright({}),
          instances: [{ browser: 'chromium' }],
        },
      },
    }],
  },
});