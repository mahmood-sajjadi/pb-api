const webpack = require('webpack');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');

const config = {
	entry: {
		'app': './src/app.module.js',
		'vendor': './src/vendor.module.js'
	},
	output: {
		filename: 'libs/[name].bundle.js',
		path: path.resolve(__dirname, 'build')
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: [{
					loader: 'ng-annotate-loader'
				}, {
					loader: 'eslint-loader',
					options: {
						fix: true,
					}
				}, {
					loader: 'babel-loader'
				}]
			},
			{
				test: /\.(scss)$/,
				use: ExtractTextWebpackPlugin.extract({
					use: [
							{
								loader: "css-loader",
								options: {
									minimize: true
								}
							},
							{
								loader: "sass-loader"
							}
					]
				})
			},
			{
				test: /\.(png|jpg|jpeg|gif|svg|woff|woff2)$/,
				loader: 'url-loader?limit=10000',
				options: {
					name: './fonts/[name].[ext]'
				}
			},
			{
				test: /\.(eot|ttf)$/,
				loader: 'file-loader',
				options: {
					name: './fonts/[name].[ext]'
				}
			},
			{ test: /\.html$/, loader: 'html-loader' }
		]
	},
	plugins: [
		new webpack.optimize.UglifyJsPlugin({
			comments: false
		}), // for mifiying js
		//new webpack.optimize.CommonsChunkPlugin({
		//	name: 'vendor',
		//	filename: 'libs/[name].bundle.js'
		//}),
		new CleanWebpackPlugin('build'),
		new HtmlWebpackPlugin({
			template: './src/index.html'
		}),
		new ExtractTextWebpackPlugin('styles/styles.css'),
		new OptimizeCssAssetsWebpackPlugin()
	],
	devServer: {
		port: 3000,
		contentBase: './src/',
		historyApiFallback: true,
		proxy: {
      '/bars': {
        target: 'http://pb-api.herokuapp.com',
				secure: false,
				changeOrigin: true
      }
    }
	}
};

module.exports = config;
