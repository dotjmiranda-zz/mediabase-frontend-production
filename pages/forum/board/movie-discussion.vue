<template>
  <div>
    <Board title="Movie Discussion" id="3" :posts="posts"></Board>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  async fetch({ store, route }) {
    await store.dispatch("forum/loadCategoryPosts", 3);
  },
  computed: {
    ...mapGetters({
      posts: "forum/sortedByDate"
    })
  }
};
</script>

<style></style>
