const HtmlWebpackPlugin = require("html-webpack-plugin");

const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin"); //提取css文件
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin"); //压缩css文件
const autoprefixer = require('autoprefixer')
const webpack = require("webpack");

/**
 * 引入配置文件
 */
const pkg = require('./package.json');


class Enviorment {
  constructor(env) {
    this.env = env;
  }

  path() {
    let name;
    Object.keys(this.env).forEach(item => {
      if (/development|test|production|prev/.test(item)) {
        name = item;
      }
    });
    return name;
  }
}

/* postcss 配置 */
const postcssConfig = {
    plugins: () => [
        autoprefixer({
            browsers: pkg.browserslist,
        })
    ],
};


module.exports = (env = {}) => {
  const ENV = new Enviorment(env);
  const envObj = {
    // mode:'development',
    entry: __dirname + "/src/index.js",
    output: {
      path: __dirname + "/dist/" + ENV.path(),
      filename: "[name].js"
    },
    module: {
      rules: [
        {
          test: /(\.js|.jsx)$/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/env", "@babel/react"]
            }
          }
        },
        {
          test: /\.(css|less)$/,
          use: ExtractTextPlugin.extract({
            fallback: "style-loader",
            use: [
              {
                loader: "css-loader"
              },
              {
                loader: "less-loader"
              },
              {
                loader: "postcss-loader",
                options: postcssConfig
              }
            ]
          })
        },
        {
          test: /\.(woff|woff2|eot|otf|ttf)$/,
          use: "file-loader"
        },
        {
            test:/\.(jpg|png|jpeg|gif)$/,
            use:'url-loader?limit=512&name=images/[name].[ext]'
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: "my app",
        template: __dirname + "/src/index.html",
        // filename:'lala.html',
        // chunks:['lele'],//只允许您添加一些块（例如，仅单元测试块）
        inject: true, //true \|\| 'head' \|\| 'body' \|\| false将所有资产注入给定template或templateContent。
        //传递时，true或'body'所有javascript资源都将放置在body元素的底部。'head'将脚本放置在head元素中
        minify: {
          html5: true, //	根据HTML5规范解析输入
          collapseWhitespace: true, //折叠有助于文档树中文本节点的空白
          preserveLineBreaks: false, //标签之间的空格包含换行符时，请务必合拢到1个换行符（永远不要将其完全删除）。
          //必须与collapseWhitespace=true
          minifyCSS: true, //缩小样式元素和样式属性中的CSS
          minifyJS: true, //缩小脚本元素和事件属性中的JavaScript
          removeComments: false //删除HTML注释
        }
      }),
      new CleanWebpackPlugin(),
      new ExtractTextPlugin({
        filename: "[name].css"
      }),
      new OptimizeCssAssetsPlugin({
        assetNameRegExp: /\.css$/g, //一个正则表达式，指示应优化\最小化的资产名称。提供的正则表达式是
        //针对ExtractTextPlugin配置中实例所导出文件的文件名而不是源CSS文件的文件名运行的。默认为/\.css$/g
        cssProcessor: require("cssnano") //用于优化\最小化CSS的CSS处理器，默认为cssnano。这应该是遵循
      })
      // new CleanWebpackPlugin( 'dist/*.*',{
      //     root:__dirname,
      //     verbose:true,//将日志写入控制台
      //     dry:false //模拟删除文件
      // })
      //热更新，测试的时候发现不开这个也可以热更新
      // new webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
      contentBase: "/src/index.js",
      // historyApiFallback: true,
      // inline: true,
      hot: true
    }
    //   watch:true,//开启打包监听
    //   watchOptions:{//只有watch开启时，这里才有意义
    //       ignored:/node_modules/,//排除文件
    //       aggregateTimeout:2000,//监听到文件变化后2秒后再去执行，默认300毫秒
    //       poll:1000//判断文件是否发生变化时通过不停的询问系统指定的文件有没有变化实现的默认每秒问1000次
    //   }
  };
  return envObj;
};
