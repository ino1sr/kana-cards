const path = require("path");
const webpack = require("webpack");
const env = process.env.NODE_ENV || 'development'
const prod = env === 'production'
const execSync = require("child_process").execSync;


const PORT = parseInt(process.env.PORT || 9000)

const entry = {
    main: "./src/main.js"
  }

const plugins = [
    new webpack.NamedModulesPlugin(),
  ]


if (!prod) {
  entry.main = ([
      'webpack-dev-server/client?http://localhost:' + PORT.toString(),

      'webpack/hot/dev-server'
  ]).concat(entry.main)

  plugins.unshift(new webpack.HotModuleReplacementPlugin())
}

module.exports = {
  entry: entry,
  context: path.resolve(__dirname),
  mode: (prod ? "production" : "development"),
  plugins: plugins,
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
            pathToElm: "./elm-make",
            verbose: true,
            optimize: prod
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
    port: PORT,
    disableHostCheck: true,
    stats: "minimal"
  },
}
