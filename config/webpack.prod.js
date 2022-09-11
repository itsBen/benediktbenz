/* eslint-disable */
const { merge } = require('webpack-merge')

const {
  CleanWebpackPlugin,
} = require('clean-webpack-plugin')
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')
const PugPlugin = require('pug-plugin')

const paths = require('../config/paths')
const common = require('./webpack.common')
/* eslint-enable */

module.exports = merge(common, {
  mode: 'production',
  devtool: 'inline-source-map',

  // Customize the webpack build process
  plugins: [

    // Removes/cleans build folders and unused assets when rebuilding
    new CleanWebpackPlugin(),

    new PugPlugin({
      verbose: false, // output information about the process to console
      pretty: false, // output formatted HTML
      // extract CSS from style source files specified directly in Pug
      extractCss: {
        // output filename of styles
        filename: 'assets/css/[name].[contenthash:8].css',
      },
    }),

    new FaviconsWebpackPlugin({
      logo: './src/assets/images/favicon.png',
      icons: {
        twitter: true,
        windows: true,
      },
    }),
  ],

  performance: {
    hints: 'error',
    // in development mode the size of entrypoint
    // and assets is bigger than in production
    maxEntrypointSize: 3000 * 1024,
    maxAssetSize: 3000 * 1024,
  },

  stats: {
    colors: true,
    // see https://webpack.js.org/configuration/stats/#stats-presets
    preset: 'errors-only',
    // enable @debug output
    loggingDebug: [],
  },
})
