<template>
  <div>
    <Header :title="person.name"></Header>

    <b-container fluid>
      <div class="row justify-content-center">
        <div class="col-12 col-md-3 col-lg-2">
          <div class="section">
            <div class="row">
              <div class="col-12 text-center">
                <b-img
                  class="person-image"
                  :src="$format_image_media(person.image)"
                ></b-img>
              </div>
            </div>
          </div>

          <div class="section">
            <div class="row">
              <div class="col-12">
                <h1 class="section-title">Information</h1>

                <div>Roles: {{ person.role }}</div>

                <div v-if="person.birthDate">
                  Birthday: {{ person.birthDate }}
                </div>

                <div v-if="person.deathDate">
                  Day of death: {{ person.deathDate }}
                </div>

                <div v-if="person.height">Height: {{ person.height }}</div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-12 col-md-5 col-lg-6">
          <div class="row">
            <div class="col-12">
              <h1 class="synopsis-title">Summary</h1>
            </div>
          </div>

          <div class="section">
            <div class="row">
              <div class="col-12">
                {{ person.summary }}
              </div>
            </div>
          </div>

          <div class="section">
            <div class="row">
              <div class="col-12">
                <div class="section-title">Awards</div>

                <div>{{ person.awards }}</div>
              </div>
            </div>
          </div>

          <div class="section">
            <div class="row">
              <div class="col-12">
                <div class="section-title">Known for</div>

                <div v-for="movie in person.knownFors" :key="movie.id">
                  <b-link :to="{ name: 'movies-id', params: { id: movie.id } }">
                    {{ movie.title }}
                  </b-link>
                </div>
              </div>
            </div>
          </div>

          <div class="section">
            <div class="row">
              <div class="col-12">
                <div class="section-title text-center">Filmography</div>

                <!-- PRODUCER -->
                <div class="accordion" role="tablist">
                  <b-card no-body>
                    <!-- PRODUCER -->
                    <div>
                      <b-card-header header-tag="header" role="tab">
                        <b-button block v-b-toggle.accordion-1
                          >Producer ({{
                            person.castMovies.filter(
                              movie => movie.role === "Producer"
                            ).length
                          }})
                        </b-button>
                      </b-card-header>

                      <b-collapse
                        id="accordion-1"
                        accordion="accordion"
                        role="tabpanel"
                      >
                        <b-card-body>
                          <div
                            v-for="role in person.castMovies.filter(
                              movie => movie.role === 'Producer'
                            )"
                            :key="role.index"
                          >
                            <b-card-text>
                              <div class="section">
                                <div>
                                  <b-link
                                    :to="{
                                      name: 'movies-id',
                                      params: { id: role.id }
                                    }"
                                  >
                                    {{ role.title }} ({{ role.year }})
                                  </b-link>
                                </div>
                              </div>
                            </b-card-text>
                          </div>
                        </b-card-body>
                      </b-collapse>
                    </div>

                    <!-- DIRECTOR -->
                    <div>
                      <b-card-header header-tag="header" role="tab">
                        <b-button block v-b-toggle.accordion-2
                          >Director ({{
                            person.castMovies.filter(
                              movie => movie.role === "Director"
                            ).length
                          }})
                        </b-button>
                      </b-card-header>

                      <b-collapse
                        id="accordion-2"
                        accordion="accordion"
                        role="tabpanel"
                      >
                        <b-card-body>
                          <div
                            v-for="role in person.castMovies.filter(
                              movie => movie.role === 'Director'
                            )"
                            :key="role.index"
                          >
                            <b-card-text>
                              <div class="section">
                                <div>
                                  <b-link
                                    :to="{
                                      name: 'movies-id',
                                      params: { id: role.id }
                                    }"
                                  >
                                    {{ role.title }} ({{ role.year }})
                                  </b-link>
                                </div>
                              </div>
                            </b-card-text>
                          </div>
                        </b-card-body>
                      </b-collapse>
                    </div>

                    <!-- WRITER -->
                    <div>
                      <b-card-header header-tag="header" role="tab">
                        <b-button block v-b-toggle.accordion-3>
                          Writer ({{
                            person.castMovies.filter(
                              movie => movie.role === "Writer"
                            ).length
                          }})
                        </b-button>
                      </b-card-header>

                      <b-collapse
                        id="accordion-3"
                        accordion="accordion"
                        role="tabpanel"
                      >
                        <b-card-body>
                          <div
                            v-for="role in person.castMovies.filter(
                              movie => movie.role === 'Writer'
                            )"
                            :key="role.index"
                          >
                            <b-card-text>
                              <div class="section">
                                <div>
                                  <b-link
                                    :to="{
                                      name: 'movies-id',
                                      params: { id: role.id }
                                    }"
                                  >
                                    {{ role.title }} ({{ role.year }})
                                  </b-link>
                                </div>
                              </div>
                            </b-card-text>
                          </div>
                        </b-card-body>
                      </b-collapse>
                    </div>

                    <!-- CINEMATOGRAPHER -->

                    <!-- EDITOR -->

                    <!-- MISCELLANEOUS CREW -->

                    <!-- THANKS -->

                    <!-- SELF -->

                    <!-- ACTOR -->
                    <div>
                      <b-card-header header-tag="header" role="tab">
                        <b-button block v-b-toggle.accordion-4
                          >Actor ({{
                            person.castMovies.filter(
                              movie => movie.role === "Actor"
                            ).length
                          }})
                        </b-button>
                      </b-card-header>

                      <b-collapse
                        id="accordion-4"
                        accordion="accordion"
                        role="tabpanel"
                      >
                        <b-card-body>
                          <div
                            v-for="role in person.castMovies.filter(
                              movie => movie.role === 'Actor'
                            )"
                            :key="role.index"
                          >
                            <b-card-text>
                              <div class="section">
                                <div>
                                  <b-link
                                    :to="{
                                      name: 'movies-id',
                                      params: { id: role.id }
                                    }"
                                  >
                                    {{ role.title }} ({{ role.year }})
                                  </b-link>
                                </div>
                              </div>
                            </b-card-text>
                          </div>
                        </b-card-body>
                      </b-collapse>
                    </div>
                  </b-card>
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
import { mapState } from "vuex";

export default {
  async fetch({ store, route }) {
    await store.dispatch("people/loadPerson", route.params.id);
  },
  computed: {
    ...mapState({
      person: state => state.people.person
    })
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

.person-image {
  width: 60%;
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

  .person-image {
    width: 100%;
    margin-top: 0;
  }
}
</style>
