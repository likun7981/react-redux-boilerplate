const debug = require('debug')('app:webpack:plugins');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const env = require('../base-config/environment');

const isDev = env.isDev;
const isProd = env.isProd;

module.exports = (paths) => {
  const plugins = [
    new webpack.DefinePlugin(env),
    new HtmlWebpackPlugin({
      template: paths.src('index.html'),
      hash: false,
      favicon: paths.src('static/favicon.ico'),
      filename: 'index.html',
      inject: 'body',
      minify: {
        collapseWhitespace: true
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendors']
    }),
    new webpack.LoaderOptionsPlugin({
      options: {
        // postcss: env.config.postcss,
        css: env.config.css
      }
    })
  ];
  if (isDev) {
    debug('Enable HMR,NoEmitOnErrors for development(开启开发环境插件)');
    plugins.push(
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoEmitOnErrorsPlugin() // 报错时不退出webpack进程
    );
  } else {
    debug('Apply ExtractTextPlugin.(非开发环境开启ExtractTextPlugin)');
    plugins.push(
      new ExtractTextPlugin({
        filename: '[name].[hash:8].css',
        allChunks: true
      })
    );
  }
  if (isProd) {
    debug('Enable OccurenceOrder,UglifyJs for production(开启生产环境打包插件)');
    plugins.push(
      new webpack.optimize.OccurrenceOrderPlugin(), // 根据模块使用情况 排序模块序号
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          unused: true,
          dead_code: true,
          warnings: false
        }
      })
    );
  }
  return plugins;
};
