/* eslint-disable */
const PugPlugin = require('pug-plugin')
/* eslint-enable */

module.exports = {
  /**
   * Pug loader.
   *
   * @param {{}} options The pug-loader options.
   * @returns @return {{}} The loader object.
   */
  pugLoader: (options = { method: 'render' }) => ({
    test: /\.pug$/,
    loader: PugPlugin.loader,
    options,
  }),

  // JavaScript: Use Babel to transpile JavaScript files
  javaScriptLoader: () => ({
    test: /\.js$/,
    use: ['babel-loader'],
  }),

  /**
   * Default scss loader.
   *
   * @return {{}} The loader object.
   */
  sassLoader: () => ({
    test: /\.(css|sass|scss)$/,
    use: [
      {
        loader: 'css-loader',
        options: {
          import: false, // disable @import at-rules handling in CSS
        },
      },
      'sass-loader',
    ],
  }),

  /**
   * Default image loader, without image optimisation.
   *
   * @param {string | Function} filename The image output filename.
   * @return {{}} The loader object.
   */
  imageLoader: () => ({
    test: /.(gif|png|jpe?g|svg|webp)$/i,
    type: 'asset/resource',
    // resourceQuery: { not: [/inline/] }, // ignore images with `?inline` query
    // include: /assets\/images/, // images from `assets/images` directory only
    use: {
      loader: 'responsive-loader',
      options: {
        // output filename of images
        name: 'assets/images/[name].[hash:8]-[width]w.[ext]',
      },
    },
  }),

  /**
   * Inline image loader.
   * Inline the .svg file as SVG tag or .png as data URL.
   * Add to module rules using spread operator `...loaders.inlineImageLoader()`.
   * Note: require pug-plugin.
   *
   * @param {number} maxSize Maximal size to inline, defaults 8 KB.
   * @return {{}} The loader object.
   */
  inlineImageLoader: (maxSize = 8 * 1024) => [
    // decide by image size: resource or inline
    {
      test: /\.(png|svg)$/i,
      type: 'asset',
      include: /assets\/images/,
      exclude: /favicon/, // don't inline favicon
      parser: {
        dataUrlCondition: {
          maxSize,
        },
      },
    },
    // force inline images containing `?inline` query
    {
      test: /\.(png|svg)$/i,
      type: 'asset/inline',
      resourceQuery: /inline/,
    },
  ],

  /**
   * Responsive image loader.
   * Convert images to webp.
   *
   * @param {string} filename The image output filename.
   * @return {{}} The loader object.
   */
  // eslint-disable-next-line max-len
  responsiveImageLoader: (filename = 'assets/img/[name].[hash:8]-[width]w.[ext]') => ({
    test: /\.(png|jpe?g|webp|svg)$/i,
    type: 'asset/resource',
    include: /assets\/images/, // images from `assets/images` directory only
    use: {
      loader: 'responsive-loader',
      options: {
        // default adapter required `sharp` module
        // eslint-disable-next-line max-len
        // use the query for srcset `?sizes[]=320,sizes[]=640,sizes[]=960,sizes[]=1024`
        // use the query for resize `?size=320`
        // use the query for format `?format=webp`
        name: filename,
      },
    },
  }),

  /**
   * Font loader.
   *
   * @param {string | Function} filename The font output filename.
   * @return {{}} The loader object.
   */
  fontLoader: (filename = 'assets/fonts/[name][ext][query]') => ({
    test: /\.(woff(2)?|ttf|otf|eot|svg)$/,
    type: 'asset/resource',
    // eslint-disable-next-line max-len
    include: /assets\/fonts|node_modules/, // fonts from `assets/fonts` or `node_modules` directory only
    generator: {
      filename,
    },
  }),
}
