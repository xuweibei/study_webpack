const HtmlWebpackPlugin = require("html-webpack-plugin");

const glob = require("glob");
const path = require("path");

const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin"); //提取css文件
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin"); //压缩css文件
const autoprefixer = require("autoprefixer");
const webpack = require("webpack");
const HtmlWebpackExternalPlugin = require('html-webpack-externals-plugin');

/**
 * 引入配置文件
 */
const pkg = require("./package.json");

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
      browsers: pkg.browserslist
    })
  ]
};



//多页面打包
const setMore = () => {
  const entry = {};
  const htmlWebpackPlugin = [];
  const entryFiles = glob.sync(path.join(__dirname, "./src/*/index.js"));
  Object.keys(entryFiles).map(item => {
    const entryFile = entryFiles[item];
    const match = entryFile.match(/src\/(.*)\/index.js/);
    const pageName = match && match[1];
    entry[pageName] = entryFile;
    htmlWebpackPlugin.push(
      new HtmlWebpackPlugin({
        title: "my app",
        template: __dirname + `/src/${pageName}/index.html`,
        filename:`${pageName}/${pageName}.html`,
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
      })
    );
  });
  return {
    entry,
    htmlWebpackPlugin
  }
};

const {entry,htmlWebpackPlugin} = setMore();




module.exports = (env = {}) => {
  const ENV = new Enviorment(env);
  const envObj = {
    devtool:'sourcemap',//为了更好的调试，因为如果不加这个，调试的代码是经过编译的，加上这个，代码就和平常写的一样了
    // mode:'development',
    // entry: __dirname + "/src/index.js",
    entry:entry,
    output: {
      path: __dirname + "/dist/" + ENV.path(),
      filename: "[name]/[name].js"
    },
    module: {
      rules: [
        {
          test: /(\.js|.jsx)$/,
          use: {
            loader: "babel-loader"
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
              },
              {
                loader: "px2rem-loader",
                options: {
                  remUnit: 75,
                  remPrecision: 8
                }
              }
            ]
          })
        },
        {
          test: /\.(woff|woff2|eot|otf|ttf)$/,
          use: "file-loader"
        },
        {
          test: /\.(jpg|png|jpeg|gif)$/,
          use: "url-loader?limit=512&name=images/[name].[ext]"
        }
      ]
    },
    plugins: [
      // new HtmlWebpackPlugin({
      //   title: "my app",
      //   template: __dirname + "/src/index.html",
      //   // filename:'lala.html',
      //   // chunks:['lele'],//只允许您添加一些块（例如，仅单元测试块）
      //   inject: true, //true \|\| 'head' \|\| 'body' \|\| false将所有资产注入给定template或templateContent。
      //   //传递时，true或'body'所有javascript资源都将放置在body元素的底部。'head'将脚本放置在head元素中
      //   minify: {
      //     html5: true, //	根据HTML5规范解析输入
      //     collapseWhitespace: true, //折叠有助于文档树中文本节点的空白
      //     preserveLineBreaks: false, //标签之间的空格包含换行符时，请务必合拢到1个换行符（永远不要将其完全删除）。
      //     //必须与collapseWhitespace=true
      //     minifyCSS: true, //缩小样式元素和样式属性中的CSS
      //     minifyJS: true, //缩小脚本元素和事件属性中的JavaScript
      //     removeComments: false //删除HTML注释
      //   }
      // }),
      new CleanWebpackPlugin(),
      new ExtractTextPlugin({
        filename: "[name]/[name].css"
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
    ].concat(...htmlWebpackPlugin).concat( //提取react和react-dom,加快打包速度减少包大小
      new HtmlWebpackExternalPlugin({
        externals:[
          {
            module:'react',
            entry:"http://static.runoob.com/assets/react/react-0.14.7/build/react.min.js",
            global:'React'
          },
          {
            module:'react-dom',
            entry:"http://static.runoob.com/assets/react/react-0.14.7/build/react-dom.min.js",
            global:'ReactDOM'
          }
        ]
      })
    ),
    // optimization:{ //打包公共文件
    //   splitChunks:{
    //     minSize:10000,
    //     cacheGroups:{
    //       commons:{
    //         name:'commons',
    //         chunks:'all',
    //         minChunks:3
    //       }
    //     }
    //   }
    // },
    devServer: {
      // contentBase: "/src/index.js",
      contentBase: "/dist/test/index.html",
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
