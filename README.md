Allihoopa.js
============

[![Travis](https://img.shields.io/travis/allihoopa/allihoopa.js/master.svg?maxAge=2592000&style=flat-square)]()
[![npm](https://img.shields.io/npm/v/allihoopa.svg?maxAge=2592000&style=flat-square)]()

----

> Javascript SDK to interface with [Allihoopa].

# Installation

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

<script src="https://ahcdn.se/sdk-dist/allihoopa-0.2.0.min.js"></script>
```

We also build a standalone version that wraps all dependencies required by our
SDK:

```html
<script src="https://ahcdn.se/sdk-dist/allihoopa-standalone-0.2.0.min.js"></script>
```


## Development setup

See the [example] folder for how to set up an interactive development
environment.


[Allihoopa]: https://allihoopa.com
[TypeScript]: https://www.typescriptlang.org
[example]: example/



# API Documentation

## Setting up the SDK

```javascript
Allihoopa.setup({
    appKey: '<app key>',
    appSecret: '<app secret>',
});
```

This must be called before any other API calls can be made. Provide the app key
and secret you got when you registered your app. If you're interested in getting
your app up and running with Allihoopa, contact us at
[info@allihoopa.com](mailto:info@allihoopa.com).


## Authenticating users

```javascript
Allihoopa.authenticate(function (successful) {
    if (successful) {
        // The user is now logged in
    } else {
        // The user canceled log in/sign up
    }
});
```

This opens a login/signup dialog where the user can authenticate with Allihoopa.

If the user is already logged in on Allihoopa, the dialog will immediately close
itself and the callback called with a successful response.

The callback will also be executed if the user cancels the log in flow, by e.g.
closing the window.
