


const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
    entry:{
        "large-number":'./src/index.js',
        "large-number-min":"./src/index.js"
    },
    output:{
        filename:'[name].js'
    },
    mode:'none',
    optimization:{
        minimize:true,
        minimizer:[
            new TerserPlugin({
                include:/\.min\.js/
            })
        ]
    }
}