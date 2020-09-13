<template>
  <div class="spinner-parent d-flex justify-content-center mb-3">
    <b-spinner
      variant="primary"
      width="5"
      height="5"
      style="width: 5rem; height: 5rem;"
    ></b-spinner>
  </div>
</template>

<script>
export default {};
</script>

<style>
.spinner-parent {
  position: fixed;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  top: 0;
}
</style>
