'use strict';

const webpack = require('webpack');
const path = require('path');

// Load Webpack Plugins
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const ProgressPlugin = require('webpack/lib/ProgressPlugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

// Settings
const appEnv = process.env.NODE_ENV || 'development';
const isProduction = appEnv === 'production';
const isDevelopment = appEnv === 'development';
const appPath = path.join(__dirname, 'app');
const distPath = path.join(__dirname, 'dist');
const assetsPathPattern = '[path][name].[hash].[ext]';
const distPathPattern = isProduction ? '[name].[chunkhash].js' : '[name].js';
const exclude = /node_modules/;
const publicPath = '/';
const PORT = process.env.PORT || 8080;
const noop = () => {};

const config = {
  // The base directory for resolving `entry` (must be absolute path)
  context: appPath,

  entry: {
    app: ['react-hot-loader/patch', './app.js']
  },

  output: {
    // The bundling output directory (must be absolute path)
    path: distPath,
    // Set proper base URL for serving resources
    publicPath: publicPath,
    // The output filename of the entry chunk, relative to `path`
    // [name] - Will be set per each key name in `entry`
    filename: distPathPattern
  },

  plugins: [
    // Show progress in command line, needed because adding `devServer.progress` doesn't work
    new ProgressPlugin({ profile: false }),

    // Better module names in console and needed for Hot Module Reloading
    new webpack.NamedModulesPlugin(),

    // Better chunk names, needed for long term caching
    new webpack.NamedChunksPlugin(),

    // Generate index.html with included script tags
    new HtmlWebpackPlugin({
      inject: 'body',
      template: 'app.html',
      filename: 'index.html'
    }),

    // Lint style files
    new StyleLintPlugin({
      syntax: 'scss',
      emitErrors: false
    }),

    // Do not output to dist if there are errors
    new webpack.NoEmitOnErrorsPlugin(),

    // Define global variables that will be available in any chunk
    new webpack.DefinePlugin({
      // Make sure env variables are available on client and server code
      // Used by React to cleanup debugging properties when using NODE_ENV === `production`
      'process.env': {
        NODE_ENV: JSON.stringify(appEnv)
      }
    }),

    // Experimental: Webpack Scope Hoisting
    // Should add `--display-optimization-bailout` to the `build` script in `package.json`
    // new webpack.optimize.ModuleConcatenationPlugin(),

    // Nicer errors/warning in CLI
    isDevelopment
      ? new FriendlyErrorsWebpackPlugin({
        compilationSuccessInfo: {
          messages: [`You're good to go:`, `http://localhost:${PORT}`]
        },
        clearConsole: true
      })
      : noop,

    // Remove build folder
    isProduction ? new CleanWebpackPlugin(['dist']) : noop
  ],

  module: {
    rules: [
      // Lint JS files (pre-loader)
      {
        enforce: 'pre',
        test: /\.js$/,
        use: ['eslint-loader'],
        exclude
      },

      // Allow importing JS files, transpile using Babel
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
            options: { cacheDirectory: true }
          }
        ],
        exclude
      },

      // Allow importing SCSS files, transpile using node-sass and PostCSS
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader',
            options: { sourceMap: isDevelopment }
          },
          {
            loader: 'css-loader',
            options: {
              root: appPath,
              sourceMap: isDevelopment
            }
          },
          {
            loader: 'postcss-loader',
            options: { sourceMap: isDevelopment }
          },
          {
            loader: 'sass-loader',
            options: {
              includePaths: [appPath],
              sourceMap: isDevelopment
            }
          }
        ],
        exclude
      },

      // Allow importing CSS files, also from node_modules
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
            options: { sourceMap: isDevelopment }
          },
          {
            loader: 'css-loader',
            options: {
              root: appPath,
              sourceMap: isDevelopment
            }
          }
        ]
      },

      // Allow importing image/font files (also when included in CSS)
      // Inline assets under 5kb as Base64 data URI, otherwise uses `file-loader`
      {
        test: /\.(jpe?g|png|gif|svg|eot|woff2?|ttf|otf)(\?.*)?$/i,
        use: {
          loader: 'url-loader',
          options: {
            limit: 5120,
            name: assetsPathPattern
          }
        }
      }
    ]
  },

  // Settings for webpack-dev-server
  // https://webpack.js.org/configuration/dev-server/
  // `--hot` must be set using CLI, will set `hot` and add HotModuleReplacementPlugin automatically
  devServer: {
    clientLogLevel: 'warning',
    compress: true,
    contentBase: appPath,
    historyApiFallback: true,
    noInfo: true,
    overlay: {
      warnings: false,
      errors: true
    },
    port: PORT,
    publicPath: publicPath
  },

  // Map transpiled code to original source code for debugging, loaded only if DevTools is opened
  // https://webpack.js.org/guides/development/#using-source-maps
  // https://webpack.js.org/configuration/devtool/
  devtool: isProduction ? 'source-map' : 'inline-source-map'
};

module.exports = config;
