[js-list-spec](http://aureooms.github.io/js-list-spec)
====
[![Gitter](https://badges.gitter.im/Join Chat.svg)](https://gitter.im/aureooms/js-list-spec?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

List ADT specification code bricks for Javascript.

[![NPM license](http://img.shields.io/npm/l/aureooms-js-list-spec.svg?style=flat)](https://raw.githubusercontent.com/aureooms/js-list-spec/master/LICENSE)
[![NPM version](http://img.shields.io/npm/v/aureooms-js-list-spec.svg?style=flat)](https://www.npmjs.org/package/aureooms-js-list-spec)
[![Bower version](http://img.shields.io/bower/v/aureooms-js-list-spec.svg?style=flat)](http://bower.io/search/?q=aureooms-js-list-spec)
[![Build Status](http://img.shields.io/travis/aureooms/js-list-spec.svg?style=flat)](https://travis-ci.org/aureooms/js-list-spec)
[![Coverage Status](http://img.shields.io/coveralls/aureooms/js-list-spec.svg?style=flat)](https://coveralls.io/r/aureooms/js-list-spec)
[![Dependencies Status](http://img.shields.io/david/aureooms/js-list-spec.svg?style=flat)](https://david-dm.org/aureooms/js-list-spec#info=dependencies)
[![devDependencies Status](http://img.shields.io/david/dev/aureooms/js-list-spec.svg?style=flat)](https://david-dm.org/aureooms/js-list-spec#info=devDependencies)
[![Code Climate](http://img.shields.io/codeclimate/github/aureooms/js-list-spec.svg?style=flat)](https://codeclimate.com/github/aureooms/js-list-spec)
[![NPM downloads per month](http://img.shields.io/npm/dm/aureooms-js-list-spec.svg?style=flat)](https://www.npmjs.org/package/aureooms-js-list-spec)
[![GitHub issues](http://img.shields.io/github/issues/aureooms/js-list-spec.svg?style=flat)](https://github.com/aureooms/js-list-spec/issues)
[![Inline docs](http://inch-ci.org/github/aureooms/js-list-spec.svg?branch=master&style=shields)](http://inch-ci.org/github/aureooms/js-list-spec)

This repository provides easy methods to test the implementation of a list
abstract data type. The specification of such a data type will be provided in
[js-list-doc](http://aureooms.github.io/js-list-doc) later.

Currently, you can do the following to test your implementation,

```javascript
var spec = require( "aureooms-js-list-spec" ) ;
spec.test( "My list implementation" , MyListConstructor ) ;
```
