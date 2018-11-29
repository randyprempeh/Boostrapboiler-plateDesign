const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');

// JS file handler
const javascript = {
  test: /\.(js)$/,
  exclude: /(node_modules|bower_components)/,
  use: [{
    loader: 'babel-loader',
    options: {
        presets: ['@babel/preset-env']
    }
  }],
};

// postCSS loader
const postcss = {
  loader: 'postcss-loader',
  options: {
    sourceMap: true,
    plugins() { return [autoprefixer({ browsers: 'last 3 versions' })]; }
  }
};

// sass/css loader
const styles = {
  test: /\.(scss)$/,
  use: ExtractTextPlugin.extract([
      'css-loader?sourceMap',
      postcss,
      'sass-loader?sourceMap'])
};

// font awesome
const fontAwesome =        {
    test: /.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
    use: [{
      loader: 'file-loader',
      options: {
        name: '[name].[ext]',
        outputPath: 'fonts/',
      }
    }]
  };

// compress JS
const uglify = new webpack.optimize.UglifyJsPlugin({
  compress: { warnings: false }
});

// Remove this loader if you don't want to expose jQuery to the global window object.
// But: Don't forget to also remove it in the rules[] array then.
const expose = {
  test: require.resolve('jquery'),
  use: [
    {
      loader: 'expose-loader',
      options: 'jQuery'
    },
    {
      loader: 'expose-loader',
      options: '$'
    }
  ]
};

// bundle everything
const config = {
  entry: {
    app: './assets/src/js/app.js'
  },
  devtool: 'source-map',
  output: {
    path: path.resolve(__dirname, 'assets', 'dist'),
    filename: '[name].bundle.js'
  },
  module: {
    rules: [expose, javascript, styles, fontAwesome]
  },
  plugins: [
    new ExtractTextPlugin('style.css'),
  ]
};

process.noDeprecation = true;

module.exports = config;
