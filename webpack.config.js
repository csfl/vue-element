var path = require('path')
var webpack = require('webpack')

module.exports = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/vue-element/dist/',
    filename: 'build.js'
  },
  resolve: {
    // 配置webpack require 查找的路径,　遵循 build-in => *.js => *dir/index.js => ../**/*.js
    modules: [
      'node_modules'
    ],
    alias: {
      // 'components': path.resolve(__dirname, 'app/components'),
      // 'font': path.resolve(__dirname, 'app/assets/fonts'),
      // 'actions': path.resolve(__dirname, 'app/vuex/actions.js'),
      // 'ui': path.resolve(__dirname, 'app/components/ui'),
      // 'assets': path.resolve(__dirname, 'app/assets'),
      // 'domain': path.resolve(__dirname, 'app/config/domain.js'),
      'utils': path.resolve(__dirname, 'src/utils')
    },
    extensions: ['.json', '.js', '.vue']
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            // Since sass-loader (weirdly) has SCSS as its default parse mode, we map
            // the "scss" and "sass" values for the lang attribute to the right configs here.
            // other preprocessors should work out of the box, no loader config like this nessessary.
            'scss': 'vue-style-loader!css-loader!sass-loader',
            'sass': 'vue-style-loader!css-loader!sass-loader?indentedSyntax'
          }
          // other vue-loader options go here
        }
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },
      {
        test: /\.(eot|ttf|woff|woff2)(\?\S*)?$/,
        loader: 'file-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]'
        }
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'svg-sprite-loader',
          },
          {
            loader: 'svgo-loader',
            options: {
              plugins: [
                {removeTitle: true},
                {convertColors: {shorthex: false}},
                {convertPathData: false},
                {removeStyleElement: true}
              ]
            }
          }
        ]
      },
    ]
  },
  devServer: {
    noInfo: true
  },
  // performance: {
  //   hints: false
  // },
  devtool: '#eval-source-map'
}

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = false
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ])
}
