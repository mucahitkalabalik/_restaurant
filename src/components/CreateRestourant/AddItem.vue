<template>
  <q-btn label="Create Item"  color="secondary" @click="modal = true"></q-btn>
  <q-dialog v-model="modal">
    <q-card class="q-pa-lg full-width">
       <q-input
        class="q-mt-md"
        v-model="newItem.name"
        outlined
        label="Item Name"
      ></q-input>
      <q-input
        class="q-mt-md"
        v-model="newItem.description"
        outlined
        label="Item Description"
      ></q-input>
      <q-input
        class="q-mt-md"
        v-model="newItem.price"
        outlined
        label="Item Price"
      ></q-input>
      <q-card-actions align="right">
        <q-btn
          class="q-mt-md"
          label="Add"
          color="primary"
          @click="addItem()"
        ></q-btn>
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
      newItem: {
        name: null,
        description: null,
        price: null,
      },
    };
  },
  methods: {
    addItem() {
      this.newItem.price = parseInt(this.newItem.price);
      this.$appAxios
        .post("/item", this.newItem)
        .then((res) => console.log(res))
        .catch((err) => console.log(err));

      this.newItem = {
        name: this.restaurant,
        description: null,
        price: null,
      };
      this.modal = false;
    },
  },
};
</script>

<style>
</style>