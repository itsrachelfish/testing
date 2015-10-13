//var path = require('path');

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

    entry:
    {
        main: './static/js/main.js',
    },

    output:
    {
        filename: './bundle.js'
    }
};
