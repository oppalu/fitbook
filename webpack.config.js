
var path = require('path');
var config = {
  entry: './main.js',

  output: {
     path:'./',
     filename: 'index.js',
  },

  devServer: {
     inline: true,
     port: 8080
  },

  module: {
     loaders: [ {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel',

        query: {
           presets: ['es2015', 'react']
        }
     }]
  },
  resolve: {
      alias: {
        'react': path.join(__dirname, 'node_modules', 'react')
      },
      extensions: ['', '.js']
    },

}

module.exports = config;
