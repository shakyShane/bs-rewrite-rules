var bs = require('browser-sync').create();

//bs.use(require('./'));

bs.init({
    server: 'tests/fixtures',
    disableBrowserCache: true,
    open: false,
    plugins: [
        {
            module: '/Users/shakyshane/code/bs-rewrite-rules',
            enabled: true
        }
    ]
});