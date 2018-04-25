const webpack = require('webpack');
const babelOpts = require('./babel');

const { join } = require('path');
const dist = join(__dirname, '../static');
const src = join(__dirname, '../src');

module.exports = {
	entry: {
		app: [join( src, 'boot.js')]
	},
	output: {
		path: dist,
		filename: 'bundle.js',
		publicPath: '/'
	},
	mode: 'development',
	resolve: {
		alias: {
			'src': src
		}
	},
	module: {
		rules: [{
			test: /\.m?jsx?$/, // See the m, for loading inferno modules
			type: 'javascript/auto', // Required also by inferno to load modules in non strict mode https://github.com/webpack/webpack/issues/6699
			exclude: join(__dirname, '..', 'node_modules'),
			use: [
				{ loader: 'babel-loader',	options: {
					presets: [
						['es2015', { loose:true, modules: false }],
						'stage-2',
						'react'
					],
					plugins: [
						["react-hot-loader/babel"]
					]
				}}
			]
		}]
	},
	plugins: [
    new webpack.HotModuleReplacementPlugin(),
		new webpack.NamedModulesPlugin()
  ],
	devtool: 'cheap-module-eval-source-map',
	devServer: {
		contentBase: dist,
		port: process.env.PORT || 3001,
		historyApiFallback: true,
		compress: false,
		inline: true,
		hot: true
	}
};
