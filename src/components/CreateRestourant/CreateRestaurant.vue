<template>
  <q-btn
    class="q-mr-md q-my-md"
    label="Create Restaurant"
    color="primary"
    @click="modal = true"
  />

  <q-dialog v-model="modal" persistent>
    <q-card class="q-pa-lg full-width">
      <q-input
        class="q-mt-md"
        v-model="restaurant.name"
        outlined
        label="Restaurant Name"
      ></q-input>
      <q-input
        class="q-mt-md"
        v-model="restaurant.phone"
        outlined
        label="Restaurant Phone"
      ></q-input>
      <q-card-actions align="right">
        <q-btn label="Save" color="primary" @click="addRestaurant()"></q-btn>
        <q-btn label="Cancel" @click="modal = false"></q-btn>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  computed() {
    console.log(this.getRestaurant());
  },
  data() {
    return {
      modal: false,
      restaurant: {
        name: null,
        phone: null,
      },
    };
  },
  methods: {
    addRestaurant() {
      this.$appAxios
        .post("/resturant", this.restaurant)
        .then((res) => {
          console.log(res);
          this.modal = false;
          this.getRestaurant()
        })
        .catch((err) => {
          console.log(err);
        });
    },
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