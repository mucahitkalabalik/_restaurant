<template>
  <q-btn
    class="q-ml-md"
    label="Show Orders"
    color="positive"
     outline
    @click="getOrders()"
  ></q-btn>
  <q-dialog v-model="modal">
    <q-card class="q-pa-lg full-width">
      <q-list bordered separator>
        <q-item
          v-ripple
          v-for="(item, index) in orderList"
          :key="index"
        >
          <q-item-section>Sipariş : {{ item.number }}</q-item-section>
          <q-item-section
            v-for="(oItem, index) in item.items"
            :key="index + oItem"
            >
            Ürün : {{oItem.description}}
            </q-item-section>
        </q-item>
      </q-list>
      <q-card-actions align="right">
        <q-btn class="q-mt-md" label="Cancel" @click="modal = false"></q-btn>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  data() {
    return {
      modal: false,
      orderList: [],
    };
  },
  methods: {
    getOrders() {
      this.modal = true;
      this.$appAxios
        .get("user/orders")
        .then((res) => (this.orderList = res.data));
    },
  },
};
</script>

<style>
</style>