[@aureooms/js-list-spec](https://aureooms.github.io/js-list-spec)
==

List ADT specification code bricks for Javascript. Parent is
[aureooms/js-data-structures](https://github.com/aureooms/js-data-structures).

```js
listspec.test( "My list implementation" , MyListConstructor ) ;
```

[![License](https://img.shields.io/github/license/aureooms/js-list-spec.svg?style=flat)](https://raw.githubusercontent.com/aureooms/js-list-spec/master/LICENSE)
[![NPM version](https://img.shields.io/npm/v/@aureooms/js-list-spec.svg?style=flat)](https://www.npmjs.org/package/@aureooms/js-list-spec)
[![Bower version](https://img.shields.io/bower/v/@aureooms/js-list-spec.svg?style=flat)](http://bower.io/search/?q=@aureooms/js-list-spec)
[![Build Status](https://img.shields.io/travis/aureooms/js-list-spec.svg?style=flat)](https://travis-ci.org/aureooms/js-list-spec)
[![Coverage Status](https://img.shields.io/coveralls/aureooms/js-list-spec.svg?style=flat)](https://coveralls.io/r/aureooms/js-list-spec)
[![Dependencies Status](https://img.shields.io/david/aureooms/js-list-spec.svg?style=flat)](https://david-dm.org/aureooms/js-list-spec#info=dependencies)
[![devDependencies Status](https://img.shields.io/david/dev/aureooms/js-list-spec.svg?style=flat)](https://david-dm.org/aureooms/js-list-spec#info=devDependencies)
[![Code Climate](https://img.shields.io/codeclimate/github/aureooms/js-list-spec.svg?style=flat)](https://codeclimate.com/github/aureooms/js-list-spec)
[![NPM downloads per month](https://img.shields.io/npm/dm/@aureooms/js-list-spec.svg?style=flat)](https://www.npmjs.org/package/@aureooms/js-list-spec)
[![GitHub issues](https://img.shields.io/github/issues/aureooms/js-list-spec.svg?style=flat)](https://github.com/aureooms/js-list-spec/issues)
[![Inline docs](http://inch-ci.org/github/aureooms/js-list-spec.svg?branch=master&style=shields)](http://inch-ci.org/github/aureooms/js-list-spec)

## Description

This repository provides easy methods to test the implementation of a list
abstract data type. The specification of such a data type will be provided in
[@aureooms/js-list-doc](https://aureooms.github.io/js-list-doc) later.

## Use

Currently, you can do the following to test your implementation:

```javascript
let spec = require( "@aureooms/js-list-spec" ) ;
spec.test( "My list implementation" , MyListConstructor ) ;
```
