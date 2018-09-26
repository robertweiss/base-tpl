/* globals __dirname, process */
const path = require('path');
const webpack = require('webpack');
const DashboardPlugin = require('webpack-dashboard/plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const IP = require('ip');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const NyanProgressPlugin = require('nyan-progress-webpack-plugin');
const SizePlugin = require('size-plugin');
const PostCSSConfig = require('./postcss.config');

const {homepage: URL} = require('./package.json');

const myIP = IP.address();
const DEV = process.env.NODE_ENV !== 'production' ? true : false;
const ifEnv = {
    prod(fn) {
        return !DEV ? fn : () => {};
    },
    dev(fn) {
        return DEV ? fn : () => {};
    }
};

module.exports = {
    mode: DEV ? 'development' : 'production',
    context: __dirname,
    stats: {
        all: false,
        builtAt: true,
        colors: true,
        errors: true,
        errorDetails: true,
        hash: true
    },
    entry: {
        main: './src/js/main.js'
        // 'basic-page': './src/js/basic-page.js'
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        publicPath: '/site/templates/dist/',
        filename: 'js/[name].bundle.js'
    },

    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            vue$: 'vue/dist/vue.esm.js'
        }
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: (file) => /node_modules/.test(file) && !/\.vue\.js/.test(file),
                options: {
                    cacheDirectory: true
                }
            },

            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },

            {
                test: /\.(css)$/,
                use: [
                    DEV ? 'style-loader' : MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true,
                            importLoaders: 1
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: PostCSSConfig
                    }
                ]
            },
            {
                test: /\.(jpg|png|svg|gif)$/,
                loader: 'file-loader',
                options: {
                    name: 'img/[name].[ext]?[hash]'
                }
            },
            {
                test: /\.(woff|woff2)$/,
                loader: 'file-loader',
                options: {
                    name: 'fonts/[name].[ext]?[hash]'
                }
            }
        ]
    },

    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery',
            Vue: ['vue/dist/vue.esm.js', 'default']
        }),
        new HtmlWebpackPlugin({
            template: './partials/css.inc.ejs',
            filename: '../partials/css.inc.php',
            inject: false,
            hash: true,
            environment: process.env.NODE_ENV
        }),
        new HtmlWebpackPlugin({
            template: './partials/js.inc.ejs',
            filename: '../partials/js.inc.php',
            inject: false,
            hash: true,
            alwaysWriteToDisk: true
        }),
        new HtmlWebpackHarddiskPlugin(),
        new VueLoaderPlugin(),
        ifEnv.dev(new DashboardPlugin()),
        ifEnv.dev(
            new BrowserSyncPlugin(
                {
                    files: ['**/*.php', '**/*.ejs', '!partials/js.inc.php'],
                    notify: false,
                    host: 'localhost',
                    port: 3000,
                    proxy: `http://${myIP}:8080/`,
                    open: false
                },
                {
                    reload: false
                }
            )
        ),
        ifEnv.prod(
            new MiniCssExtractPlugin({
                filename: 'css/[name].bundle.css'
            })
        ),
        ifEnv.prod(new NyanProgressPlugin()),
        ifEnv.prod(new SizePlugin()),
        ifEnv.prod(
            new webpack.DefinePlugin({
                'process.env': {
                    NODE_ENV: '"production"'
                }
            })
        )
    ],
    optimization: {
        namedModules: true,
        minimizer: [
            new UglifyJSPlugin({
                sourceMap: true,
                cache: true,
                parallel: true
            }),
            new OptimizeCssAssetsPlugin({
                cssProcessorOptions: {
                    discardComments: {
                        removeAll: true
                    },
                    calc: true,
                    discardEmpty: true,
                    reduceIdents: false
                }
            })
        ]
    },

    devtool: DEV ? 'eval-source-map' : 'hidden-source-map',

    devServer: {
        headers: {
            'Access-Control-Allow-Origin': '*'
        },
        contentBase: path.resolve(__dirname, '../../'),
        host: myIP,
        port: 8080,
        proxy: {
            '/**/*': {
                target: URL
            }
        },
        stats: 'none',
        overlay: {
            warnings: true,
            errors: true
        }
    }
};
