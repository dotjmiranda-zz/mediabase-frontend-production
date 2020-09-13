<template>
  <div>
    <table class="list-table">
      <thead>
        <tr class="list-table-header">
          <th class="image">Image</th>
          <th class="title">Title</th>
          <th class="score">Score</th>
        </tr>
      </thead>

      <tbody>
        <tr class="list-table-data" v-for="series in series" :key="series.id">
          <td class="list-image">
            <b-img :src="series.image_url"></b-img>
          </td>

          <td class="title">
            <b-link
              :to="{ name: 'series-id', params: { id: series.series_id } }"
              >{{ series.title }}</b-link
            >
          </td>

          <td v-if="series.score" class="score">{{ series.score }}</td>
          <td v-else class="score">-</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "SeriesTable",
  props: ["series"]
};
</script>

<style>
.list-table {
  width: 100%;
  border-collapse: collapse;
  border: rgb(197, 197, 197) 1px solid;
  text-align: center;
}

.list-table-header {
  background-color: rgb(247, 247, 247);
}

.list-table tr:nth-child(even) {
  background-color: rgb(247, 247, 247);
}

.list-table th {
  height: 48px;
}

.list-table td {
  border-top: solid 1px rgb(197, 197, 197);
}

.list-table td.list-image {
  width: 80px;
  padding: 6px 8px;
}

.list-table td.list-image img {
  width: 75px;
}

.list-table th.title,
td.title {
  text-align: left;
  padding-left: 12px;
}

.list-table th.status,
td.status {
  width: 160px;
}

.list-table th.score,
td.score {
  width: 80px;
}
</style>
