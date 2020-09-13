<template>
  <div>
    <div v-if="loading">
      <Spinner></Spinner>
    </div>

    <div v-if="!loading">
      <Header title="Top Movies"></Header>

      <div class="table-container">
        <MovieTable :movies="movies"></MovieTable>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      loading: true
    };
  },
  methods: {
    isLoading() {
      if (this.movies) this.loading = false;
      else this.loading = true;
    }
  },
  async fetch({ store }) {
    await store.dispatch("movies/loadTopMovies");
  },
  computed: {
    ...mapState({
      movies: state => state.movies.moviesTop
    })
  },
  mounted() {
    this.isLoading();
  }
};
</script>

<style scoped>
@media only screen and (min-width: 768px) {
  .table-container {
    width: 100%;
    padding: 0 100px;
    margin: 0 auto;
  }
}
</style>
