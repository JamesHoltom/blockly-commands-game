const path = require('path');
const ExtractCssChunksWebpackPlugin = require("extract-css-chunks-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  devtool: "inline-source-map",
  devServer: {
    static: path.resolve(__dirname, "build"),
    compress: true,
    port: 9000,
  },
  entry: path.resolve(__dirname, "source/import.js"),
  mode: "development",
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [ {
          loader: ExtractCssChunksWebpackPlugin.loader,
          options: {
            publicPath: path.resolve(__dirname, "build")
          }
        }, "css-loader" ],
        include: path.resolve(__dirname, "source")
      }
    ],
  },
  output: {
    clean: true,
    filename: "main.js",
    path: path.resolve(__dirname, "build")
  },
  plugins: [
    new ExtractCssChunksWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "source/template.html")
    }),
    new CopyWebpackPlugin({
      patterns: [
        // Copy the Bootstrap minified files to the build directory.
        {
          from: path.resolve(__dirname, 'node_modules/bootstrap/dist/{css,js}/bootstrap.min.*'),
          to: path.resolve(__dirname, 'build/[name][ext]'),
          toType: "template",
        },
        // Copy the JS interpreter to the build directory.
        {
          from: path.resolve(__dirname, "node_modules/js-interpreter/lib/js-interpreter.min.js"),
          to: path.resolve(__dirname, "build"),
          toType: "dir"
        },
        // Copy the "Built on Blockly" logo to the build directory.
        {
          from: path.resolve(__dirname, 'assets/'),
          to: path.resolve(__dirname, 'build/assets'),
          toType: 'dir'
        }
      ]
    })
  ],
  resolve: {
    extensions: [ ".js", ".css" ],
    modules: [ "node_modules", path.resolve(__dirname, "node_modules") ],
    symlinks: false
  }
};