const HtmlWebpackPlugin = require('html-webpack-plugin');
const InterpolateHtmlPlugin = require('interpolate-html-plugin');
const Dotenv = require('dotenv-webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const port = process.env.PORT || 3000;

module.exports = {
  mode: 'development',  
  entry: './src/index.js',
  output: {
    filename: 'bundle.[hash].js'
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.(s?)css$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              sourceMap: true
            }
          },
          {
            loader: 'sass-loader'
        }
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
        filename: "styles.css",
        chunkFilename: "styles.css"
    }),
    new Dotenv(),
    new HtmlWebpackPlugin({
      template: 'public/index.html'
    }),
    new InterpolateHtmlPlugin({
        PUBLIC_URL: JSON.stringify('http://localhost:3000') // can modify `static` to another name or get it from `process`
    }),
  ],
  devServer: {
    host: 'localhost',
    port: port,
    historyApiFallback: true,
    open: true
  }
};