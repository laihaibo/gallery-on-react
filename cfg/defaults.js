/**
 * Function that returns default values.
 * Used because Object.assign does a shallow instead of a deep copy.
 * Using [].push will add to the base array, so a require will alter
 * the base array output.
 */
'use strict';

const path = require('path');
const srcPath = path.join(__dirname, '/../src');
const dfltPort = 8000;

/**
 * Get the default modules object for webpack
 * @return {Object}
 */
function getDefaultModules() {
    return {
        preLoaders: [{
            test: /\.(js|jsx)$/,
            include: srcPath,
            loader: 'eslint-loader'
        }],
        loaders: [{
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            }, {
                test: /\.sass/,
                loader: 'style-loader!css-loader!sass-loader?outputStyle=expanded&indentedSyntax'
            }, {
                test: /\.scss/,
                loader: 'style-loader!css-loader!autoprefixer-loader?browsers=last 2 versions!sass-loader?outputStyle=expanded' //为scss添加autoprefixer支持
            }, {
                test: /\.less/,
                loader: 'style-loader!css-loader!less-loader'
            }, {
                test: /\.styl/,
                loader: 'style-loader!css-loader!stylus-loader'
            }, {
                test: /\.(png|jpg|gif|woff|woff2|eot|ttf|svg)$/, //添加了iconfont的支持
                loader: 'url-loader?limit=8192'
            }, {
                test: /\.(mp4|ogg|svg)$/,
                loader: 'file-loader'
            }
            // 新版json-load无须这样加载，只需要要修改main.js
            // {
            //  test: /\.json$/,
            //  loader:'json-loader'
            // }
        ]
    };
}

module.exports = {
    srcPath: srcPath,
    publicPath: '/assets/', //防止打包后，读取图片资源失败，由绝对路径改为相对路径
    port: dfltPort,
    getDefaultModules: getDefaultModules
};