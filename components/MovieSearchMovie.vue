<template>
  <div>
    <div class="d-md-none">
      <b-card class="movie-card mx-auto" no-body>
        <b-row no-gutters>
          <div class="col-5">
            <b-link :to="{ name: 'movies-id', params: { id: movie.id } }">
              <b-card-img
                :src="$format_image_media(movie.image)"
                left
                class="image"
              ></b-card-img>
            </b-link>
          </div>

          <div class="col-7">
            <b-card-body>
              <b-link :to="{ name: 'movies-id', params: { id: movie.id } }">
                <b-card-title class="h5">{{ movie.title }}</b-card-title>
              </b-link>
              <b-card-text v-if="movie.releaseState">
                Release Date:<br />
                <span style="font-size: 12px">
                  {{ movie.releaseState }}
                </span>
              </b-card-text>
            </b-card-body>
          </div>
        </b-row>
      </b-card>
    </div>

    <div class="d-none d-md-block">
      <b-card class="movie-card mx-auto" no-body>
        <b-link :to="{ name: 'movies-id', params: { id: movie.id } }">
          <b-card-img
            :src="$format_image_media(movie.image)"
            top
            class="image"
          ></b-card-img>
        </b-link>
        <b-card-body>
          <b-link :to="{ name: 'movies-id', params: { id: movie.id } }">
            <b-card-title class="h5">{{ movie.title }}</b-card-title>
          </b-link>
          <b-card-text v-if="movie.releaseState">
            Release Date: {{ movie.releaseState }}
          </b-card-text>
        </b-card-body>
      </b-card>
    </div>
  </div>
</template>

<script>
export default {
  name: "MovieSearchMovie",
  props: ["movie"],
  data() {
    return {
      imageBase: "https://image.tmdb.org/t/p/w300_and_h450_face/"
    };
  }
};
</script>

<style>
.movie-card {
  max-width: 300px;
  height: 175px;
}

img {
  width: 115px;
}

@media only screen and (min-width: 768px) {
  .movie-card {
    max-width: 300px;
    height: 600px;
  }
}
</style>
