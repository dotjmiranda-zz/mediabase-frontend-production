<template>
  <div>
    <b-container>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Admin Status</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="user in users" :key="user.id">
            <td>{{ user.id }}</td>
            <td>{{ user.username }}</td>
            <td>{{ user.admin }}</td>
          </tr>
        </tbody>
      </table>

      {{ users }}
    </b-container>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  middleware: "auth-admin",
  async fetch({ store }) {
    await store.dispatch("admin/loadUsers");
  },
  computed: {
    ...mapState({
      users: state => state.admin.users
    })
  }
};
</script>

<style scoped>
table {
  text-align: center;
}
</style>
