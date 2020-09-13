<template>
  <div class="review">
    <div class="review-header">
      <div class="row review-heading justify-content-between">
        <div class="col-6">
          <b-link
            :to="{
              name: 'profile-username',
              params: { username: review.username }
            }"
          >
            {{ review.username }}
          </b-link>
        </div>

        <div class="col-6">
          <div class="float-right">Rating: {{ review.rating }}</div>
        </div>
      </div>

      <div class="row review-time">
        <div class="col-12">
          {{ $format_time(review.created_at) }}
        </div>
      </div>

      <div class="row review-content">
        <div class="col-12">
          <div class="content">{{ review.content }}</div>
        </div>
      </div>

      <div class="row">
        <div class="col-12">
          <b-link
            v-if="
              !like &&
                this.$auth.loggedIn &&
                this.$auth.user.id != review.user_id
            "
            @click="likeReview()"
          >
            <b-icon-hand-thumbs-up></b-icon-hand-thumbs-up>Helpful?
          </b-link>
          <b-link v-else-if="like && $auth.loggedIn" @click="dislikeReview()">
            <b-icon-hand-thumbs-down></b-icon-hand-thumbs-down>Not helpful?
          </b-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Review",
  props: ["review"],
  data() {
    return {
      like: []
    };
  },
  methods: {
    async checkLike() {
      if (this.$auth.loggedIn) {
        await this.$axios
          .get(`api/likes/show_user`, {
            params: {
              user_id: this.$auth.user.id,
              review_id: this.review.id
            }
          })
          .then(response => {
            this.like = response.data;
          });
      }
    },
    async likeReview() {
      if (this.$auth.loggedIn) {
        await this.$axios.post(`api/likes`, {
          user_id: this.$auth.user.id,
          review_id: this.review.id
        });
        this.checkLike();
      }
    },
    async dislikeReview() {
      if (this.$auth.loggedIn) {
        await this.$axios.delete(`api/likes/${this.like.id}`);
        this.checkLike();
      }
    }
  },
  mounted() {
    this.checkLike();
  }
};
</script>

<style>
.review {
  padding: 10px 0;
  border-top: 1px solid #343a40;
}

.review-heading a {
  font-size: 1.25rem;
}

.review-time {
  color: #a7a7a7;
  margin-bottom: 5px;
}
</style>
