<template>
  <div>
    <Board title="Movies General Discussion" id="2" :posts="posts"></Board>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  async fetch({ store, route }) {
    await store.dispatch("forum/loadCategoryPosts", 2);
  },
  computed: {
    ...mapGetters({
      posts: "forum/sortedByDate"
    })
  }
};
</script>

<style></style>
