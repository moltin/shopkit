const { join, resolve } = require('path')

const { NODE_ENV } = process.env

const devMode = NODE_ENV !== 'production'

module.exports = {
  mode: devMode ? 'development' : 'production',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: join(__dirname, 'example'),
    compress: true,
    port: 3000,
    open: true,
    overlay: true,
    stats: 'minimal'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  output: {
    path: resolve(__dirname, 'dist'),
    filename: 'index.js'
  }
}
