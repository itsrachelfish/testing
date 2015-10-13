module.exports =
{
    watch: true,

    module:
    {
        loaders:
        [
            // Transform JSX in .js files
            { test: /\.js$/, loader: 'jsx-loader?harmony' }
        ],
    },
    
    output:
    {
        filename: 'bundle.js'
    }
};
