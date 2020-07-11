<template>
  <div id="app" class="min-h-screen">
    <header class="header">
      <div class="hero py-8 sm:pt-24 text-center">
        <div class="hero-text font-mono text-xl w-64 sm:w-full mx-auto">
          <h1 class="text-2xl">Vue Prism Code Editor</h1>
          <h3 class="font-normal text-xl mt-4">
            A dead simple code editor with syntax highlighting and line numbers. 7kb/gz
          </h3>
        </div>
        <div class="hero-options my-8 w-64 max-w-sm sm:w-full mx-auto">
          <label for="ln" class="">
            <input type="checkbox" name="ln" v-model="lineNumbers" />
            Line Numbers
          </label>
          <label for="ln" class="ml-4">
            <input type="checkbox" name="ln" v-model="readonly" />
            Readonly
          </label>
        </div>
        <div class="hero-info">
          Documentation on
          <a href="https://github.com/koca/vue-prism-editor">Github</a>
        </div>
      </div>
    </header>
    <main class="main max-w-lg mx-auto my-0 p-0">
      <Editor
        class="my-editor"
        language="html"
        v-model="code"
        :highlight="highlight"
        :line-numbers="lineNumbers"
        :readonly="readonly"
      ></Editor>
    </main>
  </div>
</template>

<script>
import './assets/editorstyle.css';

import { PrismEditor } from 'vue-prism-editor';
import 'vue-prism-editor/dist/prismeditor.min.css';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-markup';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-css';

export default {
  name: 'App',
  components: {
    Editor: PrismEditor,
  },
  data: () => ({
    lineNumbers: true,
    readonly: false,
    /* eslint-disable */
    code: require('./example.js').default /* eslint-enable */,
  }),
  methods: {
    highlight(code) {
      return highlight(
        code,
        {
          ...languages['markup'],
          ...languages['js'],
          ...languages['css'],
        },
        'markup'
      );
    },
  },
};
</script>

<style>
.prism-editor__textarea:focus {
  outline: none;
}
.my-editor {
  background-color: #fafafa;
  max-height: 400px;
  font-family: Fira code, Fira Mono, Consolas, Menlo, Courier, monospace;
  font-size: 14px;
  line-height: 1.5;
  padding: 5px 10px;
}
</style>
