<template>
  <q-item-label>
    <q-btn color="primary" @click="getItems()">Create Order</q-btn>
  </q-item-label>

  <q-dialog v-model="myModal">
    <q-card class="q-pa-lg full-width"
      ><h2>{{ restaurantName }}</h2>
      <q-list bordered>
        <q-item
          v-for="(item, index) in this.$store.getters.itemList"
          :key="index"
        >
          <q-item-section>
            <q-item-label>{{ item.description }}</q-item-label>
          </q-item-section>
          <q-item-section>
            <q-item-label align="right"
              ><q-btn label="Add Cart" @click="addCart(item)"></q-btn
            ></q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
      <q-btn
        class="q-mt-lg"
        color="primary"
        label="Add Order"
        @click="addOrder()"
      ></q-btn>
       <q-chip v-if="added" class="q-ml-lg" square color="green" text-color="white" >
        Product added..
      </q-chip>
      <q-chip v-if="error" class="q-ml-lg" square color="red" text-color="white" >
        The product could not be added
      </q-chip>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  data() {
    return {
      myModal: false,
      added:false,
      error:false,
      order: {
        resturantId: this.id,
        items: [],
      },
    };
  },
  props: {
    id: {
      required: true,
    },
    restaurantName: {
      required: true,
    },
  },
  methods: {
    getItems() {
      this.myModal = true;
      this.$appAxios.get(`/resturant/${this.id}`).then((res) => {
        this.$store.state.itemList = res.data.items;
      });
    },
    addCart(item) {
      this.order.items.push(item.id);
              this.added = true
      setTimeout(() => {
        this.added = false
      }, 500);
    },
    addOrder() {
      if (this.order.items.length > 1) {
        this.$appAxios
          .post(`/user/order`, this.order)
          .then((res) => {
            this.myModal = false;
            (this.order = {
              resturantId: this.id,
              items: [],
            }),
              console.log(res);
          })
          .catch((err) => {
            console.log(err);
          });
      }else{
        this.error = true
        setTimeout(() => {
            this.error = false
        }, 500);
      }
    },
  },
};
</script>

<style>
</style>