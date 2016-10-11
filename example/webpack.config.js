var path = require('path');
var webpack = require('webpack');

var APP_IDENTIFIER = process.env.ALLIHOOPA_APP_IDENTIFIER;
var API_KEY = process.env.ALLIHOOPA_API_KEY;

if (!APP_IDENTIFIER || !API_KEY) {
    throw new Error('Please set the ALLIHOOPA_APP_IDENTIFIER and ALLIHOOPA_API_KEY environment variables before building this example');
}

module.exports = {
    entry: './src/index.ts',

    output: {
        path: path.join(__dirname, '/dist'),
        filename: 'example.js',
        umdNamedDefine: true,
        publicPath: '/build/',
    },
    module: {
        preLoaders: [
            { test: /\.tsx?$/, loader: 'tslint', exclude: /node_modules/, },
        ],
        loaders: [
            { test: /\.tsx?$/, loader: 'ts', exclude: /node_modules/, },
        ],
    },
    resolve: {
        root: path.resolve('./src'),
        extensions: [ '', '.js', '.ts'],
    },
    tslint: {
        emitErrors: true,
        failOnHint: true,
    },
    plugins: [
        new webpack.DefinePlugin({
            ALLIHOOPA_APP_IDENTIFIER: JSON.stringify(APP_IDENTIFIER),
            ALLIHOOPA_API_KEY: JSON.stringify(API_KEY),
        }),
    ],
};
