<template>
  <h2
    v-if="switchTitle === false"
    @dblclick="switchTitle = !switchTitle"
    class="p-5 text-3xl font-bold text-center"
  >
    {{ column.title }}
  </h2>

  <form
    action="submit"
    @submit.prevent="
      columnsStore.updateTitleCol(column.title, column.id);
      switchTitle = !switchTitle;
    "
  >
    <input
      v-model="column.title"
      type="text"
      v-if="switchTitle === true"
      class="p-5 text-3xl font-bold text-center bg-transparent rounded-3xl outline-none w-full"
    />
  </form>
  <div v-if="switchTitle === true" class="flex justify-center pb-5">
    <button>
      <img
        @click="deleteColumn(column.id)"
        src="../img/delete.svg"
        alt="delete icon"
        width="20"
      />
    </button>
  </div>
</template>

<script>
import { mapStores } from "pinia";
import columnsStore from "../stores/columns";

export default {
  data() {
    return {
      switchTitle: false,
    };
  },
  computed: {
    ...mapStores(columnsStore),
  },
  props: ["column"],

  methods: {
    async deleteColumn(id) {
      await this.columnsStore.deleteColumns(id);
      await this.columnsStore.fetchColumns();
    },
  },
};
</script>

<style></style>
