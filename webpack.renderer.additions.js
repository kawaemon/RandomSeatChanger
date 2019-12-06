const path = require("path");

module.exports = {
    optimization: {
        splitChunks: {
            name: "vendor",
            chunks: "initial",
        }
    },
    resolve: {
        alias: {
            "@static": path.resolve(__dirname, "static")
        }
    }
}