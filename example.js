var bs = require('browser-sync').create();
var mod = require('path').dirname(require.resolve('./'));

bs.init({
    proxy: 'https://www.selcobw.com/',
    plugins: [mod],
    open: false,
    rewriteRules: [
        {
            "match": "<script type=\"text/javascript\" src=\"https://www.selcobw.com/media/js/0676b2b6eab133039ee1b07f90b0c43b.js\"></script>",
            "replace": ""
        },
        {
            "match": "<script type=\"text/javascript\">\n//<![CDATA[\nMage.Cookies.path     = '/';\nMage.Cookies.domain   = '.selcobw.com';\n//]]>\n</script>",
            "replace": ""
        },
        {
            "match": "<script type=\"text/javascript\">//<![CDATA[\n        var Translator = new Translate({\"Add to Cart\":\"Add to Basket\",\"Wishlist Name\":\"Project List Name\",\"Make This Wishlist Public\":\"Make This Project List Public\",\"Error happened during wishlist creation. Try again later\":\"Error happened during Project List creation. Try again later\",\"Create New Wishlist\":\"Create New Project List\",\"Edit Wishlist\":\"Edit Project List\",\"Add to Wishlist\":\"Add to Project List\"});\n        //]]></script>",
            "replace": ""
        },
        {
            "match": "<script type=\"text/javascript\">\n        //<![CDATA[\n        var searchForm = new Varien.searchForm('search_mini_form', 'search', '');\n        //]]>\n    </script>",
            "replace": ""
        },
        {
            "match": "<script type=\"text/javascript\">\n        //<![CDATA[\n        var newsletterSubscriberFormDetail = new VarienForm('newsletter-validate-detail');\n        //]]>\n    </script>",
            "replace": ""
        }
    ]
});
