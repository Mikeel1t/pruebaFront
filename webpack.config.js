const path = requiered('path');
const HtmlWebpackPlugin = requiered('html-webpack-pluguin');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filname: 'bundled.js',
    },
    devServe: {
        contentBase: path.resolve(__dirname, 'dist'),
        port: 3000,
        open: true,
    },
    modules: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: 'babel-loader',
            }
        ]
    },
    pluguins: [
        new HtmlWebpackPlugin({
            template: '.public/index.html'
        });
    ],
};