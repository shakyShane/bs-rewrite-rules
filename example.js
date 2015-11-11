var bs = require('browser-sync').create();
var mod = require('path').dirname(require.resolve('./'));

bs.init({
    proxy: 'http://www.bbc.co.uk',
    plugins: [mod],
    rewriteRules: [
        {
            match: 'shane',
            replace: 'kittie'
        }
    ]
});