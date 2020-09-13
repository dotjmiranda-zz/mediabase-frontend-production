<template>
  <b-navbar toggleable="sm" type="dark" variant="dark" sticky>
    <b-navbar-brand class="float-left" to="/">MediaBase</b-navbar-brand>

    <b-navbar-toggle target="navbar-toggle" class="float-right">
      <b-icon-list></b-icon-list>
    </b-navbar-toggle>

    <b-collapse id="navbar-toggle" is-nav>
      <b-navbar-nav>
        <b-nav-item-dropdown text="Movies">
          <b-dropdown-item href="/search-movies">Search Movies</b-dropdown-item>
          <b-dropdown-item href="/top-movies">Top Movies</b-dropdown-item>
          <b-dropdown-item href="/movies-coming-soon"
            >Coming Soon</b-dropdown-item
          >
        </b-nav-item-dropdown>

        <b-nav-item-dropdown text="Series">
          <b-dropdown-item href="/search-series">Search Series</b-dropdown-item>
          <b-dropdown-item href="/top-series">Top Series</b-dropdown-item>
        </b-nav-item-dropdown>

        <b-nav-item-dropdown text="Community">
          <b-dropdown-item href="/forum">Forums</b-dropdown-item>
          <b-dropdown-item>Clubs</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>

      <b-navbar-nav class="ml-auto" v-if="!this.$auth.loggedIn">
        <b-nav-item href="/login">Login</b-nav-item>

        <b-nav-item href="/register">Register</b-nav-item>
      </b-navbar-nav>

      <b-navbar-nav class="ml-auto" v-if="this.$auth.loggedIn">
        <b-nav-item v-if="$auth.user && $auth.user.admin" href="/admin">
          Admin Board
        </b-nav-item>

        <b-nav-item
          :to="{
            name: 'movielist-username',
            params: { username: this.$auth.user.username }
          }"
        >
          <span></span>
          Movie List
        </b-nav-item>

        <b-nav-item
          :to="{
            name: 'serieslist-username',
            params: { username: this.$auth.user.username }
          }"
        >
          <span></span>
          Series List
        </b-nav-item>

        <b-nav-item
          :to="{
            name: 'profile-username',
            params: { username: this.$auth.user.username }
          }"
          class="profile-button"
          >{{ this.$auth.user.username }}</b-nav-item
        >

        <b-nav-item @click="logout">Logout</b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
export default {
  name: "Navbar",
  methods: {
    logout: function() {
      this.$auth.logout().catch(e => {
        this.error = e + "";
      });
      this.$router.push("/");
    }
  }
};
</script>

<style>
.navbar-nav .nav-item a:focus {
  outline: 0 !important;
}

.navbar-nav .nav-item li:focus {
  outline: 0 !important;
}

.profile-button a {
  color: lightskyblue !important;
  font-weight: bold;
}

.profile-button a:hover {
  color: lightsteelblue !important;
}
</style>
