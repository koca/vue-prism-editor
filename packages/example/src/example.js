// eslint-ignore
export default `<template>
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
</script>
<style>
#app {
  color: #2ecc71
}
</style>`;
