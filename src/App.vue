<template>
  <div id="app" class="min-h-screen">
    <header class="header bg-white">
      <div class="hero py-8 sm:pt-24 text-center">
        <div class="hero-text font-mono text-xl w-64 sm:w-full mx-auto">
          <h1 class="text-2xl">Vue Prism Code Editor</h1>
          <h3 class="font-normal text-xl mt-4">A dead simple code editor with syntax highlighting and line numbers. 7kb/gz</h3>
        </div>
        <div class="hero-options my-8 w-64 max-w-sm sm:w-full mx-auto">
            <label for="ln" class="">
              <input type="checkbox" name="ln" v-model="lineNumbers">
              Line Numbers
            </label>
            <label for="ln" class="ml-4">
              <input type="checkbox" name="ln" v-model="readonly">
              Readonly
            </label>
        </div>
        <div class="hero-info">
          Documentation on <a href="https://github.com/koca/vue-prism-editor">Github</a>
        </div>
      </div>
    </header>
    <main class="main max-w-lg mx-auto my-0 p-0">
      <Editor
        class="my-editor"
        language="html"
        v-model="code"
        :line-numbers="lineNumbers"
        :readonly="readonly"
        ></Editor>
    </main>
  </div>
</template>

<script>
/* global Prism */
import "prismjs";
import "./assets/editorstyle.css";
// import "prismjs/themes/prism-tomorrow.css";
import Editor from "./components/Editor.vue";

export default {
  name: "app",
  components: {
    Editor
  },
  data: () => ({
    lineNumbers: true,
    readonly: false,
    /* eslint-disable */
    code: `<template>
  <div id="app">
    <p>{{ message }}</p>
    <input v-model="message">
  </div>
</template>
<script>
export default {
  data:() => ({
    message: 'Hello Vue!'
  })
}
<\/script>
<style>
#app {
  color: #2ecc71
}
</style>` /* eslint-enable */
  }),
  mounted() {
    console.log(Prism);
  }
};
</script>

<style>
.my-editor {
  max-height: 378px;
}
</style>
