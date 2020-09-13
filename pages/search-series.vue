<template>
  <div>
    <div class="row search justify-content-center">
      <div class="col-10 col-md-4">
        <b-form-input
          v-model="search"
          id="search"
          type="search"
          size="lg"
          placeholder="Search TV series..."
          v-on:keyup.enter="searchSeries()"
        ></b-form-input>
      </div>
    </div>

    <Spinner v-if="loading"></Spinner>

    <b-container fluid v-if="!loading">
      <div class="row">
        <div
          class="movie col-12 col-md-3"
          v-for="series in seriesSearch"
          :key="series.id"
        >
          <SeriesSearchSeries :series="series" class="m-2"></SeriesSearchSeries>
        </div>
      </div>
    </b-container>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      movies: [],
      search: "",
      loading: false
    };
  },
  methods: {
    async searchSeries() {
      this.loading = true;
      await this.$store.dispatch("series/loadSearchSeries", this.search);
      this.loading = false;
    }
  },
  computed: {
    ...mapState({
      seriesSearch: state => state.series.seriesSearch
    })
  }
};
</script>

<style>
.search {
  margin: 15px 0 10px 0;
}

.search label {
  text-align: center;
}

@media only screen and (min-width: 768px) {
  .search {
    margin: 20px 0 10px 0;
  }
}
</style>
