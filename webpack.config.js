const path = require('path');

module.exports = {
    entry: "./src/board.js",
    mode: "production",
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, "dist"),
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
        ],
    },
    devServer: {
        static: "./dist",
    },
};
