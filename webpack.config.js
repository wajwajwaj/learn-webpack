const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin')
const toml = require('toml')
const yaml = require('yaml')
const json5 = require('json5')
module.exports = {
    entry: './src/index.js', // 设置入口文件
    output: {
        filename: 'bunble.js',
        path: path.resolve(__dirname, './dist'),
        clean: true, //打包前删除上次打包的文件
        assetModuleFilename: 'image/[contenthash][ext]', //与下方的generator效果一致，但是generator优先级高
    }, // 设置出口文件，必须是绝对路径
    mode: 'development', //模式
    devtool: 'inline-source-map', //代码调试 显示正确位置
    devServer: {
        static: './dist', //指向物理路径
    },
    plugins: [
        // 自动生成html文件和引入js打包文件
        new HtmlWebpackPlugin({
            template: './src/index.html', //基于模板
            filename: 'app.html', //生成文件名称
            inject: 'body' //引入打包文件的位置
        }),
        // 抽离css文件，使用link形式引入 原来使用style-loader将css放在head标签中，此插件无需再使用了，使用MiniCssExtractPlugin.loader
        new MiniCssExtractPlugin({
            filename:'style/[contenthash].css'  // 自定义路径和文件名
        })
    ],
    module: {
        rules: [
            {
                test: /\.png$/, //匹配.png为结尾的文件
                type: 'asset/resource',
                generator: {
                    filename: 'image/[contenthash][ext]' //自动创建文件名，保留原来的文件格式
                }
            },
            {
                test: /\.svg$/,
                type: 'asset/inline'
            },
            {
                test: /\.txt$/,
                type: 'asset/source'
            },
            {
                test: /\.jpg$/,
                type: 'asset', //通用类型，默认文件小于8K导出dataUrl，大于发送一个文件
                parser: {
                    dataUrlCondition: {
                        maxSize: 4 * 1024 * 1024, //此为4M
                    }, 
                }
            },
            {
                test: /\.css|.less$/,
                // link形式使用iniCssExtractPlugin.loader，样式放在head标签中使用style-loader
                use: [MiniCssExtractPlugin.loader,'css-loader','less-loader'] //逆序加载，style-loader放在最前面
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                type: 'asset/resource'
            },
            {
                test: /\.(csv|tsv)$/,
                use: 'csv-loader'
            },
            {
                test: /\.xml$/,
                use: 'xml-loader'
            },
            {
                test: /\.toml$/,
                type: 'json',
                parser:{
                    parse: toml.parse
                }
            },
            {
                test: /\.yaml$/,
                type: 'json',
                parser:{
                    parse: yaml.parse
                }
            },
            {
                test: /\.json5$/,
                type: 'json',
                parser:{
                    parse: json5.parse
                }
            },
        ]
    },
    // 优化配置
    optimization:{
        minimizer:[
            new CssMinimizerWebpackPlugin() // 压缩css，mode使用production
        ]
    }
}