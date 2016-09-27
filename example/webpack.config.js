var path = require('path');
var webpack = require('webpack');

var APP_KEY = process.env.ALLIHOOPA_APP_KEY;
var APP_SECRET = process.env.ALLIHOOPA_APP_SECRET;

if (!APP_KEY || !APP_SECRET) {
    throw new Error('Please set the ALLIHOOPA_APP_KEY and ALLIHOOPA_APP_SECRET environment variables before building this example');
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
            ALLIHOOPA_APP_KEY: JSON.stringify(APP_KEY),
            ALLIHOOPA_APP_SECRET: JSON.stringify(APP_SECRET),
        }),
    ],
};
