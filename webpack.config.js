const path = require('path')

module.exports = {
    mode: 'development',
    entry: './frontend/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'public', 'js')
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/env']
                    }
                }
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    },
    devtool: 'source-map'
}