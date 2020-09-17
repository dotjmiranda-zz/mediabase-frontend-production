<template>
  <div>
    <b-container fluid="md" class="post">
      <div class="row">
        <div class="col-12">
          <div v class="row align-items-center">
            <div class="col-3 col-md-2 col-lg-1 text-center">
              <div class="post-avatar">
                <b-avatar v-if="!postUserProfile.avatar"></b-avatar>

                <b-avatar v-else :src="postUserProfile.avatar"></b-avatar>
              </div>
            </div>

            <div class="col-6 col-md-7 col-lg-8">
              <div class="post-username font-weight-bold">
                {{ postUser.username }}
              </div>

              <div v-if="$time_diff(post.created_at).dayFlag === true">
                {{ $time_diff(post.created_at).time }} day(s) ago
              </div>
              <div v-if="$time_diff(post.created_at).minuteFlag === true">
                {{ $time_diff(post.created_at).time }} minute(s) ago
              </div>
              <div v-if="$time_diff(post.created_at).hourFlag === true">
                {{ $time_diff(post.created_at).time }} hour(s) ago
              </div>
            </div>

            <div class="col-1 col-md-2 d-md-none">
              <b-dropdown
                v-if="this.$auth.loggedIn"
                right
                size="lg"
                variant="link"
                toggle-class="text-decoration-none"
                no-caret
              >
                <template v-slot:button-content>
                  <b-icon-three-dots-vertical
                    class="post-options"
                  ></b-icon-three-dots-vertical>
                </template>

                <b-dropdown-item href="#reply-form">Reply</b-dropdown-item>

                <b-dropdown-item
                  v-if="
                    this.$auth.loggedIn &&
                      (this.$auth.user.id === post.user_id ||
                        this.$auth.user.admin)
                  "
                  :to="{
                    name: 'forum-posts-edit-post',
                    query: { id: post.id }
                  }"
                  >Edit</b-dropdown-item
                >

                <b-dropdown-item
                  v-if="
                    (this.$auth.loggedIn &&
                      (this.$auth.user.id === post.user_id ||
                        this.$auth.user.admin)) ||
                      this.$auth.user.moderator
                  "
                  @click="deletePost()"
                  >Delete</b-dropdown-item
                >
              </b-dropdown>
            </div>

            <div class="col-md-3 d-none d-md-block">
              <b-button
                v-if="
                  this.$auth.loggedIn &&
                    (this.$auth.user.id === post.user_id ||
                      this.$auth.user.admin ||
                      this.$auth.user.moderator)
                "
                class="float-right"
                pill
                size="sm"
                href=""
                @click="deletePost()"
              >
                Delete
              </b-button>

              <b-button
                v-if="
                  this.$auth.loggedIn && this.$auth.user.id === post.user_id
                "
                class="float-right"
                pill
                size="sm"
                :to="{ name: 'forum-posts-edit-post', query: { id: post.id } }"
              >
                Edit
              </b-button>

              <b-button
                v-if="this.$auth.loggedIn"
                class="float-right"
                pill
                size="sm"
                href="#reply-form"
              >
                Reply
              </b-button>
            </div>
          </div>

          <div class="row">
            <div class="col-12">
              <div class="post-title">
                <h4 class="h4 font-weight-bold">{{ post.title }}</h4>
              </div>

              <div>
                <span class="content">{{ post.content }}</span>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-12">
              <b-form-textarea
                id="reply-form"
                rows="2"
                no-resize
                placeholder="Comment..."
                v-model="replyContent"
              ></b-form-textarea>
            </div>
          </div>

          <div class="row">
            <div class="col-12">
              <b-button
                size="sm"
                class="reply-button"
                variant="dark"
                @click="submitComment"
                >Submit</b-button
              >
            </div>
          </div>

          <div class="row">
            <div class="col-12">
              <div v-if="post.comments.length > 0" class="font-weight-bold">
                Comments ({{ post.comments.length }})
              </div>
            </div>
          </div>

          <div v-for="comment in post.comments" :key="comment.id">
            <PostComment :comment="comment"></PostComment>
          </div>
        </div>
      </div>
    </b-container>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      replyContent: ""
    };
  },
  async fetch({ store, route }) {
    await store.dispatch("forum/loadPost", route.query.id);
    await store.dispatch("forum/loadPostUser", store.state.forum.post.user_id);
    await store.dispatch(
      "user/loadProfile",
      store.state.forum.postUser.username
    );
  },
  computed: {
    ...mapState({
      post: state => state.forum.post,
      postUser: state => state.forum.postUser,
      postUserProfile: state => state.user.profile
    })
  },
  methods: {
    format_time(date) {
      var datetime = new Date(date);

      return datetime.toLocaleString("en-GB");
    },
    async submitComment() {
      await this.$auth.fetchUser();
      if (this.$auth.user) {
        await this.$axios.post(`api/comments`, {
          id: this.$route.query.id,
          user_id: this.$auth.user.id,
          username: this.$auth.user.username,
          content: this.replyContent
        });
        await this.$store.dispatch("forum/loadPost", this.$route.query.id);
        this.replyContent = "";
      } else {
        this.$toast.error("You need to be signed in to comment");
      }
    },
    async deletePost() {
      await this.$axios.delete(`api/posts/${this.post.id}`);
      await this.$router.push("/forum");
    }
  }
};
</script>

<style scoped>
.post .row {
  padding: 4px 0;
}

.post-username {
}

.post-options {
  color: #000;
}

@media only screen and (min-width: 768px) {
  .post {
    margin-top: 20px;
  }

  .post-avatar .b-avatar {
    width: 60px !important;
    height: 60px !important;
  }
}
</style>
