<template>
  <div
    class="form-wrapper d-flex align-items-center justify-content-center text-center"
  >
    <b-form class="form-auth" @submit.stop.prevent="submitForm(info)">
      <b-img src="@/static/auth-image.png" width="144"></b-img>

      <h1 v-if="isRegister" class="h3">Sign up</h1>
      <h1 v-else class="h3">Sign in</h1>

      <b-form-text v-if="isRegister" id="input-live-help"
        >All fields need to be atleast 6 characters long</b-form-text
      >

      <div role="group" v-if="isRegister">
        <label class="sr-only" for="inputUsername">Username</label>

        <b-form-input
          v-model="info.username"
          type="text"
          id="inputUsername"
          placeholder="Username"
          required
          autofocus
          :state="username"
        />

        <b-form-invalid-feedback> </b-form-invalid-feedback>
      </div>

      <label class="sr-only" for="inputEmail">Email address</label>
      <b-form-input
        v-model="info.email"
        type="email"
        id="inputEmail"
        placeholder="Email address"
        required
      />

      <label class="sr-only" for="inputPassword">Password</label>
      <b-form-input
        v-model="info.password"
        type="password"
        id="inputPassword"
        placeholder="Password"
        required
      />

      <div v-if="isRegister">
        <label class="sr-only" for="inputPasswordConfirmation"
          >Password confirmation</label
        >
        <b-form-input
          v-model="info.password_confirmation"
          type="password"
          id="inputPasswordConfirmation"
          placeholder="Password confirmation"
          required
        />
      </div>

      <b-btn class="btn-block" type="submit">
        {{ buttonText }}
      </b-btn>
    </b-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      info: {
        username: "",
        email: "",
        password: "",
        password_confirmation: ""
      }
    };
  },
  props: ["submitForm", "buttonText", "error", "isRegister"]
};
</script>

<style scoped>
.form-wrapper {
  position: fixed;
  height: 100%;
  width: 100%;
  top: 0;
}

.form-auth {
  width: 100%;
  max-width: 330px;
  padding: 0 15px;
}

button {
  margin-top: 20px;
}
</style>
