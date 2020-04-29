const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');


module.exports = {
  entry: {
    ancestors: './src/js/index.js'
  },

  output: {
    
    filename: '[name].bundle.js',
    publicPath: '/dist/',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].bundle.css',
    }),
    new CopyPlugin([
      { // copy webcomponent bundle js files
        from: "./node_modules/@webcomponents/webcomponentsjs/bundles",
        to: "./webcomponents_polyfills/bundles"
      },
      { // copy webcomponent loder file
        from: "./node_modules/@webcomponents/webcomponentsjs/webcomponents-loader.js",
        to: "./webcomponents_polyfills/"
      }
    ])
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
    ],
  },

};
