const HtmlWebpackPlugin = require('html-webpack-plugin')
let path = require('path')

module.exports = {
  entry: {
    name: path.join(__dirname, 'src/index.js'),
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'index.js',
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
  },
  devtool: 'cheap-source-map',
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            css: [
              'vue-style-loader',
              {
                loader: 'css-loader',
                options: { sourceMap: true },
              },
            ],
            postcss: [
              'vue-style-loader',
              {
                loader: 'css-loader',
                options: { sourceMap: true },
              },
            ],
            less: [
              'vue-style-loader',
              { loader: 'css-loader', options: { sourceMap: true } },
              { loader: 'less-loader', options: { sourceMap: true } },
            ],
          },
        },
      },
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['react'],
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
