const path = require('path');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = (env, argv) => {
    const isDevMode = argv.mode !== 'production';

    return {
        mode: isDevMode ? 'development' : 'production',
        entry: './src/server.ts',
        output: {
            filename: isDevMode ? 'bundle.js' : '[name].[contenthash].js',
            path: path.resolve(__dirname, 'app/dist'),
            publicPath: '/'
        },
        devtool: isDevMode ? 'inline-source-map' : false,
        resolve: {
            extensions: ['.ts', '.tsx', '.js'],
            fallback: {
                http: require.resolve('stream-http'),
                "zlib": require.resolve("browserify-zlib"),
                "querystring": require.resolve("querystring-es3"),
                "crypto": require.resolve("crypto-browserify"),
                "stream": require.resolve("stream-browserify"),
                assert: require.resolve('assert'),
                os: require.resolve('os-browserify/browser'),
                net: require.resolve('net'),
                url: require.resolve('url'),
                "fs": false,
                assert: false
            }
        },
        module: {
            rules: [{
                    test: /\.(ts|tsx)$/,
                    exclude: /node_modules/,
                    use: [{
                            loader: 'babel-loader',
                            options: {
                                presets: [
                                    '@babel/preset-env',
                                    '@babel/preset-react'
                                ],
                                plugins: [
                                    '@babel/plugin-proposal-class-properties',
                                    '@babel/plugin-transform-runtime'
                                ]
                            }
                        },
                        {
                            loader: 'ts-loader',
                            options: {
                                transpileOnly: true
                            }
                        }
                    ]
                },
                {
                    test: /\.css$/,
                    use: [
                        'style-loader',
                        'css-loader'
                    ]
                },
                {
                    test: /\.(png|svg|jpg|jpeg|gif)$/,
                    use: [
                        'file-loader'
                    ]
                }
            ]
        },
        plugins: [
            new CleanWebpackPlugin(),
            // new HtmlWebpackPlugin({
            //     template: './src/index.html'
            // }),
            new ForkTsCheckerWebpackPlugin({
                async: isDevMode
            })
        ],
        devServer: {
            contentBase: path.join(__dirname, 'dist'),
            compress: true,
            port: 3000,
            open: true,
            proxy: {
                '/api': 'http://localhost:8000',
                '/ws': {
                    target: 'http://localhost:8000',
                    ws: true
                }
            }
        }
    };
};