const path = require("path");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const env = process.env.NODE_ENV;
const liveServer = require("live-server");

if (env == "development") {
   liveServer.start({
      root: "./public",
   });
}
module.exports = {
   watch: env === "development" ? true : false,
   entry: "./src/index.tsx",
   module: {
      rules: [
         {
            test: /\.tsx?$/,
            use: "ts-loader",
            exclude: "/node_modules",
         },
         {
            test: /\.css$/i,
            use: [
               "style-loader",
               {
                  loader: "css-loader",
                  options: {
                     modules: true,
                  },
               },
            ],
         },
      ],
   },
   resolve: {
      extensions: [".tsx", ".ts", ".js"],
      plugins: [new TsconfigPathsPlugin({})],
   },
   output: {
      path: path.resolve(__dirname, "public"),
      filename: "bundle.js",
   },
};
