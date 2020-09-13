<template>
  <div>
    <UserAuthForm
      :submitForm="register"
      buttonText="Register"
      :error="error"
      :isRegister="true"
    />
  </div>
</template>

<script>
export default {
  middleware: "auth-logged",
  data() {
    return {
      error: null
    };
  },
  methods: {
    async register(registerInfo) {
      try {
        await this.$axios.post("api/users", {
          user: {
            username: registerInfo.username,
            email: registerInfo.email,
            password: registerInfo.password,
            password_confirmation: registerInfo.password_confirmation
          }
        });
        this.$auth.login({
          data: {
            user: {
              email: registerInfo.email,
              password: registerInfo.password
            }
          }
        });
      } catch (e) {
        this.error = e + "";
      }
    }
  }
};
</script>
