1、新建文件 my-app 
	（1）npm i -g webpack 全局安装    npm i --save--dev webpack局部安装  npm i webpack-cli
	（2）执行命令  npm init （增加 package.json文件）
2、新建其他文件夹 src  (里面新建index.js和index.html文件)
3、src同级新建webpack.config.js文件 和dist文件夹
	webpack.config.js 里写入 ： module.exports = {
        entry: __dirname + '/src/index.js',
        output:{
            path:__dirname + '/dist',
            filename:'bundle-[hash].js'
        }
    }
4、package.json 文件里 "scripts" 下增加配置  "start":"webpack" （这样就可以直接使用npm start进行打包了）；

5、使用webpack构建本地服务器
    npm i --save-dev webpack-server
    在webpack.config.js中增加配置  
    devServer:{
        contentBase:'/src/index.html',//本地服务器所加载的页面所在的目录
        historyApiFallack:true,//不跳转
        inline:true //实时刷新
    }
package.js 中"scripts" 中增加 "dev" : "webpack-dev-server --open"    这样，终端输入npm run dev就可以启动项目了

6、安装babel  解析es6或者解析.jsx;
    npm i --save--dev babel-loader @babel/core @babel/preset-env' @babel/preset-react;
    在webpack.config.js中配置
    module:{
        rules:[
            {
                test:/(.js|.jsx)$/,
                use:{
                    loader:'babel-loader',
                    options:{
                        presets:[
                            "env","react"
                        ]
                    }
                }
            }
        ]
    }

7、npm install --save react react-dom; npm install --save-dev style-loader css-loader 安装react相关依赖


8、HtmlWebpackPlugin 依据现有模板生成打包模板



9,npm install extract-text-webpack-plugin@next; webpack4.0以上版本用这个，提取css的



10、代码压缩
    css    optimize-css-assets-webpack-plugin ； csnano(css预处理器)

11、px2rem-loader    rem转化  
    lib-flexible 动态计算根元素的大小

12、raw-loader@0.5.0 静态资源加载


12、cnpm i -D @babel/plugin-syntax-dynamic-import  代码分割动态import 比如，import是有一定得条件才出现的，使用这个就可以将这个分割出来，第一次加载压力就会变小





13、terser-webpack-plugin 过滤打包时的文件

    optimization:{
        minimize:true,
        minimizer:[
            new TerserPlugin({
                include:/\.min\.js/
            })
        ]
    }
这里表示，打包的时候，只针对文件名有.min的文件进行压缩