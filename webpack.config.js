// eslint-disable-next-line strict
'use strict';

const webpack = require('webpack');
const path    = require('path');

// Load Webpack Plugins
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanPlugin       = require('clean-webpack-plugin');
const StyleLintPlugin   = require('stylelint-webpack-plugin');

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

    // Generate index.html with included script tags
    new HtmlWebpackPlugin({
      inject: 'body',
      template: 'app.html',
      filename: 'index.html'
    }),

    // Lint CSS/SCSS files
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
      // Lint JS files
      {
        enforce: 'pre',
        test: /\.js$/,
        loaders: [
          'eslint-loader'
        ],
        exclude
      },

      // Transpile ES6 and enable Hot Reload
      {
        test: /\.js$/,
        use: 'babel-loader?cacheDirectory',
        exclude
      },

      // Allow `require`ing SCSS files
      {
        test: /\.scss$/,
        loaders: [
          'style-loader',
          'css-loader?root=' + encodeURIComponent(appPath),
          'postcss-loader',
          'sass-loader?includePaths[]=' + encodeURIComponent(appPath)
        ],
        exclude: exclude
      },

      // Allow `require`ing CSS files
      {
        test: /\.css$/,
        loaders: [
          'style-loader',
          'css-loader?root=' + encodeURIComponent(appPath)
        ]
      },

      // Allow `require`ing image/font files (also when included in CSS)
      // Inline assets under 5kb as Base64 data URI, otherwise uses `file-loader`
      {
        test: /\.(jpe?g|png|gif|svg|eot|woff2?|ttf|otf)(\?.*)?$/i,
        use: 'url-loader?limit=5120&name=' + assetsPathPattern
      }
    ]
  },

  // Settings for webpack-dev-server
  // `--hot` and `--progress` must be set using CLI
  devServer: {
    contentBase: appPath,
    noInfo: true,
    inline: true,
    historyApiFallback: {
      index: '/'
    }
  }
};

if (appEnv === 'development') {
  config.devtool = '#inline-source-map';
}

if (appEnv === 'production') {
  config.plugins.push(
    // Remove build folder
    new CleanPlugin(['dist'])
  );
}

module.exports = config;
