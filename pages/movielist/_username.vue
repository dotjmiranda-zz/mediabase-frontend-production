<template>
  <div>
    <Header :title="this.$route.params.username + headerEnd"></Header>

    <Spinner v-if="loading"></Spinner>

    <div v-if="!loading">
      <b-tabs fill>
        <b-tab title="Plan to watch">
          <div class="table-responsive">
            <table class="table">
              <thead>
                <tr>
                  <th>Image</th>

                  <th>Title</th>
                </tr>
              </thead>

              <tbody>
                <tr v-for="movie in planMovielist" :key="movie.id">
                  <td>
                    <b-img-lazy
                      class="d-md-none image"
                      v-if="movie.image_url"
                      :src="$format_image_watchlist(movie.image_url)"
                    ></b-img-lazy>

                    <b-img-lazy
                      class="d-none d-md-block image"
                      v-if="movie.image_url"
                      :src="movie.image_url"
                    ></b-img-lazy>
                  </td>

                  <td>
                    {{ movie.title }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </b-tab>

        <b-tab title="Completed">
          <div class="table-responsive">
            <table class="table">
              <thead>
                <tr>
                  <th>Image</th>

                  <th>Title</th>

                  <th>Score</th>
                </tr>
              </thead>

              <tbody>
                <tr v-for="movie in completedMovielist" :key="movie.id">
                  <td>
                    <b-img-lazy
                      class="d-md-none image"
                      v-if="movie.image_url"
                      :src="$format_image_watchlist(movie.image_url)"
                    ></b-img-lazy>

                    <b-img-lazy
                      class="d-none d-md-block image"
                      v-if="movie.image_url"
                      :src="movie.image_url"
                    ></b-img-lazy>
                  </td>

                  <td>
                    {{ movie.title }}
                  </td>

                  <td>
                    {{ movie.score }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </b-tab>
      </b-tabs>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      headerEnd: "'s Movies List",
      loading: true,
      currentSort: "title",
      currentSortDir: "asc"
    };
  },
  async fetch({ store, route }) {
    await store.dispatch("user/loadMovielist", route.params.username);
  },
  computed: {
    ...mapState({
      movielist: state => state.user.movielist
    }),
    sortedMovielist: function() {
      return this.movielist.slice().sort((a, b) => {
        let modifier = 1;
        if (this.currentSortDir === "desc") modifier = -1;

        if (typeof a[this.currentSort] === "string") {
          if (
            a[this.currentSort].toLowerCase() <
            b[this.currentSort].toLowerCase()
          )
            return -1 * modifier;
          if (
            a[this.currentSort].toLowerCase() >
            b[this.currentSort].toLowerCase()
          )
            return 1 * modifier;
        } else {
          if (a[this.currentSort] < b[this.currentSort]) return -1 * modifier;
          if (a[this.currentSort] > b[this.currentSort]) return 1 * modifier;
        }

        return 0;
      });
    },
    planMovielist: function() {
      return this.sortedMovielist.slice().filter(movie => movie.status == 1);
    },
    completedMovielist: function() {
      return this.sortedMovielist.slice().filter(movie => movie.status == 2);
    }
  },
  methods: {
    isLoading() {
      if (this.movielist) this.loading = false;
      else this.loading = true;
    }
  },
  mounted() {
    this.isLoading();
  }
};
</script>

<style scoped>
.image {
  width: 75px;
}

@media only screen and (min-width: 768px) {
  .header {
    margin-bottom: 0 !important;
  }

  .image {
    width: 150px;
  }
}
</style>
