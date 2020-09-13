<template>
  <div class="header">
    <h1 class="header-title">
      <strong>{{ title }}</strong>
    </h1>
  </div>
</template>

<script>
export default {
  name: "Header",
  props: ["title"]
};
</script>

<style scoped>
.header {
  padding: 10px 5px 5px 15px;
  background-color: #e0e0e0;
  border-bottom: #343a40 1px solid;
}

.header-title {
  font-size: 1.25rem;
}

@media only screen and (min-width: 768px) {
  .header {
    margin-bottom: 20px;
  }

  .header-title {
    font-size: 1.75rem;
  }
}
</style>
