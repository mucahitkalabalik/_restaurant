<template>
  <div id="login">
    <div class="login-title" color="deep-orange">Login</div>
    <div class="input-line">
      <q-input filled v-model="loginUser.email" color="orange" label="Name" />
      <q-input
        class="q-mt-sm"
        color="orange"
        v-model="loginUser.password"
        filled
        type="password"
        label="Password"
      />
      <div class="btns q-mt-md">
        <q-btn
          class="q-mr-md"
          color="deep-orange"
          label="Login"
          :loading="loading"
          @click="login()"
        />
        <router-link to="/register">
          <q-btn color="deep-orange" flat label="Register"
        /></router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loginUser: {
        email: "mucahit19@gmail.com",
        password: "mucahit123",
      },
      loading: false,
    };
  },
  methods: {
    login() {
      this.loading = true;
      this.$appAxios
        .post("/auth/local/signin", this.loginUser)
        .then((res) => {
          this.$router.push("/");
          this.$store.commit("setUser", JSON.parse(res.config.data));
          this.$store.commit("setToken", { token: res.data.access_token , refreshToken:res.data.refresh_token });
        })
        .catch((err) => {
          alert(err.message);
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
};
</script>


<style>
#login {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  min-height: 100vh;
}
.input-line {
  margin-top: 100px;
  min-width: 400px;
}
</style>