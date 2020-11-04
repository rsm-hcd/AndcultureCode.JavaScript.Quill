const path = require("path");

module.exports = {
    entry: path.resolve(__dirname, "src/index.ts"),
    mode: "production",
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: "ts-loader",
                exclude: /node_modules/,
            },
        ],
    },
    externals: {
        quill: "quill",
    },
    output: {
        path: path.resolve(__dirname, "dist-global"),
        filename: "index.js",
        library: "AndcultureCodeQuill",
        libraryTarget: "umd",
    },
    resolve: {
        extensions: [".ts", ".js"],
    },
};
