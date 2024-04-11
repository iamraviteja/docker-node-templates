const path = require("path");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");

module.exports = {
  entry: "./src/client/index.tsx",
  target: "web",
  output: {
    path: path.resolve("build/assets"),
    filename: "index.js",
  },
  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,
        loader: "esbuild-loader",
        options: {
          target: "es2015",
        },
      },
      {
        test: /\.css$/i,
        include: path.resolve(__dirname, "src"),
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
    ],
  },
  resolve: {
    plugins: [
      new TsconfigPathsPlugin({
        /* options: see below */
      }),
    ],
    extensions: [".tsx", ".ts", ".js", ".css", ".svg", ".png"],
    fallback: {
      fs: require.resolve("browserify-fs"), // or 'empty' if you prefer an empty module
      crypto: require.resolve("crypto-browserify"),
      stream: require.resolve("stream-browserify"),
      vm: require.resolve("vm-browserify"),
      buffer: require.resolve("buffer"),
      path: require.resolve("path-browserify"),
      util: require.resolve("util"),
    },
  },
};
