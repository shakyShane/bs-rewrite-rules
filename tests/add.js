var browserSync = require("browser-sync");
var assert      = require("chai").assert;
var path        = require("path");
var OPTPATH     = ['shakyshane', 'rewrite-rules', 'rules'];
var plugin      = path.resolve(__dirname, "../");

function startWithRules (rules, cb) {
    browserSync.reset();
    var bs = browserSync.create();

    bs.init({
        server: "test/fixtures",
        logLevel: "silent",
        rewriteRules: rules,
        open: false,
        plugins: [{module: plugin}]
    }, cb);
}

describe("Adding rewrite rules", function() {

    it("can add a string replacement", function (done) {

        startWithRules([], function (err, bs) {

            bs.ui.rewriteRules.addRule({
                match: {
                    type: "string",
                    value: "shane"
                },
                replace: {
                    type: "string",
                    value: "kittie"
                }
            });

            var rules = bs.ui.options.getIn(OPTPATH).toJS();
            assert.equal(rules.length, 1);

            var rule = rules[0];

            assert.equal(rule.match, "shane");
            assert.equal(rule.replace, "kittie");
            assert.equal(rule.matchInput, "shane");
            assert.equal(rule.matchType, "string");
            assert.equal(rule.replaceType, "string");
            assert.equal(rule.replaceInput, "kittie");
            assert.equal(typeof rule.id === "string", true);
            assert.equal(rule.active, true);
            assert.equal(rule.paths.length, 0);

            bs.cleanup(done);
        });
    });
    it("can add a string with empty replace", function (done) {

        startWithRules([], function (err, bs) {

            bs.ui.rewriteRules.addRule({
                match: {
                    type: "string",
                    value: "shane"
                },
                replace: {
                    type: "string",
                    value: ""
                }
            });

            var rules = bs.ui.options.getIn(OPTPATH).toJS();
            assert.equal(rules.length, 1);

            var rule = rules[0];

            assert.equal(rule.match, "shane");
            assert.equal(rule.replace, "");
            assert.equal(rule.matchInput, "shane");
            assert.equal(rule.matchType, "string");
            assert.equal(rule.replaceType, "string");
            assert.equal(rule.replaceInput, "");
            assert.equal(typeof rule.id === "string", true);
            assert.equal(rule.active, true);
            assert.equal(rule.paths.length, 0);

            bs.cleanup(done);
        });
    });
    it("can restore rules that may be partially missing", function (done) {

        startWithRules([], function (err, bs) {

            bs.ui.rewriteRules.replaceRules([
                {
                    matchFlags: 'gi',
                    matchInput: 'bootstrap',
                    match: {},
                    active: true,
                    replaceType: 'function',
                    paths: [],
                    replaceInput: 'return "Browsersync";',
                    id: '904c5ebb657efb6df274653a3d65ade00eac61a5',
                    matchType: 'regex'
                }
            ]);

            var rules = bs.ui.options.getIn(OPTPATH).toJS();
            assert.equal(rules.length, 1);

            var rule = rules[0];

            assert.isTrue(rule.match instanceof RegExp);

            bs.cleanup(done);
        });
    });
    it("can update existing rules", function (done) {

        startWithRules([], function (err, bs) {

            bs.ui.rewriteRules.addRule({
                match: {
                    type: "string",
                    value: "shane"
                },
                replace: {
                    type: "string",
                    value: ""
                }
            });

            var rules = bs.ui.options.getIn(OPTPATH).toJS();
            const id = rules[0].id;
            bs.ui.rewriteRules.addRule({
                id: id,
                match: {
                    type: "string",
                    value: "shane"
                },
                replace: {
                    type: "string",
                    value: "Some other string"
                }
            });
            var rulesUpdated = bs.ui.options.getIn(OPTPATH).toJS();
            console.log(rulesUpdated);

            assert.equal(rulesUpdated[0].replaceInput, 'Some other string');

            bs.cleanup(done);
        });
    });
});

