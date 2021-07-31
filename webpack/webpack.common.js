const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const WebpackBar = require('webpackbar');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const webpack = require('webpack');

const { getCssLoader, isDev } = require('./utils');

module.exports = {
  entry: path.join(__dirname, '../src/index.tsx'),
  output: {
    filename: `[name]${isDev ? '' : '.[hash:8]'}.js`,
    path: path.join(__dirname, '../dist'),
  },
  resolve: {
    extensions: ['.js', '.css', '.ts', '.tsx'],
    alias: {
      Src: path.join(__dirname, '../src'),
      Components: path.join(__dirname, '../src/components'),
      Utils: path.join(__dirname, '../src/utils'),
    },
  },
  module: {
    rules: [
      {
        test: /\.(tsx?|js)$/,
        loader: 'babel-loader',
        options: { cacheDirectory: true },
        exclude: /node_modules/,
      },
      // 样式这个放下自己主要的就好了，其余的就删除掉
      {
        test: /\.css$/,
        use: getCssLoader(),
      },
      {
        test: /\.less$/,
        use: [
          ...getCssLoader(),
          {
            loader: 'less-loader',
            options: {
              sourceMap: isDev,
            },
          },
        ],
      },
      {
        test: /\.scss/,
        use: [
          ...getCssLoader(2),
          {
            loader: 'sass-loader',
            options: {
              sourceMap: isDev,
            },
          },
        ],
      },
      {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 8*1024
          }
        }
      },
      {
        test: /\.(ttf|woff|woff2|eot|otf)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: '[name].[contenthash:8].[ext]',
              outputPath: 'assets/fonts',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '../public/index.html'),
      filename: 'index.html',
      cache: false,
      minify: isDev
        ? false
        : {
            removeAttributeQuotes: true,
            collapseWhitespace: true,
            removeComments: true, // 取掉注释
            collapseBooleanAttributes: true,
            collapseInlineTagWhitespace: true,
            removeRedundantAttributes: true,
            removeScriptTypeAttributes: true,
            removeStyleLinkTypeAttributes: true,
            minifyCSS: true,
            minifyJS: true,
            useShortDoctype: true,
          },
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.join(__dirname, '../public'),
          to: path.join(__dirname, '../dist/public'),
          toType: 'dir',
        },
      ],
    }),
    new WebpackBar({
      name: isDev ? '正在启动' : '正在打包',
      color: '#fa8c16',
    }),
    new ForkTsCheckerWebpackPlugin({
      typescript: {
        configFile: path.join(__dirname, '../tsconfig.json'),
      },
    }),
    new webpack.HotModuleReplacementPlugin()
  ],
};
