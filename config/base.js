/* eslint-disable */
import path from 'path';
import webpack from 'webpack';
import nodeExternals from 'webpack-node-externals';

export default function base (options) {

  // TODO: splitout vendor bundle //vendor: options.dependencies,
  const getEntry = () => options.isDev
    ? [
      'react-hot-loader/patch',
      'babel-polyfill',
      options.mainEntry
    ]
    : [
      'babel-polyfill',
      options.mainEntry
    ]

  const getOutput = () => ({
    path: options.publicDir,
    chunkFilename: options.jsFilename,
    publicPath: options.publicPath,
    filename: options.jsFilename,
  });

  const getResolve = () => ({
    extensions: ['*', '.js', '.jsx'],
    modules: ['node_modules', options.contentBase]
  });

  const getExternals = () => options.isNode
    ? nodeExternals({ ...options.nodeExternalsConfig })
    : [];

  return {
    bail: options.webpackBail,
    cache: options.cache,
    context: options.context,
    devtool: options.isDev ? 'eval-source-map' : 'source-map',
    entry: getEntry(),
    externals: getExternals(),
    output: getOutput(),
    performance: { ...options.performanceConfig },
    profile: options.webpackProfile,
    recordsInputPath: options.recordsOutputPath,
    recordsOutputPath: options.recordsOutputPath,
    recordsPath: options.recordsOutputPath,
    resolve: getResolve(),
    stats: { ...options.statsConfig },
    ...options.webpackConfig,
  };
}
