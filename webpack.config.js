const path = require('path');
const webpack = require('webpack'); //to access built-in plugins
const HtmlWebpackPlugin = require('html-webpack-plugin'); //installed via npm
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const Dotenv = require('dotenv');

module.exports = (env, argv) => {

  // https://www.bennadel.com/blog/3598-webpack-4-automatically-makes-process-env-node-env-available-in-your-javascript.htm
  const NODE_ENV = process.env.NODE_ENV || 'production';
  const isDevelopmentMode = ( argv.mode === "development" || NODE_ENV == "development");
  const dotenvFile = './.env' + (isDevelopmentMode?'.local':'');
  const dotenv = Dotenv.config({ path:dotenvFile }).parsed;
  const ENV = Object.assign({}, dotenv, { NODE_ENV });
  //console.log('webpack env', {isDevelopmentMode, dotenvFile, dotenv, ENV });

  // Locally, we want robust source-maps. However, in production, we want something
	// that can help with debugging without giving away all of the source-code. This
	// production setting will give us proper file-names and line-numbers for debugging;
	// but, without actually providing any code content.
	var devtool = isDevelopmentMode
		? "eval-source-map"
		: "nosources-source-map"
	;
 
	// By default, each module is identified based on Webpack's internal ordering. This
	// can cause issues for cache-busting and long-term browser caching as a localized
	// change can create a rippling effect on module identifiers. As such, we want to
	// identify modules based on a name that is order-independent. Both of the following
	// plugins do roughly the same thing; only, the one in development provides a longer
	// and more clear ID.
	var moduleIdentifierPlugin = isDevelopmentMode
		? new webpack.NamedModulesPlugin()
		: new webpack.HashedModuleIdsPlugin()
  ;
  



  const commonPlugins = [

    new webpack.DefinePlugin({
      'process.env': JSON.stringify(ENV)
    }),

    moduleIdentifierPlugin,
  ];



  const baseConfig = {

    mode: NODE_ENV,

    module: {
        rules: [
            { test: /\.txt$/, use: 'raw-loader' },
            { test: /\.(jpe?g|gif|png|svg|woff|ttf|wav|mp3)$/, loader: "file" },
            {
              test: /\.(js|mjs|jsx)$/,

              // exclude node modules or be prepared to wait for a very sllow build
              // https://stackoverflow.com/a/53122983/12237147
              exclude: /(node_modules|bower_components)/,

              use: {
                loader: 'babel-loader', //['babel-loader','eslint-loader'],
                query: {
                  presets: [
                    "@babel/preset-env",
                    "@babel/preset-react"
                  ]
                }
              }
            },
            {
              test: /\.(scss|sass|css)$/,
              use: [
                // style-loader
                { loader:'style-loader' },
                // css-loader
                { loader: 'css-loader', options: { modules: true } },
                // sass-loader
                { loader:'sass-loader' },
                // sass-loader https://github.com/postcss/postcss#usage
                { loader:'postcss-loader' },
              ]
      },
      {
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      },
            {
              test: /\.(png|jpg|gif)$/i,
              use: [
                {
                  loader: 'url-loader',
                  options: {
                    limit: 8192,
                  },
                },
              ],
            },
        ]
    },
    
    devtool,
    
    stats: {
      // Nice colored output
      colors: true
    },

  };


  const externals = {
    'react': 'window.React',
    'react-dom': 'ReactDOM',
    'react-addons-transition-group': 'var React.addons.TransitionGroup',
    'react-addons-pure-render-mixin': 'var React.addons.PureRenderMixin',
    'react-addons-create-fragment': 'var React.addons.createFragment',
    'react-addons-update': 'var React.addons.update'
  };

  const inlineConfig = Object.assign({}, baseConfig, {
    entry: {
      form: './src/form/inline.js'
    },
    output: {
      // https://stackoverflow.com/a/40906811/12237147
      //publicPath: './',
      path: path.resolve(__dirname, './build'),
      filename: 'inline.js'
    },
    plugins: commonPlugins,
    externals // react is lazy loader with hubster
  });

  const dialogConfig = Object.assign({}, baseConfig, {
    entry: {
      form: './src/form/dialog.js'
    },
    output: {
      // https://stackoverflow.com/a/40906811/12237147
      //publicPath: './',
      path: path.resolve(__dirname, './build'),
      filename: 'dialog.js'
    },
    plugins:  commonPlugins,
    externals // react is lazy loader with hubster
  });

  const fyneConfig = Object.assign({}, baseConfig, {
    entry: {
      main: './src/fyne/index.js'
    },
    output: {
      // https://stackoverflow.com/a/40906811/12237147
      //publicPath: './',
      path: path.resolve(__dirname, './build'),
      filename: 'fyne.js'
    },
    plugins: []
      .concat([new CleanWebpackPlugin()])
      .concat(commonPlugins)
      .concat([new HtmlWebpackPlugin({ filename: 'index.html', template: './src/index.html'})])
      .concat([new HtmlWebpackPlugin({ filename: 'dialog.html', template: './src/form/dialog.html'})])
      .concat([new HtmlWebpackPlugin({ filename: 'inline.html', template: './src/form/inline.html' })])
      .concat([new HtmlWebpackPlugin({ filename: 'dynamic.html', template: './src/form/dynamic.html' })])
      .concat()
      .concat(
        !!isDevelopmentMode
        ? [
          new CopyWebpackPlugin([{ from: 'favicon' }]),
          new CopyWebpackPlugin([{ from: 'static' }])
        ]
        : []
      )
    ,
    devServer: {
      port: process.env.PORT || 9001,
      compress: true,
      open: true,
      hot: true,
      //inline: false,
      disableHostCheck: true,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
        "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
      },
      //contentBase: [
      //  path.join(__dirname, 'dist'),
      //  path.join(__dirname, 'static'),
      //  path.join(__dirname, 'form', 'dist')
      //],
      after: function(app, server, compiler) {
        //console.log("Dev server stopped");
      }
    }
  });
  
  
  const directConfig = Object.assign({}, baseConfig, {
    entry: {
      form: './src/form/direct.js'
    },
    output: {
      // https://stackoverflow.com/a/40906811/12237147
      //publicPath: './',
      path: path.resolve(__dirname, './build'),
      filename: 'direct.js'
    },
    plugins: []
    .concat(commonPlugins)
    .concat([new HtmlWebpackPlugin({ filename: 'direct.html', template: './src/form/direct.html'})])
  });
  
  
  const plainConfig = Object.assign({}, baseConfig, {
    entry: {
      form: './src/form/plain.js'
    },
    output: {
      // https://stackoverflow.com/a/40906811/12237147
      //publicPath: './',
      path: path.resolve(__dirname, './build'),
      filename: 'plain.js'
    },
    plugins: []
    .concat(commonPlugins)
    .concat([new HtmlWebpackPlugin({ filename: 'plain.html', template: './src/form/plain.html'})])
  });


  const bundles = [
    fyneConfig, 
    dialogConfig, 
    inlineConfig, 
    directConfig, 
    // plainConfig, just pointless
  ]
  
  return bundles;
}