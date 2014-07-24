'use strict';

var cssIsolate = require('../lib/index.js');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports.cssIsolate = {
  setUp: function(done) {
    // setup here
    done();
  },
  'no args': function(test) {
    test.expect(1);
    // tests here
    test.throws(function() { cssIsolate.diff(); }, 'Must provide 2 CSS strings in order to diff', 'should throw argument error.');
    test.done();
  },
  'outputs unique declarations not found in the first CSS string': function (test) {
    test.expect(1);
    var s1 = '.a { color: blue; font-size: 12px; }';
    var s2 = '.a { color: red; font-size: 12px; }';
    test.equal(cssIsolate.diff(s1, s2, { compress: true }), '.a{color:red;}');
    test.done();
  },
  'outputs empty string if no differences found': function (test) {
    test.expect(1);
    var s1 = '.a { color: red; font-size: 12px; }';
    var s2 = '.a { color: red; font-size: 12px; }';
    test.equal(cssIsolate.diff(s1, s2), '');
    test.done();
  },
  'outputs all rules of 2nd CSS string if no selectors in common': function (test) {
    test.expect(1);
    var s1 = '.a { color: red; font-size: 12px; }';
    var s2 = '.b { color: red; font-size: 12px; }.c { color: red; font-size: 12px; }';
    test.equal(cssIsolate.diff(s1, s2, { compress: true }), '.b{color:red;font-size:12px;}.c{color:red;font-size:12px;}');
    test.done();
  },
  'outputs all rules if no declarations in common': function (test) {
    test.expect(1);
    var s1 = '.a { color: red; font-size: 12px; }';
    var s2 = '.a { border-color: red; font-weight: bold; }';
    test.equal(cssIsolate.diff(s1, s2, { compress: true }), '.a{border-color:red;font-weight:bold;}');
    test.done();
  },
  'outputs unique declarations not found in the first CSS string for multiple selectors': function (test) {
    test.expect(1);
    var s1 = '.a, .c { color: blue; font-size: 12px; }';
    var s2 = '.a, .b { color: red; font-size: 12px; }';
    test.equal(cssIsolate.diff(s1, s2, { compress: true }), '.a,.b{color:red;font-size:12px;}');
    test.done();
  }
};
