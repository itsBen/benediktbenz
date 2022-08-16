const {
  CleanWebpackPlugin
} = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ImageminWebpWebpackPlugin= require("imagemin-webp-webpack-plugin")
const ESLintPlugin = require('eslint-webpack-plugin')
const FaviconsWebpackPlugin = require("favicons-webpack-plugin")

const paths = require('./paths')

const rule = {
  // JavaScript: Use Babel to transpile JavaScript files
  js: {
    test: /\.js$/,
    use: ['babel-loader']
  },

  // Images: Copy image files to dist folder
  images: {
    test: /\.(?:ico|gif|png|jpg|jpeg|webp)$/i,
    type: 'asset/resource'
  },

  // Fonts and SVGs: Inline files
  fonts: {
    test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
    type: 'asset/inline'
  },

  // Pug files
  pug: {
    test: /\.pug$/,
    use: [
      {
        loader: 'html-loader',
        options: {
          // Disables attributes processing
          sources: false,
        },
      },
      {
        loader: 'pug-html-loader',
      }
    ]
  }
}

module.exports = {
  // Where webpack looks to start building the bundle
  entry: [paths.src + '/app.js'],

  // Where webpack outputs the assets and bundles
  output: {
    assetModuleFilename: 'assets/[name][ext]',
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

    new ImageminWebpWebpackPlugin(),

    new HtmlWebpackPlugin({
      template: paths.src + '/views/index.pug',
      filename: 'index.html',
      inject: 'head',
    }),

    new HtmlWebpackPlugin({
      template: paths.src + '/views/404.pug',
      filename: '404.html', // output file
      inject: 'head',
    }),

    // ESLint configuration
    new ESLintPlugin({
      files: ['.', 'src', 'config'],
      formatter: 'table',
    }),

    new FaviconsWebpackPlugin({
      logo: "./src/images/favicon.png",
      icons: {
        twitter: true,
        windows: true,
      },
    }),
  ],

  // Determine how modules within the project are treated
  module: {
    rules: [rule.js, rule.fonts, rule.images, rule.pug],
  },

  resolve: {
    modules: [paths.src, 'node_modules'],
    extensions: ['.js', '.jsx', '.json'],
    alias: {
      '@': paths.src,
    },
  },
}
