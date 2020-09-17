export const state = () => ({
  users: [],
  user: []
});

export const mutations = {
  SET_USERS(state, users) {
    state.users = users;
  },
  UPDATE_USERS(state, users) {
    state.users = users;
  }
};

export const actions = {
  async loadUsers({ commit }) {
    await this.$axios
      .get("api/users")
      .then(response => commit("SET_USERS", response.data));
  }
};

export const getters = {
  userList(state) {
    return JSON.parse(JSON.stringify(state.users));
  }
};
