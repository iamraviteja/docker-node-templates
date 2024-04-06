const path = require('path');
const nodeExternals = require('webpack-node-externals');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
    entry: './src/server/index.tsx',
    target: 'node',
    externals: [nodeExternals()],
    output: {
        path: path.resolve('build'),
        filename: 'index.js',
    },
    module: {
        rules: [
            {
                test: /\.[jt]sx?$/,
                loader: 'esbuild-loader',
                options: {
                    target: 'es2015'
                }
            }
        ]
    },
    resolve: {
        plugins: [new TsconfigPathsPlugin({/* options: see below */})],
        extensions: [ '.tsx', '.ts', '.js', '.css', '.svg', '.png' ],
    },
}