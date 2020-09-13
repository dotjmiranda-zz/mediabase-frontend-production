<template>
  <div>
    <div v-if="loading">
      <Spinner></Spinner>
    </div>

    <div v-if="!loading">
      <Header title="Top Series"></Header>

      <div class="table-container">
        <SeriesTable :series="series"></SeriesTable>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      loading: true
    };
  },
  methods: {
    isLoading() {
      if (this.series) this.loading = false;
      else this.loading = true;
    }
  },
  async fetch({ store }) {
    await store.dispatch("series/loadTopSeries");
  },
  computed: {
    ...mapState({
      series: state => state.series.seriesTop
    })
  },
  mounted() {
    this.isLoading();
  }
};
</script>

<style>
@media only screen and (min-width: 768px) {
  .table-container {
    width: 100%;
    padding: 0 100px;
    margin: 0 auto;
  }
}
</style>
