var webpack = require('webpack');

module.exports = {
  entry: [
    'babel-polyfill',
    './src/index.js'
  ],
  output: {
    path: __dirname,
    publicPath: '/',
    filename: 'assets/scripts/bundle.js'
  },
  module: {
    loaders: [{
      exclude: /node_modules/,
      loader: 'babel',
      query: {
        presets: ['react', 'es2015', 'stage-1']
      }
    }]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  devServer: {
    historyApiFallback: true,
    contentBase: './'
  },
  plugins:[
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': '"production"',
        'API_SERVER': JSON.stringify('http://10.0.215.78:8080'),
        'APP_SERVER': JSON.stringify('http://10.0.215.78:8080'),
        'MOCKED_DATA':false
        /*
          'http://10.0.215.78:8080' //QA
          'http://10.0.100.97:8080' //DEV Noman
          'http://10.0.100.94:8080' // DEV Irfan
        */
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress:{
        warnings: false
      }
    })
  ]
};
