import { Output as WebpackOutput } from 'webpack';

import paths from '../helpers/paths';

export default function getOutputConfig(): WebpackOutput {
  return {
    chunkFilename: 'static/js/[name].[chunkhash:8].chunk.js',
    filename: 'static/js/[name].[hash:8].js',
    path: paths.appBuild,
    publicPath: paths.publicPath,
  };
}
