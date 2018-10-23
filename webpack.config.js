const webpack = require('webpack')
const basePath = dir => require('path').join(__dirname, dir)
const ExtractTextPlugin = require("extract-text-webpack-plugin")
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')

module.exports = {
  target: 'web',
  entry: ['./src/main.js'],
  output: {
    path: basePath('dist'),
    publicPath: '/dist/',
    filename: 'bundle.js'
  },
  plugins: [
    new ExtractTextPlugin('bundle.css'),
    new FriendlyErrorsWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  resolve: {
    extensions: ['.js'],
    alias: {
      '@': basePath('src')
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: [basePath('src')],
      },
      {
        test: /\.sass$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            'css-loader',
            'sass-loader'
          ]
        }),
        include: [basePath('src')],
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [basePath('src')]
      }
    ]
  }
}
