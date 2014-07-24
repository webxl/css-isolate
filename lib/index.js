/*
 * cssDeclarationDiff
 * http://github.com/webxl/css-isolate
 *
 * Copyright (c) 2014 Matt Motherway
 * Licensed under the MIT license.
 */

'use strict';

var parse = require('css').parse,
    stringify = require('css').stringify;

// returns hash map of selector+prop -> value
function hashRules (rules) {
  var hash = {};

  rules.forEach(function (rule) {
    if (!rule.selectors) { return; }

    rule.selectors.forEach(function (selector) {
      if (!rule.declarations) { return; }

      rule.declarations.forEach(function (declaration) {

        if (declaration.value) { // needed for bootstrap ie8-9 hack
          hash[selector + declaration.property] = declaration.value;
        }

      });
    });
  });

  return hash;
}

exports.diff = function(cssStr1, cssStr2, opts) {
  if (!cssStr1 || !cssStr2) {
      throw 'Must provide 2 CSS strings in order to diff';
  }

  opts = opts || {};

  var rules1 = parse(cssStr1).stylesheet.rules,
      rules2 = parse(cssStr2).stylesheet.rules,
      rules1Hash = hashRules(rules1),
      rules2Hash = hashRules(rules2),
      diffRules = [];

  rules2.forEach(function (rule) {
    if (!rule.selectors) { return; }

    var newRule;

    rule.selectors.forEach(function (selector) {
      if (!rule.declarations) { return; }

      rule.declarations.forEach(function (declaration) {

        // ignore declarations that have been overridden or ie hacks
        if (rules2Hash[selector + declaration.property] !== declaration.value || !declaration.value) {
          return;
        }

        if (rules1Hash[selector + declaration.property] !== declaration.value || !rules1Hash[selector + declaration.property]) {

          if (!newRule) {
            newRule = JSON.parse(JSON.stringify(rule));
            // ensure all unique rules in 2nd string are preserved
            // TODO: flatten rules first so that there are no redundant declarations
            // can possibly do this within the rule.selectors.forEach loop
            if (rules1Hash[selector + declaration.property]) {
              delete newRule.declarations;
            }
          }
          if (!newRule.declarations) {
            newRule.declarations = [];
          }
          var found = false;
          newRule.declarations.forEach(function (dec) {
            if (dec.property ===  declaration.property) {
              found = true;
            }
          });

          if (!found) {
            newRule.declarations.push(declaration);
          }
        }
      });
    });

    if (newRule) {
      diffRules.push(newRule);
    }
  });

  return stringify(
    {
      type: "stylesheet",
      stylesheet: {
        rules: diffRules
      }
    },
    {
      compress: opts.compress
    }
  );
};
