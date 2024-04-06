const path = require('path');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
    entry: './src/client/index.tsx',
    target: 'web',
    output: {
        path: path.resolve('build/assets'),
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