const path = require('path');
const webpack = require('webpack'); // 用于访问内置插件
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
	entry: path.resolve(__dirname, '../src/utils/index.ts'),
	output: {
		path: path.resolve(__dirname, '../dist'),
		filename: 'utils.js',
		library: {
			name: '@kinda/utils',
			type: 'umd',
		},
	},
	// optimization: {
	// 	minimize: true,
	// 	splitChunks: {
	// 		chunks: 'all',
	// 	},
	// 	runtimeChunk: 'single',
	// 	minimizer: [
	// 		new TerserPlugin({
	// 			test: /\.js(\?.*)?$/i,
	// 		}),
	// 	],
	// },
	module: {
		rules: [
			{ test: /\.txt$/, use: 'raw-loader' },
			{ test: /\.css$/, use: ['style-loader', 'css-loader', 'postcss-loader'] },
			{ test: /\.json$/, use: 'json-loader' },
			{
				test: /\.s[ac]ss$/i,
				use: [
					// 将 JS 字符串生成为 style 节点
					'style-loader',
					// 将 CSS 转化成 CommonJS 模块
					'css-loader',
					// 自定义css文件前缀
					'postcss-loader',
					// 将 Sass 编译成 CSS
					'sass-loader',
				],
			},
			{
				test: /\.jsx$/,
				use: ['babel-loader'],
			},
			{
				test: /\.tsx?$/,
				use: 'ts-loader',
				exclude: /node_modules/,
			},
			{
				test: /\.less$/i,
				use: [
					// compiles Less to CSS
					'style-loader',
					'css-loader',
					'postcss-loader',
					'less-loader',
				],
			},
		],
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.js'],
	},
	plugins: [new webpack.ProgressPlugin(), new CleanWebpackPlugin()],
};
