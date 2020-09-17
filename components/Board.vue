<template>
  <div>
    <Header :title="title"></Header>

    <div class="board">
      <b-button
        squared
        variant="dark"
        style="margin-bottom: 10px;"
        :to="{
          name: 'forum-posts-new-post',
          query: { id: id }
        }"
      >
        New Post
      </b-button>

      <PostTable :posts="posts"></PostTable>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import PostTable from "@/components/PostTable.vue";

export default {
  components: {
    Header,
    PostTable
  },
  props: ["title", "id", "posts"]
};
</script>

<style>
.board {
  margin-top: 10px;
}

@media only screen and (min-width: 768px) {
  .board {
    margin: 0 auto;
  }
}
</style>
