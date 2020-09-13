<template>
  <div class="error">
    <h1>Error {{ error.statusCode }}</h1>
    <h2>{{ error.message }}</h2>
  </div>
</template>

<script>
export default {
  props: ["error"]
};
</script>

<style scoped>
.error {
  padding: 1rem;
  color: #47494e;
  text-align: center;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  font-family: sans-serif;
  font-weight: 100 !important;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -webkit-font-smoothing: antialiased;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

h1 {
  font-size: 48px;
}

h2 {
  font-size: 24px;
}

@media only screen and (min-width: 768px) {
  h1 {
    font-size: 144px;
  }

  h2 {
    font-size: 72px;
  }
}
</style>
