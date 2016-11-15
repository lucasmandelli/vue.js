var webpack = require('webpack');

var ExtractTextPlugin = require('extract-text-webpack-plugin');
var extractCSS = new ExtractTextPlugin('css/app.css');

module.exports = {
    devtool: 'source-map',
    entry: './src/js/main.js', // nome do arquivo principal
    output: {
        path: __dirname + '/dist', // diretório onde ficam os arquivos empacotados
        filename: 'app.bundle.js', // nome do arquivo final
        publicPath: '/dist/' // diretório principal dos arquivos empacotados
    },
    plugins: [
        new webpack.ProvidePlugin({
            'window.$': 'jquery',
            'window.jQuery': 'jquery'
        }),
        extractCSS,
        new webpack.HotModuleReplacementPlugin()
    ],
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel'
            },
            {
                test: /\.(woff|woff2|ttf|svg|eot)$/,
                loader: 'url?limit=100000'
            },
            {
                test: /\.scss$/,
                loader: extractCSS.extract(['css','sass'])
            },
            {
                test: /\.vue$/,
                loader: 'vue',
            }
        ]
    },
    devServer: {
        host: '0.0.0.0',
        inline: true,
        watchOptions: {
            poll: true,
            aggregateTimeout: 300
        }
    }
};