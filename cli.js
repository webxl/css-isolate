#! /usr/bin/env node

'use strict';

var path = require('path'),
    fs = require('fs'),
    lib = path.join(path.dirname(fs.realpathSync(__filename)), 'lib'),
    cssIsolate = require(lib + '/index.js'),
    argv = process.argv;

if (argv.length < 4) {
  console.log('Usage: cssIsolate cssFile1 cssFile2\n');
} else {

  var file1 = argv[2],
      file2 = argv[3];

  if (!fs.existsSync(file1)) {
    return console.log('First css file not found.\n');
  }

  if (!fs.existsSync(file2)) {
    return console.log('Second css file not found.\n');
  }

  var css1 = fs.readFileSync(file1, 'utf-8'),
      css2 = fs.readFileSync(file2, 'utf-8');

  //console.log('Finding unique declarations in css ...');
  var diffCss = cssIsolate.diff(css1, css2);

  console.log(diffCss);
}
