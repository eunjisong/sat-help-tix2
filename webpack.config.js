'use strict';

module.exports = {
  // Compile ./browser/index.js and its transitive imports.
  entry: './browser/index.js',
  output: {
    path: __dirname,
    // ...and write the output to ./public/bundle.js
    filename: './public/bundle.js'
  },
  // What kind of source maps to build, if any?
  devtool: 'source-map',
  resolve: {
    // What file extensions will webpack look for when we call,
    //    import './Foo'
    //      or
    //    require('./Foo')
    // ?
    // A: ./Foo.jsx, ./Foo.js, ./Foo.json 
    extensions: ['.jsx', '.js', '.json'],
  },
  module: {
    loaders: [
      {
        // Use babel for files that end in js or jsx.
        test: /jsx?$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader'
      }
    ]
  }
}
