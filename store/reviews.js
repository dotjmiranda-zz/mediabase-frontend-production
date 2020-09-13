export const state = () => ({
  selectedRating: null,
  reviews: []
});

export const mutations = {
  SET_RATING(state, value) {
    state.selectedRating = value;
  },
  SET_REVIEWS(state, reviews) {
    state.reviews = reviews;
  }
};

export const actions = {
  async submitReview(
    context,
    { user_id, username, media_id, content, rating }
  ) {
    await this.$axios.post(`api/reviews`, {
      user_id: user_id,
      username: username,
      media_id: media_id,
      content: content,
      rating: rating
    });
    await this.$router.push(`/movies/${media_id}`);
  },
  async loadReviews({ commit }) {
    await this.$axios.get(`api/reviews`).then(response => {
      commit("SET_REVIEWS", response.data);
    });
  },
  async loadMediaReviews({ commit }, media_id) {
    await this.$axios
      .get(`api/reviews/index_media`, {
        params: {
          media_id: media_id
        }
      })
      .then(response => {
        commit("SET_REVIEWS", response.data);
      });
  },
  async loadUserReviews({ commit }, user_id) {
    await this.$axios
      .get(`api/reviews/index_user`, {
        params: {
          user_id: user_id
        }
      })
      .then(response => {
        commit("SET_REVIEWS", response.data);
      });
  }
};

export const getters = {};
