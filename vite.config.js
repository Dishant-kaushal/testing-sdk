import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// highcharts-react-official ships only a UMD bundle (no ESM export).
// Vite 8's esbuild pre-bundler wraps it with __commonJSMin and emits
//   export default require_highcharts_react_min()
// which returns the full module.exports object
//   { __esModule: true, default: Component }
// instead of the component itself. The SDK dist files import it as
//   import b from "highcharts-react-official"
// and pass `b` directly to JSX, causing "Element type is invalid: got object".
//
// Fix: a transform plugin that rewrites those imports in the SDK dist files
// to explicitly pull .default, so `b = moduleExports.default ?? moduleExports`.
function fixHighchartsReactInterop() {
  return {
    name: 'fix-highcharts-react-interop',
    enforce: 'pre',
    transform(code, id) {
      // Transform any file that imports from highcharts-react-official
      if (code.includes('"highcharts-react-official"') || code.includes("'highcharts-react-official'")) {
        const transformed = code.replace(
          /import\s+(\w+)\s+from\s+["']highcharts-react-official["'];?/g,
          (_, name) =>
            `import _${name}_hrc from "highcharts-react-official";\nconst ${name} = _${name}_hrc?.default ?? _${name}_hrc;`
        );
        if (transformed !== code) {
          console.log('[fixHighchartsReactInterop] Transformed:', id);
          return transformed;
        }
      }
    },
  };
}

export default defineConfig({
  plugins: [react(), fixHighchartsReactInterop()],
  resolve: {
    dedupe: ['react', 'react-dom', '@table-library/react-table-library', 'highcharts'],
  },
  optimizeDeps: {
    include: ['highcharts-react-official'],
  },
  publicDir: 'public',
});
