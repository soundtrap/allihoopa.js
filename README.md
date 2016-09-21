Allihoopa.js
============

[![Travis](https://img.shields.io/travis/allihoopa/allihoopa.js.svg?maxAge=2592000&style=flat-square)]()
[![npm](https://img.shields.io/npm/v/allihoopa.svg?maxAge=2592000&style=flat-square)]()

----

Javascript SDK to interface with [Allihoopa].

## Installation

You can use this SDK in three different ways. If you use e.g. Webpack or
Browserify, you can use the NPM module directly. We export [TypeScript] type
definitions, if you use it this way.

```bash
npm install --save allihoopa
```

If you have no build system but use React on your site, you can include the
library from our CDN. React 15.0.0 or later is required.

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/react/15.3.2/react.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/react/15.3.2/react-dom.min.js"></script>

<script src="https://ahcdn.se/sdk-dist/allihoopa-0.1.0.min.js"></script>
```

We also build a standalone version that wraps all dependencies required by our
SDK:

```html
<script src="https://ahcdn.se/sdk-dist/allihoopa-standalone-0.1.0.min.js"></script>
```


## Development setup

See the [example] folder for how to set up an interactive development
environment.


[Allihoopa]: https://allihoopa.com
[TypeScript]: https://www.typescriptlang.org
[example]: example/
