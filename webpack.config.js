const path = require("path");

module.exports = {
	entry: "./index.js",
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: "babel-loader",
			},
			{
				test: /\.css$/,
				use: ["style-loader", "css-loader"],
			},
			{
				test: /\.scss$/,
				use: ["style-loader", "css-loader", "sass-loader"],
			},
			{
				test: /\.(jpe?g|png|gif|svg)$/i,
				loader: "file-loader",
			},
		],
	},
	output: {
		path: path.join(__dirname, "public"),
		filename: "cursed.js",
	},
	devtool: "cheap-module-eval-source-map",
	devServer: {
		contentBase: path.join(__dirname, "public"),
		port: 3000,
	},
};
