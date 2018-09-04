# Vue Prism Editor

> A dead simple code editor with syntax highlighting and line numbers. 7kb/gz

## Demo

[prism-editor.netlify.com](https://prism-editor.netlify.com/)

## Features

- Code Editing ^^
- Syntax highlighting
- Undo / Redo
- Copy / Paste
- The spaces/tabs of the previous line is preserved when a new line is added
- Works on mobile (thanks to contenteditable)
- Resize to parent width and height <sup>new</sup>
- Support for line numbers <sup>new</sup>
- Support for autosizing the editor <sup>new</sup>
- Autostyling the linenumbers(optional) <sup>new</sup>

## Use Case

The goal of this project is to have a simple code editor. You can use to make small changes of some content or you just need a textarea with syntax highlighting. That's what it's good for. If you need an advanced code editor use Codemirror or Monaco Editor.

## Install

```sh
npm install vue-prism-editor
```

or

```sh
yarn add vue-prism-editor
```

## Usage

Register the component locally and use it (recommended)

```html
<template>
  <prism-editor :code="code" language="js"></prism-editor>
</template>

<script>
import PrismEditor from 'vue-prism-editor'
export default {
  components: {
    PrismEditor
  }
}
</script>
```

Or register the component globally in `main.js`

```js
import VuePrismEditor from "vue-prism-editor";
import "vue-prism-editor/dist/vuePrismEditor.css"; // import the styles
Vue.component("prism-editor", VuePrismEditor);
```

Browser usage:

```html
<!-- vue-prism-editor JavaScript -->
<script src="https://unpkg.com/vue-prism-editor"></script>

<!-- vue-prism-editor CSS -->
<link rel="stylesheet" href="https://unpkg.com/vue-prism-editor/dist/vuePrismEditor.css">

<!-- use -->
<script>
Vue.component('vue-prism-editor', VuePrismEditor)
new Vue({
    el: '#app'
})
</script>
```

## Prismjs

This package won't install prismjs if you use prismjs already skip this step if not you need to load Prism somewhere in your app:

```js
// yarn add prismjs
import "prismjs";
import "prismjs/themes/prism.css";
```

OR:

```html
<link rel="stylesheet" href="https://unpkg.com/prismjs/themes/prism.css" />
<script src="https://unpkg.com/prismjs"></script>
```

## Options

_todo_

## Dependencies

- [prismjs](https://ghub.io/prismjs): Lightweight, robust, elegant syntax highlighting. A spin-off project from Dabblet.
- [vue](https://ghub.io/vue): Reactive, component-oriented view layer for modern web interfaces.

## Thanks

inspired by [react-live](https://github.com/FormidableLabs/react-live).

## License

MIT
