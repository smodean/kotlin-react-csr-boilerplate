import { Module as WebpackModule } from 'webpack';

import {
  nodeModulesRegExp, tsJsRegExp, cssRegExp, imageRegExp, fontRegExp,
} from '../helpers/regEpx';
import paths from '../helpers/paths';

export default function getModuleConfig(): WebpackModule {
  return {
    rules: [
      {
        exclude: nodeModulesRegExp,
        test: tsJsRegExp,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        exclude: nodeModulesRegExp,
        include: paths.kotlinOutputPath,
        test: tsJsRegExp,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: cssRegExp,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
        ],
      },
      {
        test: imageRegExp,
        use: [
          {
            loader: 'file-loader',
            options: {
              limit: 10000,
              name: 'static/media/[name].[hash:8].[ext]',
            },
          },
        ],
      },
      {
        test: fontRegExp,
        use: [
          {
            loader: 'file-loader',
            options: {
              limit: 10000,
              name: 'static/media/[name].[hash:8].[ext]',
            },
          },
        ],
      },
    ],
  };
}
