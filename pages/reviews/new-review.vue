<template>
  <div>
    <b-container>
      <div class="new-review">
        <h4 class="h4">New Review</h4>

        <div class="row">
          <div class="col-9">
            <b-form-textarea
              class="new-post-content"
              rows="4"
              no-resize
              placeholder="Text"
              v-model="content"
            ></b-form-textarea>
          </div>

          <div class="col-3">
            <h5 class="h5">Rating</h5>

            <b-form-select
              @input="updateRating"
              :value="selectedRating"
              :options="rating"
            ></b-form-select>
          </div>
        </div>

        <div class="row">
          <div class="col-12">
            <b-button variant="dark" @click="submitReview">Submit</b-button>
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
      content: "",
      rating: [
        { value: null, text: "Select a score" },
        { value: 10, text: "(10) Masterpiece" },
        { value: 9, text: "(9) Amazing" },
        { value: 8, text: "(8) Great" },
        { value: 7, text: "(7) Good" },
        { value: 6, text: "(6) Fine" },
        { value: 5, text: "(5) Average" },
        { value: 4, text: "(4) Bad" },
        { value: 3, text: "(3) Awful" },
        { value: 2, text: "(2) Horrible" },
        { value: 1, text: "(1) Atrocious" }
      ]
    };
  },
  computed: {
    ...mapState({
      selectedRating: state => state.reviews.selectedRating
    })
  },
  methods: {
    updateRating(value) {
      this.$store.commit("reviews/SET_RATING", value);
    },
    submitReview() {
      this.$store.dispatch("reviews/submitReview", {
        user_id: this.$auth.user.id,
        username: this.$auth.user.username,
        media_id: this.$route.query.media_id,
        content: this.content,
        rating: this.selectedRating
      });
    }
  }
};
</script>

<style>
.new-review {
  margin-top: 20px;
}

button {
  margin-top: 20px;
}
</style>
