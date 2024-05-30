const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const devMode = process.env.NODE_ENV !== 'production';

module.exports = {
  paths: {
    // Set the source directory to 'atomic'
    appSrc: path.resolve(__dirname, './src'),
    appIndexJs: path.resolve(__dirname, './src/index.tsx'),
  },
  webpack: {
    configure: (webpackConfig, { env, paths }) => {
      // Modify the output filename for JavaScript bundles
      webpackConfig.output.filename = 'js/[name].bundle.js';
      webpackConfig.output.chunkFilename = 'js/[name].[contenthash:8].chunk.js';

      // Modify the output filename for CSS bundles (assuming you're using MiniCssExtractPlugin)
      const miniCssPluginIndex = webpackConfig.plugins.findIndex(
        (plugin) => plugin.constructor.name === 'MiniCssExtractPlugin'
      );
      if (miniCssPluginIndex !== -1) {
        webpackConfig.plugins[miniCssPluginIndex].options.filename =
          'css/[name].css';
      }

      // Add a rule for handling image files
      webpackConfig.module.rules.push({
        test: /\.(png|jpe?g|gif|svg)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'media/[name].[hash].[ext]', // Customize the output path for images
            },
          },
        ],
      });

      // Add your specific source-map-loader rule
      webpackConfig.module.rules.push({
        test: /\.js$/,
        enforce: 'pre',
        use: ['source-map-loader'],
      });

      // Add a rule for handling CSS files with postcss-loader and css-loader
      webpackConfig.module.rules.push({
        test: /\.css$/,
        use: [
          //   devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          //   {
          //     loader: 'css-loader',
          //     options: {
          //       modules: {
          //         localIdentName: '[hash:base64:5]', // Hash class names
          //       },
          //     },
          //   },
          //   'postcss-loader',
        ],
      });

      // Set the ignoreWarnings property
      webpackConfig.ignoreWarnings = [/Failed to parse source map/];

      return webpackConfig;
    },
  },
  jest: {
    verbose: true,
    configure: (jestConfig, { env, paths, resolve, rootDir }) => {
      /* ... */
      // jestConfig.rootDir = path.resolve(__dirname, "atomic");

      return jestConfig;
    },
  },
};
