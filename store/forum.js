export const state = () => ({
  posts: [],
  post: [],
  postUser: []
});

export const mutations = {
  SET_POSTS(state, posts) {
    state.posts = posts;
  },
  SET_POST(state, post) {
    state.post = post;
  },
  UPDATE_TITLE(state, value) {
    state.post.title = value;
  },
  UPDATE_CONTENT(state, value) {
    state.post.content = value;
  },
  SET_POST_USER(state, user) {
    state.postUser = user;
  }
};

export const actions = {
  async loadCategoryPosts({ commit }, id) {
    await this.$axios
      .get(`api/posts/index_category`, {
        params: {
          id: id
        }
      })
      .then(response => {
        commit("SET_POSTS", response.data);
      });
  },
  async loadPosts({ commit }) {
    await this.$axios.get(`api/posts`).then(response => {
      commit("SET_POSTS", response.data);
    });
  },
  async loadMediaPosts({ commit }, id) {
    await this.$axios
      .get(`api/posts/index_media`, {
        params: {
          id: id
        }
      })
      .then(response => {
        commit("SET_POSTS", response.data);
      });
  },
  async loadPost({ commit }, id) {
    await this.$axios.get(`api/posts/${id}`).then(response => {
      commit("SET_POST", response.data);
    });
  },
  async loadPostUser({ commit }, id) {
    await this.$axios.get(`api/users/${id}`).then(response => {
      commit("SET_POST_USER", response.data);
    });
  }
};

export const getters = {
  sortedByDate(state) {
    return state.posts
      .slice()
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .reverse();
  },
  samplePosts(state) {}
};
