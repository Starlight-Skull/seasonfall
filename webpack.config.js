import HtmlWebpackPlugin from 'html-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import path from 'node:path'

export default (env, argv) => {
  console.log('argv: ', argv)

  if (argv.mode === 'production') {
    config.devtool = false
    config.output.filename = '[name].min.js'
    config.output.path = path.join(process.cwd(), 'dist/production')
  }

  return config
}

const config = {
  entry: {
    main: { import: './source/main.ts', dependOn: 'react' },
    react: ['react', 'react-dom', 'prop-types', 'react-dom/client']
  },
  output: {
    filename: '[name].bundle.js',
    assetModuleFilename: 'assets/[name][ext]',
    path: path.join(process.cwd(), 'dist/development'),
    clean: true
  },
  mode: 'development',
  devtool: 'source-map',
  plugins: [
    new HtmlWebpackPlugin({
      template: 'source/public/index.html',
      favicon: 'source/public/icons/icon.svg'
    }),
    new MiniCssExtractPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/i,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.(scss|sass)$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'resolve-url-loader',
          {
            loader: 'sass-loader',
            options: { sourceMap: true }
          }
        ]
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
        generator: { filename: 'textures/[name][ext][query]' }
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: { filename: 'fonts/[name][ext][query]' }
      }
      // {
      //   test: /\.(json)$/i,
      //   type: 'asset/resource',
      //   generator: { filename: 'worlds/[name][ext][query]' }
      // }
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx', '.ts', '.tsx']
  },
  devServer: {
    host: 'localhost',
    port: '3000',
    historyApiFallback: true,
    open: true
  }
}
