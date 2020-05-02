import { Plugin as WebpackPlugin, HotModuleReplacementPlugin } from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import HtmlWebpackPlugin, { Options as HtmlWebpackPluginOptions } from 'html-webpack-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import CaseSensitivePathsPlugin from 'case-sensitive-paths-webpack-plugin';
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import KotlinWebpackPlugin from '@jetbrains/kotlin-webpack-plugin';
import ManifestPlugin from 'webpack-manifest-plugin';

import paths from '../helpers/paths';
import Env from '../helpers/Env';
import { KOTLIN_APP_NAME } from '../helpers/constants';

export default function getWebpackPlugins(env: Env): WebpackPlugin[] {
  const plugins = [
    ((): HotModuleReplacementPlugin | null => {
      if (env.IS_DEVELOPMENT) {
        return new HotModuleReplacementPlugin();
      }

      return null;
    })(),
    new CaseSensitivePathsPlugin(),
    ((): HtmlWebpackPlugin => {
      const minifyHtmlWebpackPlugin = ((): HtmlWebpackPluginOptions['minify'] => {
        if (env.IS_PRODUCTION) {
          return {
            collapseWhitespace: true,
            keepClosingSlash: true,
            minifyCSS: true,
            minifyJS: true,
            minifyURLs: true,
            removeComments: true,
            removeEmptyAttributes: true,
            removeRedundantAttributes: true,
            removeStyleLinkTypeAttributes: true,
            useShortDoctype: true,
          };
        }

        return false;
      })();

      return new HtmlWebpackPlugin({
        favicon: paths.appFavicon,
        minify: minifyHtmlWebpackPlugin,
        template: paths.appHtml,
      });
    })(),
    ((): MiniCssExtractPlugin | null => {
      if (env.IS_PRODUCTION) {
        return new MiniCssExtractPlugin({
          chunkFilename: 'static/css/[name].[contenthash:8].chunk.css',
          filename: 'static/css/[name].[contenthash:8].css',
        });
      }

      return null;
    })(),
    ((): BundleAnalyzerPlugin | null => {
      if (env.IS_PRODUCTION && env.ANALYZE_BUNDLE) {
        return new BundleAnalyzerPlugin({
          analyzerMode: 'static',
          openAnalyzer: true,
        });
      }

      return null;
    })(),
    new ManifestPlugin({
      fileName: 'asset-manifest.json',
    }),
    new KotlinWebpackPlugin({
      librariesAutoLookup: true,
      moduleName: KOTLIN_APP_NAME,
      optimize: env.IS_PRODUCTION,
      output: paths.kotlinOutputPath,
      packagesContents: [
        require(paths.appPackageJson),
      ],
      src: paths.appSrc,
      verbose: true,
    }),
  ];

  return plugins.filter(Boolean) as NonNullable<Array<WebpackPlugin>>;
}
