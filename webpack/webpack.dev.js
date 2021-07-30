const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');
const proxySettings = require('./utils');
const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer')

const SERVER_HOST = '127.0.0.1';
const SERVER_PORT = 9000;

module.exports = merge(common, {
  mode: 'development',
  devtool: 'eval-source-map',
  devServer: {
    host: SERVER_HOST,
    port: SERVER_PORT,
    contentBase: path.join(__dirname, '../dist'),
    stats: 'errors-only', // 终端打印 error
    clientLogLevel: 'silent', // 终端错误打印
    compress: true, //压缩包
    open: true,
    hot: true,
    proxy: {...proxySettings}
  },
  plugins: [
    new BundleAnalyzerPlugin({
      analyzerMode: 'server',					// 开一个本地服务查看报告
      analyzerHost: '127.0.0.1',			// host 设置
      analyzerPort: 8888,							// 端口号设置
    })
  ]
});
