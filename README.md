# AndcultureCode.JavaScript.Quill
<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-2-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->

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

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://mjones.network"><img src="https://avatars.githubusercontent.com/u/8648891?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Mat Jones</b></sub></a><br /><a href="https://github.com/AndcultureCode/AndcultureCode.JavaScript.Quill/commits?author=mrjones2014" title="Code">💻</a> <a href="https://github.com/AndcultureCode/AndcultureCode.JavaScript.Quill/commits?author=mrjones2014" title="Documentation">📖</a></td>
    <td align="center"><a href="https://github.com/brandongregoryscott"><img src="https://avatars.githubusercontent.com/u/11774799?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Brandon Scott</b></sub></a><br /><a href="https://github.com/AndcultureCode/AndcultureCode.JavaScript.Quill/pulls?q=is%3Apr+reviewed-by%3Abrandongregoryscott" title="Reviewed Pull Requests">👀</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!