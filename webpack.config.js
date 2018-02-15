const path = require("path");
const webpack = require("webpack");
const env = process.env.NODE_ENV || 'development'
const prod = env === 'production'

module.exports = {
  entry: {
    main: "./src/main.js"
  },
  context: path.resolve(__dirname),

  plugins: [
    new webpack.NamedModulesPlugin(),
  ],

  output: {
    path: path.resolve(__dirname + '/_build/'),
    filename: '[name].js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.elm$/,
        exclude: [/elm-stuff/, /node_modules/, /Stylesheets\.elm$/],
        use: [{
          loader: 'elm-webpack-loader',
          options: {
            verbose: true,
            warn: true,
            debug: !prod
          }
        }]
      },
      {
        test: /\.html$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              limit: "10000",
              mimetype: "text/html"
            }
          }
        ]
      },
    ],
  },
  resolve: {
    extensions: ['.elm', '.js'],
    modules: [
      path.resolve(__dirname),
      path.resolve(__dirname, 'node_modules'),
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, "_build"),
    inline: false,
    hot: true,
    host: "0.0.0.0",
    port: 9000,
    disableHostCheck: true,
    stats: {
      colors: true
    },
  },
}
