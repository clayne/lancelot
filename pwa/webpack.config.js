const path = require("path");
const process = require("process");
const webpack = require("webpack");

const isDevelopment = process.env.NODE_ENV !== "production";

module.exports = {
    mode: isDevelopment ? "development" : "production",
    entry: {
        lancelot: "./src/app/lancelot/index.tsx",
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                loader: "ts-loader",
            },
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.bin$/,
                exclude: /node_modules/,
                type: "asset/inline",
                generator: {
                    dataUrl: (content) => {
                        return content;
                    },
                },
            },
        ],
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js", ".yaml"],
        fallback: {
            console: require.resolve("console-browserify"),
        },
    },
    plugins: [
        new webpack.EnvironmentPlugin({
            NODE_DEBUG: false,
        }),
    ],
    output: {
        filename: "[name].bundle.js",
        path: path.resolve(__dirname, "public", "js"),
        publicPath: "/js",
    },
    devtool: "source-map",
    optimization: {
        // will not emit the bundle in prod mode if *any* error is encountered.
        emitOnErrors: false,
    },
    devServer: {
        port: 8080,
        hot: true,
        liveReload: true,
        static: true,
        devMiddleware: {
            index: true,
        },
    },
};
