var webpack = require("webpack")
var ExtractTextPlugin = require("extract-text-webpack-plugin")
var LodashModuleReplacementPlugin = require("lodash-webpack-plugin")
var webpackPostcssTools = require("webpack-postcss-tools")
var HtmlWebpackPlugin = require("html-webpack-plugin")
var CopyWebpackPlugin = require("copy-webpack-plugin")

var production = process.argv.indexOf("--production") > -1
var utestMode = process.argv.indexOf("--test") > -1
var config = require("./project.config.js")

var variablesMap = webpackPostcssTools.makeVarMap(config.src+"/css/variables.global.css");

var entry = {
    landing: config.src+"/index.js",
    vendor: ["react", "react-dom","redux","react-redux", "react-responsive","react-router","react-router-redux","react-intl"],
}
var filename = "[name].[hash].bundle.js"
if(utestMode){
    entry = {test:config.test}
    filename= "test.bundle.js"
}

module.exports = {
    context: __dirname,
    entry,
    output: {
        path: config.dist,
        filename: filename,
        publicPath: "/",
    },
    devServer: {
        historyApiFallback: true,
        outputPath: config.dist
    },
    resolve: {
        modulesDirectories: [config.src, "node_modules"],
        extensions: [
            "",
            ".js",
        ],
    },
    module: {
        noParse: [/(.*)\/__tests__/],
        preLoaders: [
           { test: /\.(css)$/, loader: "stylelint-loader" }
        ],
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                include: config.src,
                loader: "babel-loader",
                query: {
                    plugins: ["lodash"]
                }
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                include: config.src,
                loader: "eslint-loader"
            },
            {
                test: /\.json$/,
                loader: "json-loader",
                include: config.src,
            },
            {
                test: /\.(ico|jpe?g|png|gif|svg)$/,
                loader: "file-loader",
                query: {
                    name: "[path][name].[ext]",
                    context:config.src,
                },
                include: config.src,
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract(
                  "style-loader",
                  "css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader"
                 ),
                include: config.src,
                exclude: /node_modules/
            },
        ]
    },
    plugins: (
    [
        new ExtractTextPlugin("css/landing.[contenthash].css"),
        new webpack.DefinePlugin({
            __PROD__: production
        }),
        new webpack.ProvidePlugin({
            Promise: "exports-loader?self.Promise!es6-promise", // Thanks Aaron (https://gist.github.com/Couto/b29676dd1ab8714a818f#gistcomment-1584602)
            fetch: "exports-loader?self.fetch!whatwg-fetch"
        }),
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: "index.html",
            excludeChunks: ["tests"]
        }),
        new LodashModuleReplacementPlugin({
            collections: true,
            chaining: true
        }),
        new CopyWebpackPlugin([{ from: "src/assets/public", to: "assets/public" }], {
            ignore: [
            ],
            copyUnmodified: true
        })
    ]
    .concat(
      production ? [
          new webpack.DefinePlugin({
              __PROD__: production,
              "process.env.NODE_ENV": JSON.stringify("production")
          }),
          new webpack.optimize.CommonsChunkPlugin(
              "vendor",/* chunkName */
              "vendor.[hash].bundle.js"/* filename */
          ),
          new webpack.optimize.DedupePlugin(),
          new webpack.optimize.AggressiveMergingPlugin(),
          new webpack.optimize.UglifyJsPlugin({
              compress: {
                  warnings: false,
              },
              output: {
                  comments: false
              }
          }),
      ] : []
    )
  ),
    postcss: [
        webpackPostcssTools.prependTildesToImports,
        require("autoprefixer"),
        require("postcss-custom-properties")({
            variables: variablesMap.vars
        }),
        require("postcss-custom-media")({
            extensions: variablesMap.media
        }),
        require("postcss-calc"),
        require("postcss-clearfix")
    ],
}
