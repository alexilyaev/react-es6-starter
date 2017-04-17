// eslint-disable-next-line strict
'use strict';

const webpack = require('webpack');
const path    = require('path');

// Load Webpack Plugins
const HtmlWebpackPlugin  = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const StyleLintPlugin    = require('stylelint-webpack-plugin');

// Settings
const appEnv            = process.env.NODE_ENV || 'development';
const appPath           = path.join(__dirname, 'app');
const distPath          = path.join(__dirname, 'dist');
const assetsPathPattern = '[path][name].[hash].[ext]';
const distPathPattern   = '[name].[hash].js';
const exclude           = /node_modules/;

const config = {

  // The base directory for resolving `entry` (must be absolute path)
  context: appPath,

  entry: {
    app: [
      'react-hot-loader/patch',
      './app.js'
    ]
  },

  output: {
    // The bundling output directory (must be absolute path)
    path: distPath,
    // Set proper base URL for serving resources
    publicPath: '/',
    // The output filename of the entry chunk, relative to `path`
    // [name] - Will be set per each key name in `entry`
    filename: distPathPattern
  },

  plugins: [
    new webpack.NamedModulesPlugin(),

    // Generate index.html with included script tags
    new HtmlWebpackPlugin({
      inject: 'body',
      template: 'app.html',
      filename: 'index.html'
    }),

    // Lint style files
    new StyleLintPlugin({
      syntax: 'scss'
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
    })
  ],

  module: {
    rules: [
      // Lint JS files (pre-loader)
      {
        enforce: 'pre',
        test: /\.js$/,
        use: [
          'eslint-loader'
        ],
        exclude
      },

      // Transpile JS code
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
            options: { cacheDirectory: true }
          },
        ],
        exclude
      },

      // Allow importing SCSS files
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: { root: appPath }
          },
          'postcss-loader',
          {
            loader: 'sass-loader',
            options: { includePaths: [appPath] }
          }
        ],
        exclude: exclude
      },

      // Allow importing CSS files
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: { root: appPath }
          }
        ]
      },

      // Allow importing image/font files (also when included in CSS)
      // Inline assets under 5kb as Base64 data URI, otherwise use `file-loader`
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
  // `--hot` and `--progress` must be set using CLI
  devServer: {
    contentBase: appPath,
    noInfo: true,
    inline: true,
    compress: true,
    historyApiFallback: true
  }
};

if (appEnv === 'development') {
  config.devtool = 'inline-source-map';
}

if (appEnv === 'production') {
  config.plugins.push(
    // Remove build folder
    new CleanWebpackPlugin(['dist'])
  );
}

module.exports = config;
