<template>
  <div>
    <Header :title="profile.username + profileTitleEnd"></Header>

    <b-container>
      <div class="row">
        <div class="col-12  col-md-3 info">
          <div>
            <div class="row">
              <div class="col-12">
                <b-button
                  v-if="
                    this.$auth.loggedIn && this.$auth.user.id == profile.user_id
                  "
                  variant="dark"
                  :to="{ name: 'profile-edit' }"
                  style="margin-bottom: 10px;"
                >
                  Edit Profile
                </b-button>

                <h4 class="h4">{{ profile.username }}</h4>
              </div>
            </div>

            <b-img
              v-if="!profile.avatar"
              rounded="circle"
              height="120"
              width="120"
            ></b-img>

            <b-img
              v-else
              :src="profile.avatar"
              rounded="circle"
              height="120"
              width="120"
            ></b-img>

            <div class="row section" v-if="profile.name">
              <div class="col-12">
                <span class="font-weight-bold">
                  Name:
                </span>
                {{ profile.name }}
              </div>
            </div>

            <div class="row section" v-if="profile.gender">
              <div class="col-12">
                <span class="font-weight-bold">
                  Gender:
                </span>
                <span v-if="profile.gender == 1">Male</span>
                <span v-else>Female</span>
              </div>
            </div>

            <div class="row section" v-if="profile.birthday">
              <div class="col-12">
                <span class="font-weight-bold">
                  Birthday:
                </span>
                {{ profile.birthday }}
              </div>
            </div>

            <div class="row section" v-if="profile.joined">
              <div class="col-12">
                <span class="font-weight-bold">
                  Joined:
                </span>
                {{ $format_time(profile.joined) }}
              </div>
            </div>
          </div>
        </div>

        <div class="col-12 col-md-9">
          <div class="row">
            <div v-if="profile.description" class="col-12">
              Description
            </div>
          </div>

          <div class="row">
            <div class="col-12">
              <h4 class="h4 stat-header">Statistics</h4>
            </div>
          </div>

          <div class="row">
            <div class="col-12 col-md-6">
              <h5 class="h5 stat-header">Movie Stats</h5>

              <div class="row">
                <div class="col-12">Mean Score: {{ movieMeanScore }}</div>
              </div>

              <div class="row">
                <div class="col-12">
                  <b-progress :max="movielist.length">
                    <b-progress-bar
                      :value="plannedMovies.length"
                      variant="secondary"
                    ></b-progress-bar>
                    <b-progress-bar
                      :value="completedMovies.length"
                      variant="success"
                    ></b-progress-bar>
                  </b-progress>
                </div>
              </div>

              <div class="row">
                <div class="col-12">
                  <div class="row">
                    <div class="col-12">
                      <div class="stat total">
                        Total entries: {{ movielist.length }}
                      </div>
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-12">
                      <div class="stat plan">
                        <b-icon-circle-fill></b-icon-circle-fill>
                        Plan to watch: {{ plannedMovies.length }}
                      </div>
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-12">
                      <div class="stat completed">
                        <b-icon-circle-fill></b-icon-circle-fill>
                        Completed: {{ completedMovies.length }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-12 col-md-6">
              <h5 class="h5 stat-header">Last Movie Updates</h5>

              <div
                v-for="entry in sortedMovieUpdate.slice(0, 5)"
                :key="entry.id"
              >
                <div class="row">
                  <div class="col-12">
                    <b-link
                      class="font-weight-bold stat-movie-title"
                      :to="{
                        name: 'movies-id',
                        params: { id: entry.movie_id }
                      }"
                    >
                      {{ entry.title }}
                    </b-link>
                  </div>
                </div>

                <div class="row justify-content-between">
                  <div class="col-12 col-lg-6">
                    <div v-if="entry.status == 1">
                      <span>Plan to watch</span>
                    </div>

                    <div v-if="entry.status == 2">
                      <span>Completed | Score - </span>
                      <span>{{ entry.score }}</span>
                    </div>
                  </div>

                  <div class="col-12 col-lg-6">
                    {{ format_time(entry.updated_at) }}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-12 col-md-6">
              <h5 class="h5 stat-header">Series Stats</h5>

              <div class="row">
                <div class="col-12">Mean Score: {{ seriesMeanScore }}</div>
              </div>

              <div class="row">
                <div class="col-12">
                  <b-progress :max="serieslist.length">
                    <b-progress-bar
                      :value="plannedSeries.length"
                      variant="secondary"
                    ></b-progress-bar>
                    <b-progress-bar
                      :value="completedSeries.length"
                      variant="success"
                    ></b-progress-bar>
                  </b-progress>
                </div>
              </div>

              <div class="row">
                <div class="col-12">
                  <div class="row">
                    <div class="col-12">
                      <div class="stat total">
                        Total entries: {{ serieslist.length }}
                      </div>
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-12">
                      <div class="stat plan">
                        <b-icon-circle-fill></b-icon-circle-fill>
                        Plan to watch: {{ plannedSeries.length }}
                      </div>
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-12">
                      <div class="stat completed">
                        <b-icon-circle-fill></b-icon-circle-fill>
                        Completed: {{ completedSeries.length }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-12 col-md-6">
              <h5 class="h5 stat-header">Last Series Updates</h5>

              <div
                v-for="entry in sortedSeriesUpdate.slice(0, 5)"
                :key="entry.id"
              >
                <div class="row">
                  <div class="col-12">
                    <b-link
                      class="font-weight-bold stat-movie-title"
                      :to="{
                        name: 'movies-id',
                        params: { id: entry.series_id }
                      }"
                    >
                      {{ entry.title }}
                    </b-link>
                  </div>
                </div>

                <div class="row justify-content-between">
                  <div class="col-12 col-lg-6">
                    <div v-if="entry.status == 1">
                      <span>Plan to watch</span>
                    </div>

                    <div v-if="entry.status == 2">
                      <span>Completed | Score - </span>
                      <span>{{ entry.score }}</span>
                    </div>
                  </div>

                  <div class="col-12 col-lg-6">
                    {{ format_time(entry.updated_at) }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </b-container>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";

export default {
  data() {
    return {
      profileTitleEnd: "'s Profile"
    };
  },
  async fetch({ store, route }) {
    await store.dispatch("user/loadProfile", route.params.username);
    await store.dispatch("user/loadMovielist", route.params.username);
    await store.dispatch("user/loadSerieslist", route.params.username);
  },
  computed: {
    ...mapState({
      profile: state => state.user.profile,
      movielist: state => state.user.movielist,
      serieslist: state => state.user.serieslist
    }),
    ...mapGetters({
      movieMeanScore: "user/movieMeanScore",
      completedMovies: "user/completedMovies",
      plannedMovies: "user/plannedMovies",
      sortedMovieUpdate: "user/moviesSortedByUpdate",

      seriesMeanScore: "user/seriesMeanScore",
      completedSeries: "user/completedSeries",
      plannedSeries: "user/plannedSeries",
      sortedSeriesUpdate: "user/seriesSortedByUpdate"
    })
  },
  methods: {
    format_time(date) {
      var datetime = new Date(date);

      return datetime.toLocaleString("en-GB");
    }
  }
};
</script>

<style scoped>
.info {
  text-align: center;
  background: #e0e0e0;
  padding: 20px;
  border-radius: 8px;
}

.section {
  margin: 10px 0;
}

.stat-header {
  border-bottom: #343a40 solid 1px;
  margin: 10px 0;
}

.stat {
  padding: 4px;
}

.plan svg {
  color: #c3c3c3;
}

.completed svg {
  color: #00ff00;
}

.stat-movie-title {
  font-size: 1.05rem;
}

@media only screen and (min-width: 768px) {
  .stat-header {
    margin: 20px 0;
  }
}
</style>
