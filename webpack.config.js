module.exports = {
    entry: path.resolve(currentWorkingDirectory, "src/index.ts"),
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
