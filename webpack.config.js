const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const autoprefixer = require('autoprefixer');
const webpack = require('webpack');

module.exports = {
	entry: './src/frontEnd/index.js',
	mode: 'development',
	output: {
		path: '/',
		filename: 'assets/app.js',
		publicPath: '/',
	},
	resolve: {
		extensions: ['.js', '.jsx'],
	},
	optimization: {
		splitChunks: {
			chunks: 'async',
			name: true,
			cacheGroups: {
				vendors: {
					name: 'vendors',
					chunks: 'all',
					reuseExistingChunk: true,
					priority: 1,
					filename: 'assets/vendor.js',
					enforce: true,
					test(module, chunks) {
						const name = module.nameForCondition && module.nameForCondition();
						return chunks.some(
							chunk =>
								chunk.name !== 'vendor' && /[\\/]node_modules[\\/]/.test(name)
						);
					},
				},
			},
		},
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				enforce: 'pre',
				use: {
					loader: 'babel-loader',
				},
			},
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
				},
			},
			{
				test: /\.(s*)css$/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
					},
					'css-loader',
					'postcss-loader',
					{
						loader: 'sass-loader',
						options: {
							prependData: `
								@import "src/frontEnd/assets/styles/Vars.scss";
								@import "src/frontEnd/assets/styles/Media.scss";
								@import "src/frontEnd/assets/styles/Base.scss";
							`,
						},
					},
				],
			},
			{
				test: /\.(png|gif|jpg)$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: 'assets/[hash].[ext]',
						},
					},
				],
			},
		],
	},
	devServer: {
		historyApiFallback: true,
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: 'assets/app.css',
		}),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.LoaderOptionsPlugin({
			options: {
				postcss: [autoprefixer()],
			},
		}),
	],
};
