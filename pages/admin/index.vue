<template>
  <div>
    <Header title="User List"></Header>

    <b-container fluid class="d-md-none">
      <div v-for="user in users" :key="user.id">
        <div class="row user-row" v-if="$auth.user.id != user.id">
          <div class="col-12">
            <div class="row justify-content-between align-items-center">
              <div class="col-6 text-left">User: {{ user.username }}</div>

              <div class="col-4 text-right">ID: {{ user.id }}</div>
            </div>
          </div>

          <div class="col-12">
            <div class="row justify-content-between">
              <div class="col-6">
                <b-checkbox v-model="user.admin">Administrator</b-checkbox>
              </div>

              <div class="col-6 text-right">
                <b-checkbox v-model="user.moderator">Moderator</b-checkbox>
              </div>
            </div>
          </div>

          <div class="col-6">
            <b-button block size="sm" @click="saveUser(user)">Save</b-button>
          </div>

          <div class="col-6">
            <b-button block size="sm" @click="deleteUser(user)">Save</b-button>
          </div>
        </div>
      </div>
    </b-container>

    <b-container class="user-list d-none d-md-block">
      <div v-for="user in users" :key="user.id">
        <div
          class="row user-row align-items-center"
          v-if="$auth.user.id != user.id"
        >
          <div class="col-1">ID: {{ user.id }}</div>

          <div class="col-5">{{ user.username }}</div>

          <div class="col-2 text-right">
            <b-checkbox v-model="user.admin">Administrator</b-checkbox>
          </div>

          <div class="col-2 text-right">
            <b-checkbox v-model="user.moderator">
              Moderator
            </b-checkbox>
          </div>

          <div class="col-1">
            <b-button @click="saveUser(user)">Save</b-button>
          </div>

          <div class="col-1">
            <b-button @click="deleteUser(user)">Delete</b-button>
          </div>
        </div>
      </div>
    </b-container>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";

export default {
  middleware: "auth-admin",
  async fetch({ store }) {
    await store.dispatch("admin/loadUsers");
  },
  computed: {
    ...mapGetters({
      users: "admin/userList"
    })
  },
  methods: {
    async updateUser(user) {
      this.$store.commit("user/UPDATE_USER", user);
    },
    async saveUser(user) {
      await this.$axios.$patch(`api/users/${user.id}`, {
        admin: user.admin,
        mod: user.moderator
      });

      this.$store.dispatch("admin/loadUsers");
    },
    async deleteUser(user) {
      await this.$axios.$delete(`api/users/${user.id}`);

      this.$store.dispatch("admin/loadUsers");
    }
  }
};
</script>

<style scoped>
.user-row {
  padding: 10px 0;
  border-bottom: 1px solid #343a40;
}

@media only screen and (min-width: 1366px) {
  .user-list {
    border: 1px solid #343a40;
    border-bottom: 0;
  }
}
</style>
