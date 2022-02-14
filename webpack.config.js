const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");

module.exports = {
  mode: "development", // "production" | "development" | "none"
  // Chosen mode tells webpack to use its built-in optimizations accordingly.
  entry: path.resolve(__dirname, "src", "index.tsx"), // string | object | array
  // defaults to ./src
  // Here the application starts executing
  // and webpack starts bundling
  output: {
    // options related to how webpack emits results
    path: path.resolve(__dirname, "dist"), // string (default)
    // the target directory for all output files
    // must be an absolute path (use the Node.js path module)
    filename: "sign.bundle.js", // string (default)
    // the filename template for entry chunks
  },
  devServer: {
    static: {
      directory: path.join(__dirname, "dist"),
    },
    compress: true,
    port: 9000,
    hot: true,
    open: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "public", "index.html"),
      favicon: "./public/favicon.ico",
      filename: "index.html",
      manifest: "./public/manifest.json",
    }),
    new webpack.ProvidePlugin({
      Buffer: ["buffer", "Buffer"],
    }),
    new webpack.ProvidePlugin({
      process: 'process/browser',
    }),
  ],
  resolve: {
    // Add `.ts` and `.tsx` as a resolvable extension.
    extensions: [".ts", ".tsx", ".js"],
    fallback: {
      "stream": require.resolve("stream-browserify"),
      "buffer": require.resolve("buffer/"),
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        enforce: "pre",
        use: [
          {
            loader: "source-map-loader",
            options: {
              filterSourceMappingUrl: (url, resourcePath) => {
                if (/.*\/node_modules\/.*/.test(resourcePath)) {
                  return false;
                }
                return true;
              },
            },
          },
        ],
      },
      {
        loader: "babel-loader",
        test: /\.js$|jsx/,
        exclude: /node_modules/,
      },
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
};
