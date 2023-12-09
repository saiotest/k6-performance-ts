const path = require('path');

module.exports = {
	mode: 'production',
	entry: {
		login: './tests/check.test.ts',
	}, // Generates multiple entry for each test
	output: {
		path: path.join(__dirname, 'dist'),
		libraryTarget: 'commonjs',
		filename: '[name].test.js',
	},
	resolve: {
		extensions: ['.ts', '.js'],
	},
	module: {
		rules: [
			{
				test: /\.ts$/,
				use: 'babel-loader',
				exclude: /node_modules/,
			},
		],
	},
	target: 'web',
	externals: /^(k6|https?\:\/\/)(\/.*)?/,
};
