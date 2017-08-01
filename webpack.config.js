const path = require('path');
const webpack = require('webpack');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const DashboardPlugin = require('webpack-dashboard/plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const NyanProgressPlugin = require('nyan-progress-webpack-plugin');

const {homepage: URL} = require('./package.json');
const DEV = process.env.NODE_ENV !== 'production' ? true : false;
const ifEnv = {
    prod(fn){ return !DEV ? fn : ()=>{}; },
    dev(fn){ return DEV ? fn : ()=>{}; }
};

module.exports = {
    context: __dirname,
    entry: {
        main: './src/js/main.js'
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        publicPath: '/site/templates/dist/',
        filename: 'js/[name].bundle.js'
    },

    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        }
    },

    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },

            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },

            {
                test: /\.(css)$/,
                use: ['css-hot-loader'].concat(ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            query: {
                                sourceMap: true,
                                importLoaders: 1,
                                minimize: !DEV
                            }
                        },
                        {
                            loader : 'postcss-loader',
                            options: {
                                parser: require('postcss-scss'),
                                sourceMap: true,
                                plugins: (loader)=> [
                                    require('precss'),
                                    require('lost'),
                                    require('postcss-functions')({
                                        functions: {
                                            em: (val)=> (val / 16 * 1) + 'em',
                                            rem: (val)=> (val / 16 * 1) + 'rem'
                                    }}),
                                    require('autoprefixer')(),
                                ]
                            }
                        }
                    ]
                }))
            }
        ]
    },

    plugins: [
        new FriendlyErrorsWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: './includes/structure/css.inc.ejs',
            filename: '../includes/structure/css.inc.php',
            inject: false,
            hash: true
        }),
        new HtmlWebpackPlugin({
            template: './includes/structure/js.inc.ejs',
            filename: '../includes/structure/js.inc.php',
            inject: false,
            hash: true
        }),
        ifEnv.dev(new webpack.NamedModulesPlugin()),
        ifEnv.dev(new DashboardPlugin()),
        ifEnv.dev(new BrowserSyncPlugin({
            files: ['**/*.php', '**/*.ejs'],
            notify: false,
            host: 'localhost',
            port: 3000,
            proxy: 'http://localhost:8081/',
            open: false
        }, {reload: false}
        )),
        new ExtractTextPlugin({
            filename: 'css/[name].bundle.css',
            allChunks: true,
            disable: DEV
        }),
        ifEnv.prod(new NyanProgressPlugin()),
        ifEnv.prod(new webpack.DefinePlugin({
            'process.env': {NODE_ENV: '"production"'}
        })),
        ifEnv.prod(new webpack.optimize.UglifyJsPlugin())
    ],

    devtool: DEV ? 'eval-source-map' : '',

    devServer: {
        stats: 'minimal',
        contentBase: path.resolve(__dirname, '../../'),
        proxy: {
            "/**/": {
                target: URL
            }
        }
    }
}
