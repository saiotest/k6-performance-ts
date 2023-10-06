const path = require('path');

module.exports = {
	mode: 'production',
	entry: {
		test: './tests/performanceBundle.test.js',
		urls: './helper/endpoints.js',
		envs: './helper/environment.js',
	},
	output: {
		path: path.resolve(__dirname, 'dist'), // eslint-disable-line
		libraryTarget: 'commonjs',
		filename: '[name].bundle.js',
	},
	module: {
		rules: [{ test: /\.js$/, use: 'babel-loader' }],
	},
	target: 'web',
	externals: /k6(\/.*)?/,
};
