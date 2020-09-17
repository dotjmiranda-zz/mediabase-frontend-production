<template>
  <div>
    <div class="row">
      <div class="col-12">
        <div class="row align-items-center">
          <div class="col-3 col-md-2 col-lg-1 text-center">
            <div class="comment-avatar">
              <b-avatar v-if="!commentUserProfile.avatar"></b-avatar>

              <b-avatar v-else :src="commentUserProfile.avatar"></b-avatar>
            </div>
          </div>

          <div class="col-6 col-md-8 col-lg-9">
            <div class="font-weight-bold">
              {{ commentUser.username }}
            </div>

            <div v-if="$time_diff(comment.created_at).dayFlag === true">
              {{ $time_diff(comment.created_at).time }} day(s) ago
            </div>
            <div v-if="$time_diff(comment.created_at).hourFlag === true">
              {{ $time_diff(comment.created_at).time }} hour(s) ago
            </div>
            <div v-if="$time_diff(comment.created_at).minuteFlag === true">
              {{ $time_diff(comment.created_at).time }} minute(s) ago
            </div>
          </div>

          <div class="col-1 col-md-2 d-md-none">
            <b-dropdown
              v-if="
                this.$auth.loggedIn &&
                  (this.$auth.user.id === comment.user_id ||
                    this.$auth.user.admin)
              "
              right
              size="lg"
              variant="link"
              toggle-class="text-decoration-none"
              no-caret
            >
              <template v-slot:button-content>
                <b-icon-three-dots-vertical
                  class="comment-options"
                ></b-icon-three-dots-vertical>
              </template>

              <b-dropdown-item
                v-if="
                  this.$auth.loggedIn &&
                    (this.$auth.user.id === comment.user_id ||
                      this.$auth.user.admin ||
                      this.$auth.user.moderator)
                "
                @click="deleteComment()"
                >Delete</b-dropdown-item
              >
            </b-dropdown>
          </div>

          <div class="col-md-2 d-none d-md-block">
            <b-button
              v-if="
                this.$auth.loggedIn &&
                  (this.$auth.user.id === comment.user_id ||
                    this.$auth.user.admin ||
                    this.$auth.user.moderator)
              "
              class="float-right"
              pill
              size="sm"
              @click="deleteComment()"
            >
              Delete
            </b-button>
          </div>
        </div>

        <div class="row">
          <div class="col-12">
            <div>
              <p class="content">{{ comment.content }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PostComment",
  props: ["comment"],
  data() {
    return {
      commentUser: [],
      commentUserProfile: []
    };
  },
  async fetch() {
    this.commentUser = await this.$axios
      .get(`api/users/${this.comment.user_id}`)
      .then(response => response.data);

    this.commentUserProfile = await this.$axios
      .get(`api/profiles/${this.comment.username}`)
      .then(response => response.data);
  },
  methods: {
    async deleteComment() {
      await this.$axios.delete(`api/comments/${this.comment.id}`);
      await this.$store.dispatch("forum/loadPost", this.$route.query.id);
    }
  }
};
</script>

<style>
@media only screen and (min-width: 768px) {
  .comment-avatar .b-avatar {
    width: 60px !important;
    height: 60px !important;
  }
}

.row {
  padding: 4px 0;
}

.comment-options {
  color: #000;
}
</style>
