const path = require('path');

module.exports = {
  entry: path.join(__dirname, "js/app/index.js"),
  output: {
    filename: 'index.js',
    path: path.join(__dirname, '../public/javascripts')
  },
  module: {
    rules: [
      {
        test: /\.less$/,
        use: ["style-loader", "css-loader", "less-loader"]
      }
    ]
  } 
};