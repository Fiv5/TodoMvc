const HtmlWebpackPlugin = require('html-webpack-plugin')
let path = require('path')

module.exports = {
  entry: {
    name: path.join(__dirname, 'src/main.js'),
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'index.js',
  },
  resolve: {
    extensions: ['.js', '.json'],
  },
  devtool: 'cheap-source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env', 'stage-0', 'react'],
          },
        },
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html',
    }),
    // new webpack.HotModuleReplacementPlugin()  new webpack.DefinePlugin({
    // 'process.env.NODE.ENV':'development' }), new
    // webpack.HotModuleReplacementPlugin()
  ],
}
