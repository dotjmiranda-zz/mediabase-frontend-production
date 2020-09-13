//const IMDB_KEY = "k_25J4cc8C";
//const IMDB_KEY = "k_4yHWUz7e";
const IMDB_KEY = "k_c653191a";

export const state = () => ({
  moviesTheater: [],
  moviesSearch: [],
  moviesTop: [],
  moviesUpcoming: [],
  movie: []
});

export const mutations = {
  SET_MOVIE(state, movie) {
    state.movie = movie;
  },
  SET_MOVIES_THEATER(state, movies) {
    state.moviesTheater = movies;
  },
  SET_MOVIES_SEARCH(state, movies) {
    state.moviesSearch = movies;
  },
  SET_MOVIES_TOP(state, movies) {
    state.moviesTop = movies;
  },
  SET_MOVIES_UPCOMING(state, movies) {
    state.moviesUpcoming = movies;
  }
};

export const actions = {
  // LOAD THEATER MOVIES METHOD
  async loadTheaterMovies({ commit }) {
    await this.$axios.get(`API/InTheaters/${IMDB_KEY}`).then(response => {
      commit("SET_MOVIES_THEATER", response.data.items);
    });
  },
  // LOAD SEARCH MOVIES METHOD
  async loadSearchMovies({ commit }, search) {
    await this.$axios
      .get(`API/SearchMovie/${IMDB_KEY}/${search}`)
      .then(response => {
        commit("SET_MOVIES_SEARCH", response.data.results);
      });
  },
  // LOAD TOP MOVIES METHOD
  async loadTopMovies({ commit }) {
    await this.$axios.get(`api/movie_scores`).then(response => {
      commit("SET_MOVIES_TOP", response.data);
    });
  },
  // LOAD UPCOMING MOVIES IMDB METHOD
  async loadUpcomingMovies({ commit }) {
    await this.$axios.get(`API/ComingSoon/${IMDB_KEY}`).then(response => {
      commit("SET_MOVIES_UPCOMING", response.data.items);
    });
  },
  // LOAD MOVIE IMDB METHOD
  async loadMovie({ commit }, movieId) {
    await this.$axios.get(`API/Title/${IMDB_KEY}/${movieId}`).then(response => {
      commit("SET_MOVIE", response.data);
    });
  }
};
