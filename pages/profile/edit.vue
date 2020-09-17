<template>
  <div>
    <Header title="Edit Profile"></Header>

    <div
      class="form-wrapper d-flex align-items-center justify-content-center text-center"
    >
      <form class="form-profile">
        <label v-if="!profile.avatar" for="avatar">Avatar</label>
        <b-img
          v-else
          :src="profile.avatar"
          rounded="circle"
          height="120"
          width="120"
        ></b-img>
        <b-form-file
          v-model="avatar"
          id="avatar"
          accept="image/jpeg, image/png"
        ></b-form-file>

        <label for="inputName" class="sr-only">Name</label>
        <b-form-input
          @input="updateName"
          :value="inputName"
          type="text"
          id="inputName"
          placeholder="Name"
          required
          autofocus
        ></b-form-input>

        <label for="inputGender"></label>
        <b-form-select
          @input="updateGender"
          :value="selectedGender"
          :options="options"
        ></b-form-select>

        <label for="inputBirth"></label>
        <b-form-datepicker
          id="inputBirth"
          @input="updateBirthday"
          :value="selectedBirthday"
        ></b-form-datepicker>

        <b-btn class="btn-block" @click="updateProfile()">
          Save
        </b-btn>
      </form>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";

export default {
  middleware: "auth",
  data() {
    return {
      avatar: null,
      options: [
        { value: null, text: "Gender" },
        { value: 1, text: "Male" },
        { value: 2, text: "Female" }
      ]
    };
  },
  async fetch({ store, route }) {
    await store.dispatch("user/loadProfile", store.$auth.user.username);
  },
  computed: {
    ...mapState({
      profile: state => state.user.profile,
      inputName: state => state.user.inputName,
      selectedGender: state => state.user.selectedGender,
      selectedBirthday: state => state.user.selectedBirthday
    })
  },
  methods: {
    updateName(value) {
      this.$store.commit("user/SET_NAME", value);
    },
    updateGender(value) {
      this.$store.commit("user/SET_GENDER", value);
    },
    updateBirthday(value) {
      this.$store.commit("user/SET_BIRTHDAY", value);
    },
    async updateProfile() {
      await this.$auth.fetchUser();
      if (!this.$auth.loggedIn) {
        this.$toast.error("You need to be signed in to update your Profile");
        this.$router.push({ path: "/login" });
      } else {
        await this.$store.dispatch("user/updateProfile", {
          username: this.profile.username,
          avatar: this.avatar,
          name: this.inputName,
          gender: this.selectedGender,
          birthday: this.selectedBirthday
        });
      }

      this.$router.push({ path: `/profile/${this.$auth.user.username}` });
    }
  }
};
</script>

<style scoped>
.form-wrapper {
  position: fixed;
  height: 100%;
  width: 100%;
  top: 0;
}

.form-profile {
  width: 100%;
  max-width: 330px;
  padding: 0 15px;
}

button {
  margin-top: 20px;
}
</style>
