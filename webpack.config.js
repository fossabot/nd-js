const path = require("path");
const nodeExternals = require("webpack-node-externals");

const TerserPlugin = require("terser-webpack-plugin");
const DashboardPlugin = require("webpack-dashboard/plugin");

const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

module.exports = {
  mode: "development", // production
  entry: "./src/nd.ts",
  devtool: "inline-source-map",
  module: {
    rules: [
      {
        test: /\.(html|mustache)$/,
        use: {
          loader: "html-loader"
        }
      },
      {
        test: /\.css$/,
        use: ["to-string-loader", "css-loader"]
      },
      {
        test: /\.ts?$/,
        enforce: "pre",
        use: [
          {
            loader: "tslint-loader",
            options: {
              typeCheck: false,
              fix: true
            }
          }
        ],
        exclude: /node_modules/
      },
      {
        test: /\.ts?$/,
        use: [
          {
            loader: "ts-loader",
            options: {
              /* Loader options go here */
            }
          }
        ],
        exclude: /node_modules/
      }
    ]
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        parallel: true,
        terserOptions: {
          compress: {
            ecma: 6,
            keep_fargs: false,
            module: true,
            toplevel: true,
            warnings: true,
            unsafe_methods: true,
            unsafe_undefined: true
          },
          output: {
            beautify: false,
            comments: false
            // output options
          },
          warnings: false,
          mangle: {
            module: true,
            toplevel: true,
            properties: {
              regex: /_$/
            }
          },
          toplevel: true,
          module: true,
          ie8: false,
          keep_classnames: false,
          keep_fnames: false,
          safari10: false
        }
      })
    ]
  },
  resolve: {
    extensions: [".html", ".ts", ".js"]
  },
  plugins: [
    new DashboardPlugin(),
    new BundleAnalyzerPlugin({
      analyzerMode: "static",
      reportFilename: "webpack/report.html",
      generateStatsFile: true,
      statsFilename: "webpack/stat.json",
      openAnalyzer: false
    })
  ],
  output: {
    filename: "nd.min.js",
    path: path.resolve(__dirname, ".caches")
  },
  target: "node",
  externals: [nodeExternals()]
};
