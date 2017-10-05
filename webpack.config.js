const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const config  = {
	module: {
		rules: [{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader'
			},
			{
				test: /\.css$/,
				//exclude: /node_modules/,
				loader: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: ['css-loader']
				})
			},
			{
				test: /\.svg$/,
				loader: 'svg-sprite-loader'
			},
			{
				test: /\.(ttf|eot|otf|png)$/,
				loader: 'file-loader?emitFile=false'
			}
		]
	},
	plugins: [
		new ExtractTextPlugin({
			filename: 'style.css',
			allChunks: true
		}),
		new OptimizeCssAssetsPlugin({
			cssProcessorOptions: { discardComments: { removeAll: true } }
		}),
		new UglifyJSPlugin()
	]
};
module.exports = [{
	...config,
		entry: './source/client/index.js',
		output: {
			filename: 'bundle.js',
			path: path.resolve(__dirname, 'public')
		},
		watch: true
	},
	{
		...config,
		entry: {
			app: [
				'regenerator-runtime/runtime',
				'./source/server.js'
			]
		},
		target: "node",
		output: {
			filename: 'bundle-server.js',
			path: path.resolve(__dirname, 'public'),
			libraryTarget: 'commonjs2',
			publicPath: '/public/'
		}
	}
];
