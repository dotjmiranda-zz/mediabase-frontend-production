<template>
  <div>
    <b-container class="edit-post">
      <div class="row">
        <div class="col-12">
          <h4 class="h4">Title</h4>
        </div>
      </div>

      <div class="row">
        <div class="col-12">
          <b-form-input
            class="edit-post-title"
            id="title"
            :value="post.title"
            @input="updateTitle"
            placeholder="Title"
          ></b-form-input>
        </div>
      </div>

      <div class="row">
        <div class="col-12">
          <h4 class="h4">Content</h4>
        </div>
      </div>

      <div class="row">
        <div class="col-12">
          <b-form-textarea
            class="new-post-content"
            rows="4"
            no-resize
            placeholder="Text"
            :value="post.content"
            @input="updateContent"
          ></b-form-textarea>
        </div>
      </div>

      <div class="row">
        <div class="col-12">
          <b-button variant="dark" @click="updatePost">Update</b-button>
        </div>
      </div>
    </b-container>
  </div>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";

export default {
  middleware: "auth",
  async fetch({ store, route, error }) {
    await store.dispatch("forum/loadPost", route.query.id).catch(e => {});
  },
  computed: {
    ...mapState({
      postUser: state => state.forum.postUser,
      post: state => state.forum.post
    })
  },
  methods: {
    updateTitle(value) {
      this.$store.commit("forum/UPDATE_TITLE", value);
    },
    updateContent(value) {
      this.$store.commit("forum/UPDATE_CONTENT", value);
    },
    async updatePost() {
      await this.$axios.put(`api/posts/id=${this.post.id}`, {
        post: this.post
      });
      await this.$router.push(`/forum/posts?id=${this.$route.query.id}`);
    }
  },
  mounted() {
    if (this.post.user_id != this.$auth.user.id) {
      this.$router.push("/");
    }
  }
};
</script>

<style scoped>
.edit-post {
  margin-top: 20px;
}
</style>
