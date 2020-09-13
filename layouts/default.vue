<template>
  <div id="app">
    <Navbar />
    <nuxt />
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {};
</script>

<style>
:root {
  --main-bg-color: #f5f5f5;
}

*,
*:before,
*:after {
  margin: 0;
}

html,
body {
  height: 100%;
  background-color: var(--main-bg-color);
}

body {
  font-family: Roboto, sans-serif;
}

.content {
  white-space: pre-line;
}
</style>
