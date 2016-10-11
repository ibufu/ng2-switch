/**
 * Created by lcx on 2016/7/12.
 */
var path = require('path');
module.exports = {
    entry: {
        main: './demo/main.ts'
    },
    output: {
        path: './dist',
        filename: '[name].build.js'
    },
    resolve: {
        extensions: ['.js', '.ts', '']
    },
    module: {
        loaders: [
            {
                test: /\.ts$/,
                loader: 'awesome-typescript-loader',
            }
        ]
    }
};