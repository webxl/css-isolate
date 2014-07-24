# css-isolate [![Build Status](https://secure.travis-ci.org/webxl/css-isolate.png?branch=master)](http://travis-ci.org/webxl/css-isolate)

> Isolate CSS declaration differences between 2 files/strings within the context of their rules in order to produce a set of overrides. Useful for creating themes.


## Getting Started

Install the module with: `npm install css-isolate`

```js
var cssIsolate = require('css-isolate');
var s1 = '.a { color: blue; font-size: 12px; }';
var s2 = '.a { color: red; font-size: 12px; }';
cssIsolate.diff(s1,s2); //'.a{color:red;}'
```

Install with cli command

```sh
$ npm install -g css-isolate
$ cssIsolate main.css main-variant.css > variant-overrides.css
```


## Documentation

_(Coming soon)_


## Examples

_(Coming soon)_


## Contributing

In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com).


## License

Copyright (c) 2014 Matt Motherway  
Licensed under the MIT license.
