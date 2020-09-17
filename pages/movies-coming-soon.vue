<template>
  <div>
    <Header title="Movies Coming Soon"></Header>

    <div v-if="loading">
      <Spinner></Spinner>
    </div>

    <div v-if="!loading">
      <b-container v-if="!loading">
        <div class="row">
          <div
            class="movie col-12 col-md-3"
            v-for="movie in moviesUpcoming"
            :key="movie.id"
          >
            <MovieSearchMovie :movie="movie" class="m-2"></MovieSearchMovie>
          </div>
        </div>
      </b-container>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      fields: ["title", "release_date"],
      loading: true
    };
  },
  methods: {
    /* linkGen(pageNum) {
      return pageNum === 1 ? "?" : `?page=${pageNum}`;
    }, */
    isLoading() {
      if (this.moviesUpcoming) this.loading = false;
      else this.loading = true;
    }
  },
  computed: {
    ...mapState("movies", {
      moviesUpcoming: state => state.moviesUpcoming
    })
  },
  async fetch({ store, route }) {
    await store.dispatch("movies/loadUpcomingMovies");
  },
  mounted() {
    this.isLoading();
  }
};
</script>

<style></style>
