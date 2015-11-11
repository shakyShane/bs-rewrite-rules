var bs = require('browser-sync').create();
var mod = require('path').dirname(require.resolve('./'));

bs.init({
    proxy:        'http://www.bbc.co.uk',
    plugins:      [mod],
    serveStatic:  ['tests'],
    files:        ['tests'],
    rewriteRules: [
        {
            match: 'http://static.bbci.co.uk/frameworks/barlesque/2.93.13/orb/4/style/orb.min.css',
            replace: '/fixtures/bbc.css'
        }
    ]
});