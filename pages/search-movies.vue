<template>
  <div>
    <div class="row search justify-content-center">
      <div class="col-10 col-md-4">
        <b-form-input
          v-model="search"
          id="search"
          type="search"
          size="lg"
          placeholder="Search movie..."
          v-on:keyup.enter="searchMovies()"
        ></b-form-input>
      </div>
    </div>

    <Spinner v-if="loading"></Spinner>

    <b-container fluid v-if="!loading">
      <div class="row">
        <div
          class="movie col-12 col-md-3"
          v-for="movie in moviesSearch"
          :key="movie.id"
        >
          <MovieSearchMovie :movie="movie" class="m-2"></MovieSearchMovie>
        </div>
      </div>
    </b-container>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      movies: [],
      search: "",
      loading: false
    };
  },
  methods: {
    async searchMovies() {
      this.loading = true;
      await this.$store.dispatch("movies/loadSearchMovies", this.search);
      this.loading = false;
    }
  },
  computed: {
    ...mapState({
      moviesSearch: state => state.movies.moviesSearch
    })
  }
};
</script>

<style>
.search {
  margin: 15px 0 10px 0;
}

.search label {
  text-align: center;
}

@media only screen and (min-width: 768px) {
  .search {
    margin: 20px 0 10px 0;
  }
}
</style>
