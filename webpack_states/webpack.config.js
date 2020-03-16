const FriendlyErrorWebpackPlugin = require("friendly-errors-webpack-plugin");

module.exports = {
  entry: "./src/index.jsx",
  output: {
    path: __dirname + "/dist",
    filename: "[name].js"
  },
  plugins: [
    new FriendlyErrorWebpackPlugin(),
    function() {
      this.hooks.done.tap("done", stats => {
        if (
          stats.compilation.errors &&
          stats.compilation.errors.length &&
          process.argv.indexOf("--watch") == -1
        ) {
          console.log("build error");
          process.exit(1);
        }
      });
    }
  ],
  stats:'normal'
};
