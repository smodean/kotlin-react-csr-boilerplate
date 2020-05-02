const { realpathSync } = require('fs');

const path = require('path');
const generate = require('@jetbrains/gen-idea-libs');
const librariesLookup = require('@jetbrains/kotlin-webpack-plugin/libraries-lookup');

const libPaths = librariesLookup.lookupKotlinLibraries([
  require(path.resolve(realpathSync(process.cwd()), 'package.json')),
]);

const generationConfig = libPaths.reduce((config, libPath) => ({
  ...config,
  [path.basename(libPath, '.js')]: require.resolve(libPath),
}), {});

generate(generationConfig, realpathSync(process.cwd()));
