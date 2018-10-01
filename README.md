# Vue Prism Editor

<p align="center">


![version](https://img.shields.io/npm/v/vue-prism-editor.svg)
![npm bundle size (minified + gzip)](https://img.shields.io/bundlephobia/minzip/vue-prism-editor.svg)
[![GitHub](https://img.shields.io/github/license/mashape/apistatus.svg)](https://github.com/koca/vue-prism-editor)
[![CircleCI branch](https://circleci.com/gh/koca/vue-prism-editor/tree/master.svg?style=shield)](https://circleci.com/gh/koca/vue-prism-editor/tree/master)
<!-- ![Codecov](https://img.shields.io/codecov/c/github/koca/vue-prism-editor.svg) -->

</p>

> A dead simple code editor with syntax highlighting and line numbers. 7kb/gz

## Demo

[prism-editor.netlify.com](https://prism-editor.netlify.com/)

## Examples
  
 * Codesandbox: [https://codesandbox.io/s/61yrlnlnmn](https://codesandbox.io/s/61yrlnlnmn)
 * Codepen: [https://codepen.io/koca/pen/QVgqyR](https://codepen.io/koca/pen/QVgqyR)

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
import "vue-prism-editor/dist/VuePrismEditor.css"; // import the styles
Vue.component("prism-editor", VuePrismEditor);
```

Browser usage:

```html
<!-- vue-prism-editor JavaScript -->
<script src="https://unpkg.com/vue-prism-editor"></script>

<!-- vue-prism-editor CSS -->
<link rel="stylesheet" href="https://unpkg.com/vue-prism-editor/dist/VuePrismEditor.css">

<!-- use -->
<script>
Vue.component('vue-prism-editor', VuePrismEditor)
new Vue({
    el: '#app'
})
</script>
```

## Prismjs

This package won't install Prismjs. If you use Prismjs already skip this step. If not you need to load Prismjs somewhere in your app:

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

## Props

| Name                 | Type      | Default | Options                              | Description                                           |
| -------------------- | --------- | ------- | ------------------------------------ | ----------------------------------------------------- |
| v-model              | `string`  | -       | -                                    | for the `code` prop below                             |
| code                 | `string`  | `""`    | -                                    | the code                                              |
| language             | `String`  | `"js"`  | `vue,html,md,ts` + Prismjs Languages | language of the code                                  |
| lineNumbers          | `Boolean` | `false` | -                                    | Whether to show line numbers or not                   |
| readonly             | `Boolean` | `false` | -                                    | Indicates if the editor is read only or not.          |
| emitEvents           | `Boolean` | `false` | -                                    | Indicates if the editor should emit events.           |
| autoStyleLineNumbers | `Boolean` | `true`  | -                                    | Allow the line number to be styled by this component. |

## Events

| Name   | Parameters | Description                     |
| ------ | ---------- | ------------------------------- |
| change | `(code)`   | Fires when the code is changed. |

The events below won't be fired unless you set the `emitEvents` prop to `true`.

| Name         | Parameters | Description                                                                 |
| ------------ | ---------- | --------------------------------------------------------------------------- |
| keydown      | `(event)`  | This event is emitted when a keydown event happens in editor                |
| keyup        | `(event)`  | This event is emitted when a keyup event happens in editor                  |
| editor-click | `(event)`  | This event is emitted  when clicking anywhere in the contenteditable editor |

## Thanks

inspired by [react-live](https://github.com/FormidableLabs/react-live).

## License

MIT
