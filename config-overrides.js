const path = require('path');
const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin');

module.exports = function override(config) {
  // Remove CRA's ModuleScopePlugin so aliases outside src/ are allowed
  config.resolve.plugins = config.resolve.plugins.filter(
    (p) => !(p instanceof ModuleScopePlugin)
  );

  // Fix ESM bare-specifier resolution (highcharts/esm/* inside the SDK)
  config.module.rules.push({
    test: /\.m?js$/,
    resolve: { fullySpecified: false },
  });

  // The SDK package is a symlink to the Downloads folder, which has its own
  // node_modules/react. Webpack follows the symlink and finds that copy first,
  // producing two React instances and the "invalid hook call" crash.
  //
  // Prepending the app's node_modules as an absolute path makes webpack always
  // resolve "react" / "react-dom" from here before walking into the symlink's
  // own node_modules directory tree.
  config.resolve.modules = [
    path.resolve(__dirname, 'node_modules'),
    'node_modules',
  ];

  // Belt-and-suspenders: explicit aliases for every react entry point
  config.resolve.alias = {
    ...config.resolve.alias,
    react:                  path.resolve(__dirname, 'node_modules/react'),
    'react-dom':            path.resolve(__dirname, 'node_modules/react-dom'),
    'react/jsx-runtime':    path.resolve(__dirname, 'node_modules/react/jsx-runtime.js'),
    'react/jsx-dev-runtime':path.resolve(__dirname, 'node_modules/react/jsx-dev-runtime.js'),
  };

  return config;
};
