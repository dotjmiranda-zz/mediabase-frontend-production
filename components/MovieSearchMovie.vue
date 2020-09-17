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

              <b-card-text>
                <div v-if="movie.description">
                  <div>Description:</div>
                  <div>{{ movie.description }}</div>
                </div>

                <div v-if="movie.releaseState">
                  <div>Release Date:</div>
                  <div style="font-size: 0.8rem">{{ movie.releaseState }}</div>
                </div>
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

          <b-card-text>
            <div v-if="movie.description">
              <div>Description:</div>
              <div>{{ movie.description }}</div>
            </div>

            <div v-if="movie.releaseState">
              <div>Release Date:</div>
              <div style="font-size: 0.8rem">{{ movie.releaseState }}</div>
            </div>
          </b-card-text>
        </b-card-body>
      </b-card>
    </div>
  </div>
</template>

<script>
export default {
  name: "MovieSearchMovie",
  props: ["movie"]
};
</script>

<style>
.movie-card {
  max-width: 300px;
  height: 175px;
}

.image {
  max-width: 115px;
}

@media only screen and (min-width: 768px) {
  .movie-card {
    max-width: 235px;
    height: 480px;
  }

  .image {
    max-width: 235px;
    max-height: 350px;
  }
}
</style>
