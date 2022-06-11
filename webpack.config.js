
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// const WebpackPlugin1 = require('./src/plugins/plugin1');
// const WebpackPlugin2 = require('./src/plugins/plugin2');
const FileListPlugin = require('./src/plugins/fileListPlugin');

const RemoveCommentPlugin = require('./src/plugins/removeCommentPlugin');

module.exports = {
  entry: {
    index: path.join(__dirname, 'src/main.js'),
  },
  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'index.js'
  },
  mode: 'development',
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '/index.html'),
    }),
    new CleanWebpackPlugin(),
    // new WebpackPlugin1({ msg: 'hello world' }),
    // new WebpackPlugin2(),
    new FileListPlugin({
      filename: '_filelist.md'
    }),
    new RemoveCommentPlugin(),
  ]
};