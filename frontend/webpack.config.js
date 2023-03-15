// const webpack = require('webpack');
const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const Dotenv = require("dotenv-webpack")
const WorkboxPlugin = require("workbox-webpack-plugin")
const CopyWebpackPlugin = require("copy-webpack-plugin")
// const WebpackBundleAnalyzer =
//   require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const config = (env, argv) => {
  // console.log("CONFIG ENV", env)
  // console.log("CONFIG ARGV", argv)
  return {
    entry: ["react-hot-loader/patch", "./src/index.tsx"],
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "[name].[contenthash].js",
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          use: "babel-loader",
          exclude: /node_modules/,
        },
        {
          test: /\.ts(x)?$/,
          loader: "ts-loader",
          exclude: /node_modules/,
        },
        {
          test: /\.(jpe?g|png|gif)$/i,
          use: [
            {
              loader: "url-loader",
              options: {
                mimetype: "image/png",
              },
            },
          ],
        },
        {
          test: /\.svg$/,
          use: "file-loader",
        },
      ],
    },
    devServer: {
      static: {
        directory: "./dist",
      },
    },
    plugins: [
      new Dotenv(),
      new HtmlWebpackPlugin({
        title: "Beer display",
        templateContent: ({ htmlWebpackPlugin }) =>
          '<!DOCTYPE html><html><head><meta charset="utf-8"><title>' +
          htmlWebpackPlugin.options.title +
          "</title>" +
          '<meta name="viewport" content="width=device-width, initial-scale=1" />' +
          '<link rel="manifest" href="manifest/manifest.json" />' +
          '<link rel="preconnect" href="https://fonts.googleapis.com">' +
          '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>' +
          '<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;600&display=swap" rel="stylesheet">' +
          '<link href="https://fonts.googleapis.com/css2?family=Righteous&display=swap" rel="stylesheet">' +
          '<link rel="apple-touch-icon" sizes="180x180" href="images/apple-touch-icon.png">' +
          '<link rel="icon" type="image/png" sizes="16x16" href="images/favicon-16x16.png">' +
          '<link rel="icon" type="image/x-icon" href="images/favicon.ico">' +
          '<meta name="msapplication-TileColor" content="#c6426e">' +
          '<meta name="theme-color" content="#101018">' +
          '</head><body><div id="app"></div></body></html>',
        filename: "index.html",
      }),

      // new WebpackBundleAnalyzer(),
      ...(argv.mode === "production"
        ? [
            new WorkboxPlugin.GenerateSW({
              // these options encourage the ServiceWorkers to get in there fast
              // and not allow any straggling "old" SWs to hang around
              clientsClaim: true,
              skipWaiting: true,
            }),
            new CopyWebpackPlugin({
              patterns: [
                { from: "manifest", to: "manifest" },
                { from: "images", to: "images" },
              ],
            }),
          ]
        : []),
      // new CopyWebpackPlugin([
      //   { from: 'src/assets', to: 'images' },
      //   { from: 'manifest', to: 'manifest' },
      // ]),
    ],
    resolve: {
      extensions: [".tsx", ".ts", ".js", ".mjs"],
      alias: {
        "react-dom": "@hot-loader/react-dom",
      },
    },
    optimization: {
      runtimeChunk: "single",
      splitChunks: {
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: "vendors",
            chunks: "all",
          },
        },
      },
    },
  }
}

module.exports = (env, argv) => {
  const conf = config(env, argv)
  if (argv.hot) {
    // Cannot use 'contenthash' when hot reloading is enabled.
    conf.output.filename = "[name].[hash].js"
  }

  return conf
}
