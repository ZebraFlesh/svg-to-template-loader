var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var merge = require('webpack-merge');

process.env.BABEL_ENV = process.env.npm_lifecycle_event;

var PATHS = {
  app: path.join(__dirname, '.'),
  build: path.join(__dirname, 'dist')
};

var common = {
  entry: {
    app: PATHS.app
  },
  devtool: 'source-map',
  output: {
    path: PATHS.build,
    filename: '[name].js'
  },
  module: {
    loaders: [
      {
        test: /\.(js|jsx)?$/,
        loaders: ['babel-loader'],
        // Parse only app files! Without this it will go through
        // the entire project. In addition to being slow,
        // that will most likely result in an error.
        include: PATHS.app
      }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({ React: 'react' }),
    new HtmlWebpackPlugin({ title: 'Webpack 1.x demo' })
  ]
};

var parts = {
  setupCSS: function (options) {
    return {
      module: {
        loaders: [
          {
            test: /\.css$/,
            loaders: ['style', 'css'],
            include: options
          }
        ]
      }
    }
  },
  devServer: function (options) {
    return {
      devServer: {
        // Enable history API fallback so HTML5 History API based
        // routing works. This is a good default that will come
        // in handy in more complicated setups.
        historyApiFallback: true,

        // Unlike the cli flag, this doesn't set
        // HotModuleReplacementPlugin!
        hot: true,
        inline: true,

        // Display only errors to reduce the amount of output.
        stats: 'errors-only',

        // Parse host and port from env to allow customization.
        //
        // If you use Vagrant or Cloud9, set
        // host: options.host || '0.0.0.0';
        //
        // 0.0.0.0 is available to all network devices
        // unlike default `localhost`.
        host: options.host, // Defaults to `localhost`
        port: options.port // Defaults to 8080
      },
      plugins: [
        // Enable multi-pass compilation for enhanced performance
        // in larger projects. Good default.
        new webpack.HotModuleReplacementPlugin({
          multiStep: true
        })
      ]
    }
  }
};

var config;

// Detect how npm is run and branch based on that
switch (process.env.npm_lifecycle_event) {
  case 'build':
    config = merge(
      common,
      parts.setupCSS(PATHS.app)
    );
    break;
  default:
    config = merge(
      common,
      parts.setupCSS(PATHS.app),
      parts.devServer({
        // Customize host/port here if needed
        host: process.env.HOST,
        port: process.env.PORT
      })
    );

    break;
}

module.exports = config;
