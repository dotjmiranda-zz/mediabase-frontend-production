<template>
  <div>
    <table class="post-table">
      <thead>
        <tr class="post-table-header">
          <th class="post-table-title">Title</th>
          <th class="post-table-count">Replies</th>
          <th class="post-table-last">Last Comment</th>
        </tr>
      </thead>

      <tbody>
        <tr class="post-table-data" v-for="post in posts" :key="post.id">
          <td class="post-table-title">
            <b-link :to="{ name: 'forum-posts', query: { id: post.id } }">
              {{ post.title }}
            </b-link>

            <br />

            <div class="post-table-info">
              by {{ post.username }} -

              <span class="post-table-info-date">{{
                $format_time(post.created_at)
              }}</span>
            </div>
          </td>
          <td class="post-table-count">
            {{ post.comments_count }}
          </td>
          <td class="post-table-last">
            {{ post.last_comment_user }}
            <br />
            <div v-if="post.last_comment_time">
              {{ $format_time(post.last_comment_time) }}
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "PostTable",
  props: ["posts"]
};
</script>

<style>
.post-table {
  width: 100%;
  border-collapse: collapse;
  text-align: center;
  display: table;
}

.post-table-header {
  background-color: #343a40;
  color: #fff;
  font-size: 18px;
}

.post-table-header th {
  height: 36px;
}

.post-table-data {
  border: 1px solid #e0e0e0;
  border-top: 0 solid #e0e0e0;
}

.post-table-info {
  font-size: 14px;
}

.post-table-info-date {
  color: #858585;
}

.post-table-title {
}

.post-table-count {
  width: 70px;
}

.post-table-last {
  width: 160px;
}
</style>
