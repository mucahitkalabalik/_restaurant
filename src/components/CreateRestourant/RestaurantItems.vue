<template>
  <q-btn
    label="Restaurant Add Product"
    color="secondary"
    @click="checkItems()"
  ></q-btn>
  <q-dialog v-model="modal">
    <q-card class="q-pa-lg full-width">
      <q-select
        v-model="selectedItem"
        transition-show="scale"
        transition-hide="scale"
        :options="showList"
        label="Select"
      />
      <q-card-actions align="right">
        <q-btn
          class="q-mt-md"
          label="Add"
          color="primary"
          @click="addItems()"
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
      showList: [],
      ItemsList: null,
      selectedItem: null,
      addItem: {
        id: null,
        restId: null,
      },
    };
  },
  props: {
    restaurant: {
      required: true,
    },
  },
  methods: {
    checkItems() {
      this.modal = true;
      this.$appAxios
        .get("/item")
        .then((res) => {
          this.ItemsList = res.data;
          this.ItemsList.forEach((element) => {
            this.showList.push(element.description);
          });
        })
        .catch((err) => console.log(err));
        this.addItem = {
        id: null,
        restId: null,
      }
    },
    addItems() {
      const addItem = this.ItemsList.filter((item) => {
        return item.description == this.selectedItem;
      });

      const addedItem = {
        itemId: addItem[0].id,
        resturantId: this.restaurant,
      };
      console.log(`resturant/item/${this.restaurant}`);

      this.$appAxios
        .put(`resturant/item/${this.restaurant}`, addedItem)
        .then((res) => console.log(res))
        .catch((err) => console.log(err));

      this.modal = false;
    },
  },
};
</script>

<style>
</style>