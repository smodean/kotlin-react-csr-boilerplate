declare module '@jetbrains/kotlin-webpack-plugin' {
  export interface KotlinWebpackPluginOptions {
    librariesAutoLookup?: boolean;
    moduleName?: string;
    optimize?: boolean;
    output?: string;
    packagesContents?: Array<object>;
    src: string | Array<string> | null;
    verbose?: boolean;
    sourceMaps?: boolean;
    sourceMapEmbedSources?: 'always' | 'never' | string;
    metaInfo?: boolean;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    libraries?: Array<any>;
  }

  class KotlinWebpackPlugin {
    constructor(options?: KotlinWebpackPluginOptions)
  }

  export default KotlinWebpackPlugin;
}
