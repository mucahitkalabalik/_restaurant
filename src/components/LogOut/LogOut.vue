<template>
  <q-btn label="LOGOUT" color="red" align="right" @click="logout()"></q-btn>
</template>

<script>
export default {
 methods: {
     logout(){
         localStorage.removeItem("user");
         this.$store.state.user = null
         this.$router.push("/login")
     }
 },
}
</script>

<style>

</style>