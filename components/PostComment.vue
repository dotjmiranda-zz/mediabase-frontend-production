<template>
  <div>
    <div class="row">
      <div class="col-12">
        <div class="row align-items-center">
          <div class="col-3 col-md-2 col-lg-1 text-center">
            <div class="comment-avatar">
              <b-avatar
                src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"
              ></b-avatar>
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
                      this.$auth.user.admin)
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
                    this.$auth.user.admin)
              "
              class="float-right"
              pill
              size="sm"
              @click="deletePost()"
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
  <!-- <div class="row">
    <div class="col-12">
      <div
        class="row  comment-header justify-content-between align-items-center"
      >
        <div class="col-4 col-sm-4 col-md-6">
          {{ $format_time(comment.created_at) }}
        </div>

        <div class="col-8 col-sm-8 col-md-6">
          <b-button c   lass="float-right" pill size="sm" @click="deleteComment()">
            Delete
          </b-button>

          <b-button class="float-right" pill size="sm">
            Edit
          </b-button>
        </div>
      </div>

      <div class="row comment">
        <div class="col-2 text-center comment-user">
          <div class="row">
            <div class="col-12">
              {{ comment.username }}
            </div>
          </div>

          <div class="row">
            <div class="col-12">
              <b-avatar
                style="width: 80px; height: 80px;"
                src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"
              ></b-avatar>
            </div>
          </div>

          <div class="row">
            <div class="col-12">Posts: {{ commentUser.comments_count }}</div>
          </div>
        </div>

        <div class="col-10">
          <div class="comment-content content">{{ comment.content }}</div>
        </div>
      </div>
    </div>
  </div> -->
</template>

<script>
export default {
  name: "PostComment",
  props: ["comment"],
  data() {
    return {
      commentUser: []
    };
  },
  async fetch() {
    this.commentUser = await this.$axios
      .get(`api/users/${this.comment.user_id}`)
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
/* .comment {
  border: 1px solid #e0e0e0;
  border-top: 0 solid #e0e0e0;
}

.comment-header {
  height: 40px;
  background-color: #464b50;
  color: #fff;
  font-weight: bold;
}

.comment-user {
  display: table-cell;
  padding: 12px 12px;
  width: 120px;
  text-align: center;
  background-color: #e0e0e0;
}

.comment-user-count {
  font-size: 12px;
}

.comment-content {
  padding: 4px 0;
  display: table-cell;
} */
</style>
