# Usage

> :warning: The code needs a ES2015+ polyfill to run (`regeneratorRuntime`),
> for instance [regenerator-runtime/runtime](https://babeljs.io/docs/usage/polyfill).

First, require the polyfill at the entry point of your application
```js
await import( 'regenerator-runtime/runtime.js' ) ;
// or
import 'regenerator-runtime/runtime.js' ;
```

Then, import the library where needed
```js
const list_spec = await import( '@aureooms/js-list-spec' ) ;
// or
import * as list_spec from '@aureooms/js-list-spec' ;
```
