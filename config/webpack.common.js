const {
  CleanWebpackPlugin
} = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const PrettierPlugin = require('prettier-webpack-plugin')
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin')
const PreloadWebpackPlugin = require('preload-webpack-plugin')
const ESLintPlugin = require('eslint-webpack-plugin')

const paths = require('./paths')

module.exports = {
  // Where webpack looks to start building the bundle
  entry: [paths.src + '/index.js'],

  // Where webpack outputs the assets and bundles
  output: {
    path: paths.build,
    filename: '[name].bundle.js',
    publicPath: '/',
  },

  // Customize the webpack build process
  plugins: [
    // Removes/cleans build folders and unused assets when rebuilding
    new CleanWebpackPlugin(),

    // Copies files from target to destination folder
    new CopyWebpackPlugin({
      patterns: [{
        from: paths.public,
        to: 'assets',
        globOptions: {
          ignore: ['*.DS_Store'],
        },
        noErrorOnMissing: true,
      }, ],
    }),

    // Generates an HTML file from a template
    // Generates deprecation warning: https://github.com/jantimon/html-webpack-plugin/issues/1501
    new HtmlWebpackPlugin({
      title: 'webpack Boilerplate',
      favicon: paths.src + '/images/favicon.ico',
      template: paths.src + '/template.html', // template file
      filename: 'index.html', // output file
      inject: 'head',
    }),

    new HtmlWebpackPlugin({
      title: '404-page',
      template: paths.src + '/404.html', // template file
      filename: '404.html', // output file
      inject: 'head'
    }),

    new PreloadWebpackPlugin({
      rel: 'preload',
      as(entry) {
        if (/\.(woff|woff2|ttf|otf)$/.test(entry)) return 'font'
        return 'script'
      },
      fileWhitelist: [/\.(woff|woff2|ttf|otf)$/],
      include: 'allAssets'
    }),

    new ScriptExtHtmlWebpackPlugin({
      defaultAttribute: 'defer'
    }),

    // ESLint configuration
    new ESLintPlugin({
      files: ['.', 'src', 'config'],
      formatter: 'table',
    }),

    // Prettier configuration
    new PrettierPlugin(),
  ],

  // Determine how modules within the project are treated
  module: {
    rules: [
      // JavaScript: Use Babel to transpile JavaScript files
      {
        test: /\.js$/,
        use: ['babel-loader']
      },

      // Images: Copy image files to build folder
      {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        type: 'asset/resource'
      },

      // Fonts and SVGs: Inline files
      {
        test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
        type: 'asset/inline'
      },
    ],
  },

  resolve: {
    modules: [paths.src, 'node_modules'],
    extensions: ['.js', '.jsx', '.json'],
    alias: {
      '@': paths.src,
    },
  },
}