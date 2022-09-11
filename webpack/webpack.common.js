/* eslint-disable */
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');

const paths = require('../config/paths');
const loaders = require('./loaders');
/* eslint-enable */

module.exports = {
  // Where webpack outputs the assets and bundles
  output: {
    path: paths.dist,
    publicPath: 'auto',

    // output filename of scripts
    filename: 'assets/js/[name].[contenthash:8].js',
    chunkFilename: 'assets/js/[id].[contenthash:8].js',

    // same as `CleanWebpackPlugin`
    clean: true,
  },

  resolve: {
    // aliases used in sources
    alias: {
      Root: paths.root,
      Src: paths.src.root,
      Views: paths.src.views,
      Images: paths.src.images,
      Fonts: paths.src.fonts,
      Styles: paths.src.styles,
      Scripts: paths.src.scripts,
    },
    preferRelative: true,

    // resolve omitted extensions
    extensions: ['.js'],
  },

  // Where webpack looks to start building the bundle
  entry: {
    index: './src/views/pages/index.pug',
    404: './src/views/pages/404.pug',
  },

  // Determine how modules within the project are treated
  module: {
    rules: [
      // pug
      loaders.pugLoader({
        // enable filters only those used in pug
        embedFilters: {
          // :escape
          escape: true,
          // :code
          code: {
            className: 'language-',
          },
        },
      }),

      // styles
      loaders.sassLoader(),

      // images
      loaders.imageLoader(),

      // inline images by size (to force inline use the `?inline` query)
      // ...loaders.inlineImageLoader(2 * 1024),

      // fonts
      loaders.fontLoader(),

      // generates filename including last directory name
      // to group fonts by name

      // eslint-disable-next-line max-len
      // (pathData) => `assets/fonts/${path.basename(path.dirname(pathData.filename))}/[name][ext][query]`
    ],
  },

  // Customize the webpack build process
  plugins: [
    new FaviconsWebpackPlugin({
      logo: './src/assets/images/favicon.png',

      // Enable caching and optionally specify the path to store cached data
      // Note: disabling caching may increase build times considerably
      cache: true,

      prefix: 'assets/favicon/',

      icons: {
        twitter: true,
        windows: true,
      },
    }),
  ],
};
