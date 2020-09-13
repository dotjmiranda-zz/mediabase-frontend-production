<template>
  <div>
    <Header :title="'Forums'"></Header>

    <Spinner v-if="loading"></Spinner>

    <div v-if="!loading">
      <div class="board-list">
        <div class="board-header">Movies</div>

        <div class="board">
          <div class="board-category">
            <b-icon-newspaper></b-icon-newspaper>
            <b-link
              :to="{
                name: 'forum-board-movie-news'
              }"
              class="board-category-title"
              >News Discussion</b-link
            >
            <div class="board-category-description">
              Discuss current news in movies.
            </div>
          </div>
        </div>

        <div class="board">
          <div class="board-category">
            <b-icon-chat-dots></b-icon-chat-dots>
            <b-link
              :to="{
                name: 'forum-board-movies-general'
              }"
              class="board-category-title"
              >General Discussion</b-link
            >
            <div class="board-category-description">
              General movies dicussion that is not specific to any particular
              movie.
            </div>
          </div>
        </div>

        <div class="board">
          <div class="board-category">
            <b-icon-film></b-icon-film>
            <b-link
              :to="{
                name: 'forum-board-movie-discussion'
              }"
              class="board-category-title"
              >Movie Discussion</b-link
            >
            <div class="board-category-description">
              Discuss about anything that is related to a specific movie.
            </div>
          </div>
        </div>
      </div>

      <!-- TODO: AFTER ADDING SERIES -->
      <!-- <div class="board-list">
          <div class="board-header">TV Series</div>

          <div class="board">
            <div class="board-category">
              <b-icon-newspaper></b-icon-newspaper>
              <b-link
                :to="{ name: 'forum-board', query: { media: '3' } }"
                class="board-category-title"
                >News Discussion</b-link
              >
              <div class="board-category-description">
                Discuss current news in TV series.
              </div>
            </div>

            <div class="board-topics">
              Test
            </div>
          </div>

          <div class="board">
            <div class="board-category">
              <b-icon-chat-dots></b-icon-chat-dots>
              <b-link href="/forum/category/2" class="board-category-title"
                >General Discussion</b-link
              >
              <div class="board-category-description">
                General TV series dicussion that is not specific to any
                particular series.
              </div>
            </div>

            <div class="board-topics">
              Test
            </div>
          </div>

          <div class="board">
            <div class="board-category">
              <b-icon-tv></b-icon-tv>
              <b-link href="/forum/category/1" class="board-category-title"
                >TV Series Discussion</b-link
              >
              <div class="board-category-description">
                Discuss about anything that is related to a specific TV series.
              </div>
            </div>

            <div class="board-topics">
              Test
            </div>
          </div>
        </div> -->
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      loading: false
    };
  }
};
</script>

<style>
.board-list {
  margin-bottom: 20px;
}

.board-header {
  padding: 4px 4px 4px 12px;
  background-color: #343a40;
  color: #fff;
  font-size: 18px;
}

.board {
  width: 100%;
  display: table;
  padding: 12px;
  border: 1px solid #e0e0e0;
  border-top: 0 solid #e0e0e0;
}

.board-category {
  width: 700px;
  display: table-cell;
}

.board-category-title {
  padding-left: 8px;
  font-weight: bold;
}

.board-category-description {
  font-size: 14px;
}

.board-topics {
  display: table-cell;
}

@media only screen and (min-width: 768px) {
  .board-list {
    width: 60%;
    margin: 0 auto;
  }
}
</style>
