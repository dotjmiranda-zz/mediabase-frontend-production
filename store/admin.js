export const state = () => ({
  users: []
});

export const mutations = {
  SET_USERS(state, users) {
    state.users = users;
  }
};

export const actions = {
  async loadUsers({ commit }, users) {
    await this.$axios
      .get("api/users")
      .then(response => commit("SET_USERS", response.data));
  }
};
