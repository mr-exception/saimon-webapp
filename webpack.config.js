const path = require("path");
const webpack = require("webpack");

const src = path.resolve(__dirname, "./src");
const build = path.resolve(__dirname, "./public"); // output worker.js to public folder

const tsLoader = {
  loader: "ts-loader",
  options: { compilerOptions: { module: "esnext", noEmit: false } },
};

module.exports = {
  mode: "none",
  target: "webworker", //Importan! Use webworker target
  entry: "./src/Worker/worker.ts",
  output: {
    filename: "worker.js",
    path: build,
  },
  resolve: {
    modules: ["node_modules", src + "/Worker"],
    extensions: [".js", ".json", ".jsx", ".ts", ".tsx"],
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("development"),
    }),
  ],
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: [tsLoader],
      },
    ],
  },
  watch: true,
  watchOptions: {
    aggregateTimeout: 200,
    poll: 1000,
  },
};