export const state = () => ({
  profile: [],
  movielist: [],
  movielist_entry: null,
  serieslist: [],
  serieslist_entry: null,
  selectedStatus: 1,
  selectedScore: null
});

export const mutations = {
  SET_PROFILE(state, profile) {
    state.profile = profile;
  },
  SET_MOVIELIST(state, movielist) {
    state.movielist = movielist;
  },
  SET_SERIESLIST(state, serieslist) {
    state.serieslist = serieslist;
  },
  SET_MOVIELIST_ENTRY(state, entry) {
    state.movielist_entry = entry;
  },
  SET_SERIESLIST_ENTRY(state, entry) {
    state.serieslist_entry = entry;
  },
  SET_STATUS(state, status) {
    state.selectedStatus = status;
  },
  SET_SCORE(state, score) {
    state.selectedScore = score;
  }
};

export const actions = {
  // LOAD PROFILE METHOD
  async loadProfile({ commit }, profileUsername) {
    let response = await this.$axios.$get(`api/profiles/${profileUsername}`);

    let profile = response;

    commit("SET_PROFILE", profile);
  },
  // LOAD USER'S MOVIELIST
  async loadMovielist({ commit }, profileUsername, sort, sortDir) {
    await this.$axios
      .get(`api/movie_watchlists/${profileUsername}`)
      .then(response => {
        commit("SET_MOVIELIST", response.data);
      });
  },
  // LOAD USER'S SERIESLIST
  async loadSerieslist({ commit }, profileUsername, sort, sortDir) {
    await this.$axios
      .get(`api/watchlist_series/${profileUsername}`)
      .then(response => {
        commit("SET_SERIESLIST", response.data);
      });
  },
  // LOAD MOVIELIST ENTRY
  async loadMovielistEntry({ commit }, data) {
    await this.$axios
      .get("api/movie_watchlists/show_entry", {
        params: {
          user_id: data.userID,
          movie_id: data.movieID
        }
      })
      .then(response => {
        if (response.data) {
          commit("SET_MOVIELIST_ENTRY", response.data);
          commit("SET_STATUS", response.data.status);
          commit("SET_SCORE", response.data.score);
        } else return;
      });
  },
  // LOAD SERIESLIST ENTRY
  async loadSerieslistEntry({ commit }, data) {
    await this.$axios
      .get("api/watchlist_series/show_entry", {
        params: {
          user_id: data.userID,
          series_id: data.seriesID
        }
      })
      .then(response => {
        if (response.data) {
          commit("SET_SERIESLIST_ENTRY", response.data);
          commit("SET_STATUS", response.data.status);
          commit("SET_SCORE", response.data.score);
        } else return;
      });
  },
  // UPDATE MOVIELIST ENTRY
  async updateMovielistEntry({ commit }, data) {
    await this.$axios
      .patch(`api/movie_watchlists/${data.id}`, {
        status: data.status,
        score: data.score
      })
      .then(response => {
        commit("SET_MOVIELIST_ENTRY", response.data);
      })
      .catch(error => {
        this.$toast.error("Unknown error has ocurred\n" + error);
      });
  },
  // UPDATE SERIESLIST ENTRY
  async updateSerieslistEntry({ commit }, data) {
    await this.$axios
      .patch(`api/watchlist_series/${data.id}`, {
        status: data.status,
        score: data.score
      })
      .then(response => {
        commit("SET_SERIESLIST_ENTRY", response.data);
      })
      .catch(error => {
        this.$toast.error("Unknown error has ocurred\n" + error);
      });
  }
};

export const getters = {
  meanScore(state, getters) {
    var sum = state.movielist.slice().reduce(function(a, b) {
      if (!isNaN(b.score)) {
        return a + b.score;
      } else {
        return a;
      }
    }, 0);
    return (sum / getters.completedMovies.length).toFixed(2);
  },
  completedMovies(state) {
    return state.movielist.slice().filter(movie => movie.status == 2);
  },
  plannedMovies(state) {
    return state.movielist.slice().filter(movie => movie.status == 1);
  },
  sortedByUpdateDate(state) {
    return state.movielist
      .slice()
      .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
  }
};
