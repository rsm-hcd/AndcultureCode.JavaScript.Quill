# AndcultureCode.JavaScript.Quill

[![Build Status](https://travis-ci.org/AndcultureCode/AndcultureCode.JavaScript.Quill.svg?branch=main)](https://travis-ci.org/AndcultureCode/AndcultureCode.JavaScript.Quill)

A collection of custom Quill.js modules, formats, and other utilities.

## Getting started

This package is installed via npm or yarn

```shell
# npm
npm install --save-dev andculturecode-javascript-quill

# yarn
yarn add andculturecode-javascript-quill --dev
```

From there you can import the variety of modules.

```typescript
import {
    ResizableImage,
    SetAltTextAction,
} from "andculturecode-javascript-quill";
```

You can also reference the global distribution package within a website which gives you access to the `AndcultureCodeQuill` namespace. See the example below

```html
<script src="https://unpkg.com/browse/andculturecode-javascript-quill@[version-number]/dist/global/index.js"></script>

<script>
    var quillConfig = {
        blotFormatter: {
            specs: [AndcultureCodeQuill.ImageSpec],
        },
    };
</script>
```

**NOTE** - This source code relies on several peer dependencies, most of which are not included in this bundled global distribution. You will likely want to reference these in your website prior to referencing the `andculture-javascript-quill` global package. See [test-global-distribution.html](./test-global-distribution.html) for the full list of dependencies. Also note that peer dependencies are only required if your code will be executing code paths that utilize any of those peer dependencies.

## Documentation

[Full API documentation](docs/README.md)

# Contributing

Information on contributing to this repo is in the [Contributing Guide](CONTRIBUTING.md)
