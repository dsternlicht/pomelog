/* global __dirname, require, module*/

const webpack = require('webpack');
const UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
const pkg = require('./package.json');
const libraryName = pkg.name;

const config = (buildType) => {
  let plugins = [],
      outputExt = '.js',
      devtool,
      libraryExport = 'default';
  if (buildType === 'min') {
    plugins = [new UglifyJsPlugin({minimize: true})];
    outputExt = '.min.js';
  } else if (buildType === 'es') {
    outputExt = '.es.js';
    libraryExport = undefined;
  } else {
    devtool = 'source-map';
  }

  return {
    entry: __dirname + '/src/pomelog.ts',
    devtool: devtool,
    output: {
      path: __dirname + '/dist',
      filename: libraryName + outputExt,
      library: libraryName,
      libraryTarget: 'umd',
      libraryExport: libraryExport,
      umdNamedDefine: true
    },
    module: {
      rules: [
        {
          test: /(\.ts)$/,
          loader: 'ts-loader'
        }
      ]
    },
    resolve: {
      extensions: ['.ts', '.js']
    },
    plugins: plugins
  }
};

module.exports = ['default', 'min', 'es'].map(config);
