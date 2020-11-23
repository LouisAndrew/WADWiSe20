const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        mode: 'development',
        filename: 'bundle.js',
    },
    plugins: [new HtmlWebpackPlugin()],
}
