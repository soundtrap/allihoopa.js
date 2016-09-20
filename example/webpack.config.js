var path = require('path');

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
        extensions: [ '', '.js', '.ts', ],
    },
    tslint: {
        emitErrors: true,
        failOnHint: true,
    },
};
