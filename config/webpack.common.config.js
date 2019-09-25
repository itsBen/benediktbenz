const paths                     = require("./paths");

const path                      = require("path");
const { CleanWebpackPlugin }    = require("clean-webpack-plugin");
const CopyWebpackPlugin         = require("copy-webpack-plugin");
const HtmlWebpackPlugin         = require("html-webpack-plugin");

// define rules

/**
 * JavaScript
 *
 * Use Babel to transpile JavaScript files.
 */
const ruleJS = {
    test: /\.js$/,
    exclude: /node_modules/,
    use: ["babel-loader", "eslint-loader"],
}

/**
 * Styles
 *
 * Inject CSS into the head with source maps.
 */
const ruleStyles =       {
    test: /\.(scss|css)$/,
    use: [
        "style-loader",
        { loader: "css-loader"      , options: { sourceMap: true, importLoaders: 1 } },
        { loader: "postcss-loader"  , options: { sourceMap: true } },
        { loader: "sass-loader"     , options: { sourceMap: true } },
    ],
}

/**
* Images
*
* Copy image files to build folder.
*/
const ruleImages = {
    test: /\.(?:ico|gif|png|jpg|jpeg|webp|svg)$/i,
    loader: "file-loader",
    options: {
        name: "[path][name].[ext]",
        context: "src", // prevent display of src/ in filename
    },
}

/**
 * Fonts
 *
 * Inline font files.
 */
const ruleFonts = {
    test: /\.(woff(2)?|eot|ttf|otf|)$/,
    loader: "url-loader",
    options: {
        limit: 8192,
        name: "[path][name].[ext]",
        context: "src", // prevent display of src/ in filename
    },
}

/**
 * Pug
 *
 * Pug files.
 */
const rulePug = {
    test: /\.pug$/,
    loaders: [ "pug-loader" ]
}

module.exports = {
  /**
   * Entry
   *
   * The first place Webpack looks to start building the bundle.
   */
  entry: {
    main: paths.src + "/index.js",
  },

  /**
   * Output
   *
   * Where Webpack outputs the assets and bundles.
   */
  output: {
    path: paths.build,
    filename: "[name].bundle.js",
  },

  /**
   * Plugins
   *
   * Customize the Webpack build process.
   */
  plugins: [
    /**
     * CleanWebpackPlugin
     *
     * Removes/cleans build folders and unused assets when rebuilding.
     */
    new CleanWebpackPlugin(),

    /**
     * CopyWebpackPlugin
     *
     * Copies files from target to destination folder.
     */
    new CopyWebpackPlugin([
      {
        from: paths.static,
        to: "assets",
        ignore: ["*.DS_Store"],
      },
    ]),

    /**
     * HtmlWebpackPlugin
     *
     * Generates an HTML file from a template.
     */
    new HtmlWebpackPlugin({
      //favicon: paths.src + "/images/favicon.png",
      template: paths.src + "/views/index.pug", // output file
    }),
  ],

  /**
   * Module
   *
   * Determine how modules within the project are treated.
   */
  module: {
    rules: [ ruleJS, ruleFonts, ruleImages, ruleStyles, rulePug ],
  },
}