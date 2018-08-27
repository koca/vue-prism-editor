<template>
  <div id="app">
    <Editor class="editor" language="js" :code="code"></Editor>
  </div>
</template>

<script>
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
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
#app {
  min-height: 100vh;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  background: #333;
}
.editor {
  height: 100vh;
  padding: 10px 0;
}
</style>
