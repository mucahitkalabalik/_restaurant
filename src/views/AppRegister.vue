<template>
  <div id="login">
    <div class="login-title" color="deep-orange">Register</div>
    <div class="input-line">
      <q-input v-model="user.email" filled type="email" label="Email" />
      <q-input
        filled
        v-model="user.fullName"
        class="q-mt-sm"
        color="orange"
        label="Name"
      />
      <q-input
        class="q-mt-sm"
        color="orange"
        v-model="user.password"
        filled
        type="password"
        label="Password"
      />
      <div class="btns q-mt-md">
        <q-btn
          class="q-mr-md"
          color="deep-orange"
          label="Register"
          @click="UserRegister()"
        />
        <router-link to="/login">
          <q-btn color="deep-orange" flat label="Login"
        /></router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        email: null,
        fullName: null,
        password: null,
      },
    };
  },
  methods: {
    UserRegister() {

      this.$appAxios
        .post("/auth/local/signup", { ...this.user })
        .then((res) => {
          this.$router.push("/")
          this.$store.commit("setToken", { token: res.data.access_token , refreshToken:res.data.refresh_token });
        })
        .catch((err) => {
          console.log(err);
        })
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
.login-title {
  font-size: 3rem;
  color: #ff5722 !important;
  padding-bottom: 50px;
  text-decoration: underline;
}
.input-line {
  min-width: 400px;
}
</style>