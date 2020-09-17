const IMDB_KEY = "k_25J4cc8C";
//const IMDB_KEY = "k_4yHWUz7e";

export const state = () => ({
  seriesSearch: [],
  seriesTop: [],
  series: []
});

export const mutations = {
  SET_SERIES_SEARCH(state, series) {
    state.seriesSearch = series;
  },
  SET_SERIES_TOP(state, series) {
    state.seriesTop = series;
  },
  SET_SERIES(state, series) {
    state.series = series;
  }
};

export const actions = {
  async loadSearchSeries({ commit }, search) {
    await this.$axios
      .get(`API/SearchSeries/${IMDB_KEY}/${search}`)
      .then(response => {
        commit("SET_SERIES_SEARCH", response.data.results);
      });
  },
  async loadTopSeries({ commit }) {
    await this.$axios.get(`api/series_scores`).then(response => {
      commit("SET_SERIES_TOP", response.data);
    });
  },
  async loadSeries({ commit }, seriesId) {
    await this.$axios
      .get(`API/Title/${IMDB_KEY}/${seriesId}`)
      .then(response => {
        commit("SET_SERIES", response.data);
      });
  }
};
