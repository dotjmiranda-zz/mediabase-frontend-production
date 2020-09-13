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
                <tr v-for="series in planSerieslist" :key="series.id">
                  <td>
                    <b-img-lazy
                      class="d-md-none image"
                      v-if="series.image_url"
                      :src="$format_image_watchlist(series.image_url)"
                    ></b-img-lazy>

                    <b-img-lazy
                      class="d-none d-md-block image"
                      v-if="series.image_url"
                      :src="series.image_url"
                    ></b-img-lazy>
                  </td>

                  <td>
                    {{ series.title }}
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
                <tr v-for="series in completedSerieslist" :key="series.id">
                  <td>
                    <b-img-lazy
                      class="d-md-none image"
                      v-if="series.image_url"
                      :src="$format_image_watchlist(series.image_url)"
                    ></b-img-lazy>

                    <b-img-lazy
                      class="d-none d-md-block image"
                      v-if="series.image_url"
                      :src="series.image_url"
                    ></b-img-lazy>
                  </td>

                  <td>
                    {{ series.title }}
                  </td>

                  <td>
                    {{ series.score }}
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
      headerEnd: "'s Series List",
      loading: true,
      currentSort: "title",
      currentSortDir: "asc"
    };
  },
  async fetch({ store, route }) {
    await store.dispatch("user/loadSerieslist", route.params.username);
  },
  computed: {
    ...mapState({
      serieslist: state => state.user.serieslist
    }),
    sortedSerieslist: function() {
      return this.serieslist.slice().sort((a, b) => {
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
    planSerieslist: function() {
      return this.sortedSerieslist.slice().filter(series => series.status == 1);
    },
    completedSerieslist: function() {
      return this.sortedSerieslist.slice().filter(series => series.status == 2);
    }
  },
  methods: {
    isLoading() {
      if (this.serieslist) this.loading = false;
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
