const webpack = require("webpack")
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const path = require("path")

module.exports = {
    entry: path.join(__dirname, "./src/app.jsx"),
    output: {
        path: path.join(__dirname, "./public/dist/"),
        filename: "app.js"
    },
    module: {
        rules: [
            {
                test: /\.js(x)?$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["env"]
                    }
                }
            }
        ]
    },
    plugins: [
        // new UglifyJSPlugin()
    ],
    devtool: "cheap-module-eval-source-map",
    devServer: {
        contentBase: path.join(__dirname, "/public"),
        historyApiFallback: true,
        // hot: true,
        // hotOnly: true,
        watchOptions: {
            poll: true
        },
        watchContentBase: true,
        open: true,
        publicPath: "/dist/"
    }
}