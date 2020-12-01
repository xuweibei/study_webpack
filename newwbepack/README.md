webpack 版本更新所以接下来的操作也会是目前最新最可用的操作 更新于 2020/12/1
1、新建文件夹 newwebpack 执行 npm init -y 下载 package.json 文件
2、npm i -S react react-dom 安装 react 相关依赖
3、npm i -D
babel-loader
@babel/core
@babel/preset-env
@babel/preset-react
webpack
webpack-cli;
4、根目录下新建 webpack.config.js
module.exports = {
module:{
rules:[
{
test:/\.js?\$/,
exclude:/node_modules/,
use:[{
loader:'babel-loader';
options:{
babelrc:false,
presets:[
require.resolve('@babel/preset-react'),
[require.resolve('@babel/preset-env'),{modules:false}]
]
}
}]
}
]
}
}
5、根目录下创建 src 文件夹里面新建 index.js
import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(

<div>123</div>,
document.getElementById('root')
)
webpack.config.js中新增
module.exports = {
	entry:'./src/index.js'
}
6、根目录创建public里面新建index.html
7、npm i -D html-webpack-plugin
8、webpack.config.js新增
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
...,
plugins:[
new HtmlWebpackPlugin({
template:'public/index.html',
filename:'index.html'
})
]
}

9、npx webpack --mode development (看看是否能成功打包)
10、package.json 的 scripts 里新增 "build":"webpack --mode development"

安装 devServer

1、npm i -D webpack-dev-server
2、将 webpack-cli 的版本变为@3 的版本，不然会有兼容问题
3、webpack.config.js 配置
module.exports = {
...,
devServer:{
contentBase:path.join(\_\_dirname,'./src/'),
publicPath:'/',
host:'127.0.0.1',
port:3000
}
}
4、package.json scripts 配置
"dev":"webpack-dev-server --open"

5、npm run dev 就可以打开一个本地服务器跑项目了
