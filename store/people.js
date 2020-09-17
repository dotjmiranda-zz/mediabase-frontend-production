const IMDB_KEY = "k_25J4cc8C";
//const IMDB_KEY = "k_4yHWUz7e";
//const IMDB_KEY = "k_c653191a";

export const state = () => ({
  person: []
});

export const mutations = {
  SET_PERSON(state, person) {
    state.person = person;
  }
};

export const actions = {
  // LOAD PERSON IMDB METHOD
  async loadPerson({ commit }, personId) {
    await this.$axios.get(`API/Name/${IMDB_KEY}/${personId}`).then(response => {
      commit("SET_PERSON", response.data);
    });
  }
};
