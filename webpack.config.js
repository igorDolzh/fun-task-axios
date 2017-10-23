let path = require('path')
let webpack = require('webpack')

let plugins =
  process.env.NODE_ENV === 'production' ?
  [
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      minify: true,
      beautify: false
    })
  ] :
  [
    new webpack.optimize.UglifyJsPlugin({
      minify: false,
      beautify: true
    })
  ]

module.exports = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: process.env.NODE_ENV === 'production' ? 'atom.min.js' : 'atom.js',
    libraryTarget: 'umd'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['babel-loader'],
        include: [
          /src\/.*/
        ]
      }
    ]
  },
  plugins,
}