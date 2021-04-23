const ExtractTextPlugin = require("extract-text-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const cssRegex = /\.global\.css$/;
const cssModuleRegex = /\.css$/;
const sassRegex = /\.global\.(scss|sass)$/;
const sassModuleRegex = /\.(scss|sass)$/;
module.exports = {
	module: {
		rules: [
			{
				test: /\.js$/,
				loader: "babel-loader",
				exclude: /node_modules/,
				query: {
					cacheDirectory: true,
					plugins: ["transform-decorators-legacy"],
					presets: ["es2015", "stage-0", "react"]
				}
			},
			{
				test: /\.scss$/,
				use: ExtractTextPlugin.extract({
					fallback: "style-loader",
					use: ["css-loader", "postcss-loader", "sass-loader"]
				})
			},
			{ test: /\.json$/, loader: "json-loader" },
			{ test: /\.(woff?|woff2?|svg)$/, loader: "url-loader?mimetype=application/font-wof" },
			{ test: /\.(ttf|eot)$/, loader: "file-loader" },
            { test: /\.png$/, loader: "url-loader?mimetype=image/png" },
              
		]
	}
};



// {
//     test: sassRegex,
//     exclude: sassModuleRegex,
//     use: getStyleLoaders({
//       importLoaders: 1,
//       sourceMap: isEnvProduction && shouldUseSourceMap,
//       camelCase: true
//     }),
//     sideEffects: true,
//   },