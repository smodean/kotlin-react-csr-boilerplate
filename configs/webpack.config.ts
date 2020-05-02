import { Configuration } from './types/webpack';

import {
  getDevServerConfig,
  getModuleConfig,
  getPluginsConfig,
  getResolveConfig,
  getOutputConfig,
  getOptimizationConfig,
} from './webpack';

import { KOTLIN_APP_NAME } from './helpers/constants';
import Env from './helpers/Env';

const env = new Env({
  DEV_SERVER_PORT: 3000,
});

const config: Configuration = {
  bail: env.IS_PRODUCTION,
  devServer: getDevServerConfig(env),
  devtool: env.IS_PRODUCTION ? 'source-map' : 'cheap-module-source-map',
  entry: [KOTLIN_APP_NAME],
  mode: (process.env.NODE_ENV as Configuration['mode']),
  module: getModuleConfig(),
  optimization: getOptimizationConfig(),
  output: getOutputConfig(),
  plugins: getPluginsConfig(env),
  resolve: getResolveConfig(),
};

export default config;
