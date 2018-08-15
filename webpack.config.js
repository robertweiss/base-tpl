const path = require('path');
const webpack = require('webpack');
const DashboardPlugin = require('webpack-dashboard/plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const IP = require('ip');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");
const NyanProgressPlugin = require('nyan-progress-webpack-plugin');

const {
    homepage: URL
} = require('./package.json');
const myIP = IP.address();
const DEV = process.env.NODE_ENV !== 'production' ? true : false;
const ifEnv = {
    prod(fn) {
        return !DEV ? fn : () => {};
    },
    dev(fn) {
        return DEV ? fn : () => {};
    },
};

module.exports = {
    mode: DEV ? 'development' : 'production',
    context: __dirname,
    entry: {
        main: './src/js/main.js',
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        publicPath: '/site/templates/dist/',
        filename: 'js/[name].bundle.js',
    },

    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            vue$: 'vue/dist/vue.esm.js'
        },
    },

    module: {
        rules: [{
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
            },

            {
                test: /\.vue$/,
                loader: 'vue-loader',
            },

            {
                test: /\.(css)$/,
                use: [
                    DEV ? 'style-loader' : MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true,
                            importLoaders: 1,
                        },
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            parser: require('postcss-scss'),
                            sourceMap: true,
                            plugins: loader => [
                                require('precss'),
                                require('lost'),
                                require('postcss-functions')({
                                    functions: {
                                        em: val => val / 16 * 1 + 'em',
                                        rem: val =>
                                            val / 16 * 1 + 'rem',
                                    },
                                }),
                                require('postcss-calc')({
                                    mediaQueries: true,
                                }),
                                require('autoprefixer')(),
                                require('postcss-sass-color-functions'),
                                require('postcss-normalize')({
                                    forceImport: true,
                                }),
                            ],
                        },
                    },
                ]
            },
            {
                test: /\.(jpg|png|svg|gif)$/,
                loader: 'file-loader',
                options: {
                    name: 'img/[name].[ext]?[hash]',
                },
            },
            {
                test: /\.(ttf|woff|woff2)$/,
                loader: 'file-loader',
                options: {
                    name: 'fonts/[name].[ext]?[hash]',
                },
            },
        ]
    },

    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery',
            Vue: ['vue/dist/vue.esm.js', 'default'],
        }),
        new HtmlWebpackPlugin({
            template: './includes/structure/css.inc.ejs',
            filename: '../includes/structure/css.inc.php',
            inject: false,
            hash: true,
            environment: process.env.NODE_ENV,
        }),
        new HtmlWebpackPlugin({
            template: './includes/structure/js.inc.ejs',
            filename: '../includes/structure/js.inc.php',
            inject: false,
            hash: true,
        }),
        ifEnv.dev(new DashboardPlugin()),
        ifEnv.dev(
            new BrowserSyncPlugin({
                files: ['**/*.php', '**/*.ejs'],
                notify: false,
                host: 'localhost',
                port: 3000,
                proxy: `http://${myIP}:8080/`,
                open: false,
            }, {
                reload: false,
            })
        ),
        ifEnv.prod(
            new MiniCssExtractPlugin({
                filename: 'css/[name].bundle.css'
            })
        ),
        ifEnv.prod(new NyanProgressPlugin()),
        ifEnv.prod(
            new webpack.DefinePlugin({
                'process.env': {
                    NODE_ENV: '"production"',
                },
            })
        ),
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
                        removeAll: true,
                    },
                    calc: true,
                    discardEmpty: true,
                    reduceIdents: false
                },
            })
        ]
    },

    devtool: DEV ? 'eval-source-map' : 'hidden-source-map',

    devServer: {
        headers: {
            "Access-Control-Allow-Origin": "*"
        },
        contentBase: path.resolve(__dirname, '../../'),
        host: myIP,
        port: 8080,
        proxy: {
            "/**/*": {
                target: URL
            }
        },
        stats: 'none',
        overlay: {
            warnings: true,
            errors: true
        }
    }
}
