module.exports = [
    {
        test: /\.jsx$/,
        loader: 'babel-loader',
        exclude: /node_modules/
    },
    {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
    },
    {
        test: /\.styl$/,
        loader: 'style-loader!css-loader!stylus-loader'
    },
    {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
    }
]