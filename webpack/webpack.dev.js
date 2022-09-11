/* eslint-disable */
const { merge } = require('webpack-merge');

const PugPlugin = require('pug-plugin');

const paths = require('../config/paths');
const common = require('./webpack.common');
/* eslint-enable */

module.exports = merge(common, {
  mode: 'development',
  devtool: 'source-map',

  // Customize the webpack build process
  plugins: [

    new PugPlugin({
      verbose: true, // output information about the process to console
      pretty: true, // output formatted HTML
      // extract CSS from style source files specified directly in Pug
      extractCss: {
        // output filename of styles
        filename: 'assets/css/[name].[contenthash:8].css',
      },
    }),
  ],

  performance: {
    hints: 'warning',
    // in development mode the size of entrypoint
    // and assets is bigger than in production
    maxEntrypointSize: 15000 * 1024,
    maxAssetSize: 4000 * 1024,
  },

  stats: {
    colors: true,
    // see https://webpack.js.org/configuration/stats/#stats-presets
    // preset: 'minimal',
    // enable @debug output

    env: true,
    // include value of --env in the output
    outputPath: true,
    // include absolute output path in the output
    // publicPath: true,
    // // include public path in the output

    assets: true,
    // show list of assets in output

    entrypoints: true,
    // show entrypoints list
    // chunkGroups: true,
    // // show named chunk group list

    // chunks: true,
    // // show list of chunks in output

    // modules: true,
    // // show list of modules in output

    // children: true,
    // // show stats for child compilations

    // logging: true,
    // // show logging in output

    loggingDebug: ['sass-loader'],
    // show debug type logging for some loggers
    // loggingTrace: true,
    // // show stack traces for warnings and errors in logging output

    warnings: true,
    // show warnings

    errors: true,
    // show errors
    errorDetails: true,
    // show details for errors
    // errorStack: true,
    // // show internal stack trace for errors
    // moduleTrace: true,
    // // show module trace for errors
    // // (why was causing module referenced)

    builtAt: true,
    // show timestamp in summary
    errorsCount: true,
    // show errors count in summary
    warningsCount: true,
    // show warnings count in summary
    timings: true,
    // show build timing in summary
    version: true,
    // show webpack version in summary
    hash: true,
    // show build hash in summary
  },

  // define `devServer` settings
  devServer: {
    static: {
      directory: paths.dist,
    },
    compress: true,
    watchFiles: {
      paths: ['src/**/*.*'],
      options: {
        usePolling: true, // für Live Reload ist wichtig
      },
    },

    // open in default browser
    // open: true,
  },
});
