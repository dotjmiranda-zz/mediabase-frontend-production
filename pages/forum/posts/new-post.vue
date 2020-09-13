<template>
  <div>
    <b-container class="new-post">
      <div class="row justify-content-center align-items-center">
        <div class="col-12 col-md-4">
          <h4 class="h4">New Post</h4>

          <b-form-input
            class="new-post-title"
            id="title"
            v-model="post.title"
            placeholder="Title"
          ></b-form-input>

          <b-form-textarea
            class="new-post-content"
            rows="4"
            no-resize
            placeholder="Text"
            v-model="post.content"
          ></b-form-textarea>

          <b-button variant="dark" @click="submitPost">Submit</b-button>
        </div>

        <div class="col-12 col-md-4">
          <div class="new-post-info">
            <div class="new-post-info-wrapper">
              <div class="new-post-info-title">
                Posting to Mediabase
              </div>

              <div>
                <div class="new-post-info-rule">
                  1. Remember we're all human
                </div>
                <div class="new-post-info-rule">
                  2. Behave like you would in real life
                </div>
                <div class="new-post-info-rule">
                  3. Search for duplicates before posting
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </b-container>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  middleware: "auth",
  data() {
    return {
      post: {
        title: "",
        content: ""
      }
    };
  },
  methods: {
    async submitPost() {
      await this.$axios
        .post(`api/posts`, {
          id: this.$route.query.id,
          user_id: this.$auth.user.id,
          username: this.$auth.user.username,
          title: this.post.title,
          content: this.post.content,
          media_id: this.$route.query.media_id
        })
        .then(response => {
          this.$router.push(`/forum/posts?id=${response.data.id}`);
        });
    }
  }
};
</script>

<style>
.new-post {
  margin-top: 20px;
}

.new-post-title {
  margin-bottom: 20px;
}

.new-post-content {
  margin-bottom: 20px;
}

.new-post-info {
  margin-top: 20px;
}

.new-post-info-wrapper {
  color: #fff;
  padding: 12px;
  background-color: #343a40;
  border-radius: 8px;
}

.new-post-info-title {
  font-size: 22px;
  font-weight: bold;
}

.new-post-info-rule {
  padding: 4px 0;
  border-bottom: #fff 1px solid;
}

@media only screen and (min-width: 768px) {
  .new-post-info {
    margin-top: 0;
  }
}
</style>
