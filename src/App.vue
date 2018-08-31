<template>
  <div id="app">
    <Editor class="editor" language="js" :code="code"></Editor>
  </div>
</template>

<script>
import "prismjs";
import Editor from "./components/Editor.vue";

export default {
  name: "app",
  components: {
    Editor
  },
  data: () => ({
    code: `console.log('type some javascript')`
  })
};
</script>

<style>
</style>
