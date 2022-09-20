const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = (env = {}) => {
  const { mode = 'development' } = env;
  const isProd = mode === 'production';
  const isDev = mode === 'development';

  const getStyleLoaders = (preProcessor) => {
    const loaders = [
      { loader: 'style-loader' },
      { loader: 'css-loader' },
    ];

    if (preProcessor) {
      loaders.push(
        { loader: 'resolve-url-loader' },
        { loader: preProcessor },
      );
    }

    return loaders;
  };

  return {
    mode: isProd ? 'production' : isDev && 'development',

    entry: './src/index.tsx',

    output: {
      publicPath: '/',
      path: path.resolve(__dirname, 'build'),
      filename: `bundle-${Number(new Date())}.js`,
    },

    devtool: isDev && 'cheap-module-source-map',

    module: {
      rules: [
        {
          ...(!isDev && {
            test: /\.(ts|tsx)$/,
            exclude: /node_modules/,
            include: /src/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env'],
                plugins: [
                  [
                    'transform-remove-console',
                    { exclude: ['error'] },
                  ],
                ],
              },
            },
          }),
        },
        {
          test: /\.(ts|tsx)$/,
          exclude: /node_modules/,
          use: ['ts-loader'],
        },
        {
          test: /\.(css)$/,
          use: getStyleLoaders(),
        },
        {
          test: /\.(scss)$/,
          use: getStyleLoaders('sass-loader'),
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          use: [
            {
              loader: 'file-loader',
              options: {
                outputPath: 'images',
                name: '[name].[ext]',
              },
            },
          ],
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/i,
          use: [
            {
              loader: 'file-loader',
              options: {
                outputPath: 'fonts',
                name: '[name].[ext]',
              },
            },
          ],
        },
      ],
    },

    resolve: {
      extensions: ['*', '.js', '.jsx', '.ts', '.tsx'],

      alias: {
        '@src': path.resolve(__dirname, './src'),
        '@api': path.resolve(__dirname, './src/api'),
        '@assets': path.resolve(__dirname, './src/assets'),
        '@bus': path.resolve(__dirname, './src/bus'),
        '@components': path.resolve(__dirname, './src/components'),
        '@common': path.resolve(__dirname, './src/common'),
        '@helpers': path.resolve(__dirname, './src/helpers'),
        '@pages': path.resolve(__dirname, './src/pages'),
        '@routes': path.resolve(__dirname, './src/routes'),
        '@store': path.resolve(__dirname, './src/store'),
        '@stories': path.resolve(__dirname, './src/stories'),
        '@typings': path.resolve(__dirname, './src/typings'),
        '@utils': path.resolve(__dirname, './src/utils'),
        '@overlays': path.resolve(__dirname, './src/overlays'),
      },
    },

    devServer: {
      open: false,
      historyApiFallback: true,
      overlay: true,
      proxy: [
        {
          context: ['/clients'],
          target: 'https://clients.dev.utg.group',
          secure: false,
          changeOrigin: true,
        },
      ],
    },

    plugins: [
      new HtmlWebpackPlugin({ template: 'public/index.html' }),
      new Dotenv(),
    ],
  };
};
