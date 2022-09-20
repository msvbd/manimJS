const path = require("path");

module.exports = {
  mode: "development",
  entry: "./ts/app.ts",
  watch: true,
  output: {
    filename: "app.js",
    path: path.resolve(__dirname, "js")
  },
  devtool: "inline-source-map",
  module: {
    rules: [
      { test: /(\.d)?\.(ts)x?$/, use: 'ts-loader', exclude: /node_modules/ },
      { test: /\.css$/, use: ['style-loader', 'css-loader'] },
    ],
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".d.ts"],
  },
};
