const HtmlWebpackPlugin = require("html-webpack-plugin");

const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const webpack = require('webpack')

module.exports = {
  // mode:'development',
  entry: __dirname + "/src/index.js",
  output: {
    path: __dirname + "/dist"+'/prod',
    filename: "[name]_[hash].js"
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
        test: /\.css$/,
        loader: "style-loader!css-loader"
      },
      {
        test: /\.less$/,
        loader: "style-loader!css-loader!less-loader"
      },
      {
        test: /\.(woff|woff2|eot|otf|ttf)$/,
        use:"file-loader"
      },
      {
          test:/\.(jpg|png|jpeg|gif)$/,
          use:'url-loader?limit=512&name=images/[name].[ext]'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: __dirname + "/src/index.html"
    }),
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
};
