<template>
  <div>
    <Header :title="series.title"></Header>

    <b-container fluid>
      <div class="row">
        <div class="col-12 col-md-3 col-lg-2">
          <div class="section">
            <div class="row">
              <div class="col-12 text-center">
                <b-img
                  :src="$format_image_media(series.image)"
                  class="series-image"
                ></b-img>
              </div>
            </div>
          </div>

          <div class="section" v-if="$auth.loggedIn">
            <div class="row">
              <div class="col-12 text-center">
                <div v-if="!entry">
                  <b-btn @click="addFlag = !addFlag">Add to watchlist</b-btn>
                </div>
              </div>
            </div>
          </div>

          <div class="section" v-if="addFlag || (entry != null && entry.id)">
            <div class="row">
              <div class="col-12 text-center">
                <div class="section">
                  <b-form-select
                    @input="updateStatus"
                    :value="selectedStatus"
                    :options="options"
                  ></b-form-select>

                  <div class="section">
                    <div class="h5">Score</div>

                    <b-form-select
                      @input="updateScore"
                      :value="selectedScore"
                      :options="scores"
                    ></b-form-select>
                  </div>

                  <b-btn v-if="!entry" size="sm" @click="submitEntry">
                    Submit
                  </b-btn>

                  <b-btn v-if="entry" size="sm" @click="updateEntry">
                    Update
                  </b-btn>
                </div>
              </div>
            </div>
          </div>

          <div class="section">
            <div class="row">
              <div class="col-12">
                <h1 class="section-title">Information</h1>
                Type: {{ series.type }}
                <br />
                Release Date: {{ series.releaseDate }}
                <br />
                Episode Duration: {{ series.runtimeStr }}
                <br />
                Seasons: {{ series.tvSeriesInfo.seasons.length }}
              </div>
            </div>
          </div>
        </div>

        <div class="col-12 col-md-5 col-lg-6">
          <div class="row">
            <div class="col-12">
              <div class="h1 synopsis-title">Synopsis</div>
            </div>
          </div>

          <div class="section">
            <div class="row">
              <div class="col-12">
                {{ series.plot }}
              </div>
            </div>
          </div>

          <!-- DIRECTORS -->
          <div class="section">
            <div class="row">
              <div class="col-12">
                <div class="section-title">Creators</div>

                <div
                  v-for="creator in series.tvSeriesInfo.creatorList"
                  :key="creator.id"
                >
                  <b-link
                    :to="{ name: 'people-id', params: { id: creator.id } }"
                  >
                    {{ creator.name }}
                  </b-link>
                </div>
              </div>
            </div>
          </div>

          <!-- STARS -->
          <div class="section">
            <div class="row">
              <div class="col-12">
                <div class="section-title">Stars</div>

                <div v-for="star in series.starList" :key="star.id">
                  <b-link :to="{ name: 'people-id', params: { id: star.id } }">
                    {{ star.name }}
                  </b-link>
                </div>
              </div>
            </div>
          </div>

          <div class="section">
            <div class="row align-items-center">
              <div class="col-6">
                <div class="section-title">Reviews</div>
              </div>

              <div class="col-6">
                <b-button
                  class="float-right"
                  squared
                  v-if="this.$auth.loggedIn"
                  variant="dark"
                  :to="{
                    name: 'reviews-new-review',
                    query: { media_id: this.$route.params.id }
                  }"
                >
                  New Review
                </b-button>
              </div>

              <div class="col-12">
                <b-link
                  class="view-reviews-button"
                  :to="{
                    name: 'reviews-id',
                    params: { id: this.$route.params.id }
                  }"
                >
                  (View all reviews)
                </b-link>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-12">
              <div class="section">
                <div v-for="review in reviews" :key="review.id">
                  <Review :review="review"></Review>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-12 col-md-4">
          <div class="section">
            <div class="row">
              <div class="col-7">
                <div class="section-title">Recent Posts</div>
              </div>

              <div class="col-5">
                <b-button
                  class="float-right"
                  v-if="this.$auth.loggedIn"
                  squared
                  variant="dark"
                  :to="{
                    name: 'forum-posts-new-post',
                    query: { id: 3, media_id: this.$route.params.id }
                  }"
                >
                  New Post
                </b-button>
              </div>
            </div>
          </div>

          <div v-if="posts.length" class="section d-none d-md-block">
            <div class="row">
              <div class="col-12">
                <PostTable :posts="posts"></PostTable>
              </div>
            </div>
          </div>
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
      addFlag: false,
      options: [
        { value: 1, text: "Plan to watch" },
        { value: 2, text: "Completed" }
      ],
      scores: [
        { value: null, text: "Select a score" },
        { value: 10, text: "(10) Masterpiece" },
        { value: 9, text: "(9) Amazing" },
        { value: 8, text: "(8) Great" },
        { value: 7, text: "(7) Good" },
        { value: 6, text: "(6) Fine" },
        { value: 5, text: "(5) Average" },
        { value: 4, text: "(4) Bad" },
        { value: 3, text: "(3) Awful" },
        { value: 2, text: "(2) Horrible" },
        { value: 1, text: "(1) Atrocious" }
      ]
    };
  },
  async fetch({ store, route }) {
    await store.dispatch("series/loadSeries", route.params.id);
    await store.dispatch("forum/loadMediaPosts", route.params.id);
    await store.dispatch("reviews/loadMediaReviews", route.params.id);
  },
  computed: {
    ...mapState({
      series: state => state.series.series,
      entry: state => state.user.serieslist_entry,
      selectedStatus: state => state.user.selectedStatus,
      selectedScore: state => state.user.selectedScore,
      posts: state => state.forum.posts,
      reviews: state => state.reviews.reviews
    })
  },
  methods: {
    async loadEntry() {
      if (this.$auth.loggedIn) {
        await this.$store.dispatch("user/loadSerieslistEntry", {
          userID: this.$auth.user.id,
          seriesID: this.$route.params.id
        });
      } else return null;
    },
    updateStatus(value) {
      this.$store.commit("user/SET_STATUS", value);
    },
    updateScore(value) {
      this.$store.commit("user/SET_SCORE", value);
    },
    async submitEntry() {
      await this.$auth.fetchUser();
      if (!this.$auth.loggedIn) {
        this.$toast.error("You need to be signed in to use the Watchlist");
        this.$router.push({
          path: "/login"
        });
      } else {
        await this.$axios
          .$post("api/watchlist_series", {
            status: this.selectedStatus,
            user_id: this.$auth.user.id,
            series_id: this.series.id,
            series_title: this.series.title,
            image_url: this.series.image,
            score: this.selectedScore
          })
          .then(response => {
            console.log(response);
          })
          .catch(error => {
            console.log(error);
          });
      }
    },
    async updateEntry() {
      await this.$auth.fetchUser();
      if (!this.$auth.loggedIn) {
        this.$toast.error("You need to be signed in to use the Watchlist");
        this.$router.push({
          path: "/login"
        });
      } else {
        await this.$store.dispatch("user/updateSerieslistEntry", {
          id: this.entry.id,
          status: this.selectedStatus,
          score: this.selectedScore
        });
        this.loadEntry();
      }
    }
  },
  mounted() {
    this.loadEntry();
  }
};
</script>

<style>
.section {
  margin-bottom: 10px;
}

.section-title {
  font-size: 1.5rem;
}

.series-image {
  width: 100%;
  margin-top: 10px;
}

.synopsis-title {
  font-size: 1.5rem;
}

@media only screen and (min-width: 768px) {
  .section {
    margin-bottom: 20px;
  }

  .section-title {
    font-size: 1.75rem;
  }

  .synopsis-title {
    font-size: 2.25rem;
    font-weight: bold;
  }

  .series-image {
    margin-top: 0;
  }
}
</style>
