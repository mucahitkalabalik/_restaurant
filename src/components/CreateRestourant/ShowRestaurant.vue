<template>
  <div>
    <h2>All Restaurant</h2>
    <q-list separator bordered>
      <q-item
        v-for="(item, index) in this.$store.getters.restaurantList"
        :key="index"
      >
        <q-item-section>
          <q-item-label>Name: {{ item.name }}</q-item-label>
        </q-item-section>
        <q-item-section>
          <q-item-label>Phone: {{ item.phone }}</q-item-label>
        </q-item-section>
          <restaurant-items :restaurant="item.id"/>
        <q-item-section>
        </q-item-section>
        <q-item-section>
          <show-item :id="item.id" :restaurantName="item.name"/>
        </q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<script>
import ShowItem from '../ShowItem/ShowItem.vue';
import RestaurantItems from './RestaurantItems.vue';
export default {
  components: { ShowItem, RestaurantItems  },
  data() {
    return {
      alert: false,
    };
  },
  created() {
    this.getRestaurant();
  },
  methods: {
    getRestaurant() {
      this.$appAxios.get("/resturant").then((res) => {
        this.$store.state.restaurantList = res.data;
      });
    },
  },
};
</script>

<style>
</style>