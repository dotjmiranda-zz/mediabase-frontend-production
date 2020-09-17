<template>
  <div>
    <Header
      v-if="$auth.loggedIn"
      :title="welcomeMsg + $auth.user.username"
    ></Header>

    <Header v-else title="Welcome to Mediabase"></Header>

    <Spinner v-if="loading"></Spinner>

    <b-container v-if="!loading">
      <div class="row">
        <div class="col-12 section">
          <div class="row">
            <div class="col-12 section-content">
              <div class="h2 text-center">In Theaters</div>
            </div>
          </div>

          <div class="row">
            <div
              class="movie col-12 col-md-3"
              v-for="movie in movies"
              :key="movie.id"
            >
              <MovieSearchMovie :movie="movie" class="m-2"></MovieSearchMovie>
            </div>
          </div>
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
      welcomeMsg: "Welcome, ",
      loading: true
    };
  },
  async fetch({ store }) {
    await store.dispatch("movies/loadTheaterMovies");
  },
  computed: {
    ...mapState({
      movies: state => state.movies.moviesTheater
    })
  },
  methods: {
    isLoading() {
      if (this.movies) this.loading = false;
      else this.loading = true;
    }
  },
  mounted() {
    this.isLoading();
  }
};
</script>

<style>
.section {
  margin: 10px 0;
}

.section-content {
  margin: 10px 0;
}
</style>
