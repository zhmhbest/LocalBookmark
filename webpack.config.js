const path = require('path');
const root = path.resolve(__dirname);
const isProd = 'production' === process.env['NODE_ENV'] ? true : false;
const isDev = !isProd;
const devPort = 9000;

const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

// 引入CDN资源
const [cdnExternals, cdnResources] = (() => {
    let externals = {};
    let resources = {};
    let buffer = [];
    for (let item of require('./cdn')) {
        if (undefined !== item.js) {
            externals[item.moduleName] = item.globalName;
            buffer.push(`<script src="${item.js}"></script>`);
        }
        if (undefined !== item.css) {
            buffer.push(`<link href="${item.css}" rel="stylesheet">`);
        }
    }
    console.log();
    // <%= cdnResources %>
    resources['cdnResources'] = buffer.join('\n');
    console.log(externals);
    return [externals, resources];
})();


module.exports = {
    mode: isProd ? 'production' : 'development',
    entry: {
        index: './src/index.ts'
    },
    output: {
        path: path.resolve(root, 'dist'),
        filename: isProd ?
            'static/js/[name].js' : 'static/js/[name]-[hash].js'
    },
    devServer: {
        port: devPort,
        progress: true,
        contentBase: false, //已经拷贝
        compress: true
    },
    externals: {
        ...cdnExternals
    }, // CDN配置
    plugins: [
        new CopyWebpackPlugin({
            patterns: [{
                from: 'src/assets',
                to: '.',
                globOptions: {
                    ignore: ["**/README.md"] // 不拷贝README
                }
            },]
        }),
        new HtmlWebpackPlugin({
            template: 'src/index.ejs', // 模板HTML文件路径
            filename: 'index.html', // 打包后HTML文件名称
            templateParameters: {
                ...cdnResources
            }, // 模板参数
            minify: { // 优化操作
                removeAttributeQuotes: isProd, // 删除多余的双引号
                collapseWhitespace: isProd, // 删除换行
                hash: isDev
            }
        }),
        new OpenBrowserPlugin({
            url: `http://localhost:${devPort}/`
        }),
        new MiniCssExtractPlugin({
            filename: isProd ?
                'static/style/[name].css' : 'static/style/[name]-[hash].css'
        }),
        new VueLoaderPlugin()
    ],
    resolve: {
        extensions: ['.ts', '.js', '.vue'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
        }
    },
    module: {
        rules: [{
            test: /\.json5$/,
            loader: 'json5-loader'
        },
        {
            test: /\.ts$/,
            exclude: /node_modules/,
            use: [{
                loader: 'ts-loader',
                options: {
                    appendTsSuffixTo: [/\.vue$/]
                }
            }]
        },
        {
            test: /\.(png|jpe?g|gif|icon?)$/i,
            use: [{
                loader: 'url-loader',
                options: {
                    limit: 1024 * 8, // 小于8KB则返回base64字符串
                    name: isProd ?
                        'static/images/[name].[ext]' : 'static/images/[name]-[hash].[ext]'
                }
            }]
        },
        {
            test: /\.(sa|sc|c)ss$/i,
            use: [
                MiniCssExtractPlugin.loader,
                'css-loader',
                'sass-loader'
            ]
        },
        {
            test: /\.vue$/i,
            loader: 'vue-loader'
        }
        ]
    },
    optimization: {
        // https://www.webpackjs.com/plugins/split-chunks-plugin/
        splitChunks: {
            chunks: 'all', // 从何处抽取代码: initial | async | all
            // minSize: 30000,
            // maxSize: 0,
            // minChunks: 1, // 最低被引用次数
            // maxAsyncRequests: 5, // 最大的异步加载次数
            // maxInitialRequests: 3, // 最大的初始化加载次数
            // automaticNameDelimiter: '~', // 默认文件名分隔符
            // name: true, // 抽取后的js文件名，true表示根据cacheGroups自动生成
            cacheGroups: {
                Echarts: {
                    name: 'chunk-echarts',
                    test: /[\\/]node_modules[\\/]echarts[\\/]/,
                    priority: 120
                },
                Vue: {
                    name: 'chunk-vue',
                    test: /[\\/]node_modules[\\/](@?vuex?|vue-.*?)[\\/]/,
                    priority: 110
                },
                AntDesign: {
                    name: 'chunk-antd',
                    test: /[\\/]node_modules[\\/](@ant-design|ant-design-vue)[\\/]/,
                    priority: 100
                },
                Modules: {
                    name: 'chunk-modules',
                    test: /[\\/]node_modules[\\/]/,
                    priority: 2
                },
                default: {
                    name: 'chunk-default',
                    minChunks: 2,
                    priority: 1,
                    reuseExistingChunk: true
                }
            }
        }
    }
};