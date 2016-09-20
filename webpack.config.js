var webpack = require('webpack');
var path = require('path');
var yargs = require('yargs');
var failPlugin = require('webpack-fail-plugin');

var outputFilename = 'allihoopa.js';
var plugins = [
    failPlugin,
];

if (yargs.argv.production) {
    outputFilename = 'allihoopa.min.js';
    plugins.push(new webpack.optimize.UglifyJsPlugin({
        minimize: true,
        compress: {
            warnings: false,
            dead_code: true,
        },
    }));
}

module.exports = {
    entry: './src/index.ts',
    output: {
        path: path.join(__dirname, '/dist'),
        filename: outputFilename,
        library: 'allihoopa',
        libraryTarget: 'umd',
        umdNamedDefine: true,
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
        extensions: [ '', '.js', '.ts', ],
    },
    plugins: plugins,
    tslint: {
        emitErrors: true,
        failOnHint: true,
    },
};
