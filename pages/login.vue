<template>
  <div>
    <UserAuthForm :submitForm="login" buttonText="Login" :error="error" />
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
    login: function(loginInfo) {
      this.$auth
        .login({
          data: {
            user: {
              email: loginInfo.email,
              password: loginInfo.password
            }
          }
        })
        .then(() => {
          this.$toast.success("Successfully authenticated");
        })
        .catch(error => {
          this.$toast.error("Wrong email or password");
        });
    }
  }
};
</script>
