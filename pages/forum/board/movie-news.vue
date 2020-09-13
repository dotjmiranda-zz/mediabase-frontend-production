<template>
  <div>
    <Board title="Movie News" id="1" :posts="posts"></Board>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  async fetch({ store, route }) {
    await store.dispatch("forum/loadCategoryPosts", 1);
  },
  computed: {
    ...mapGetters({
      posts: "forum/sortedByDate"
    })
  }
};
</script>

<style></style>
