## bs-rewrite-rules

> UI interface for adding/removing/editing Browsersync's rewrite rules

### Install

```shell
npm i browser-sync bs-rewrite-rules
```

### Usage

```js
var bs = require('browser-sync').create();

bs.init({
    proxy: 'http://www.bbc.co.uk',
    plugins: ['bs-rewrite-rules']
});
```

Now access the Plugins section of the UI (address given in the console)
& you'll be presented with: 

![ui](http://s22.postimg.org/i3yi07zwx/Screen_Shot_2015_11_11_at_08_46_47.png)

### Works well with `serveStatic`

Image you have the frontend assets of a live site on your local machine.
You could use Browsersync to proxy the live site & then rewrite the links 
to point to your local files: 

```js
var bs = require('browser-sync').create();

bs.init({
    proxy: 'http://www.bbc.co.uk',
    plugins: ['bs-rewrite-rules'],
    serveStatic: ['assets'],
    rewriteRules: [
        {
            match: 'http://example.com/skin/frontend/sunspel/default/assets/css/core.min.css',
            replace: '/css/core.css'
        }
    ]
});
```
