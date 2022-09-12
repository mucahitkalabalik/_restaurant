<template>
  <div>
    <show-restaurant />
    <create-restourant />
    <add-item />
    <show-order />
    <div><log-out /></div>
  </div>
</template>

<script>
import CreateRestourant from "@/components/CreateRestourant/CreateRestaurant.vue";
import ShowRestaurant from "@/components/CreateRestourant/ShowRestaurant.vue";
import AddItem from "@/components/CreateRestourant/AddItem.vue";
import ShowOrder from "@/components/ShowOrder/ShowOrder.vue";
import LogOut from "@/components/LogOut/LogOut.vue";
export default {
  components: { CreateRestourant, ShowRestaurant, AddItem, ShowOrder, LogOut },
  data() {
    return {
      user: this.$store.state.user,
    };
  },
};
</script>
<style>
.logOut {
  position: absolute;
  top: 0;
  right: 0;
}
</style>
