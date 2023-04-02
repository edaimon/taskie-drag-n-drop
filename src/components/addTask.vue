<template>
  <div class="my-2">
    <div class="flex justify-center">
      <button
        v-if="valueColumn === false"
        class="addBtt bg-orange w-max rounded-full mx-auto p-3 shadow shadow-black"
      >
        <img
          src="../img/icono_suma.png"
          @click="switchValueColumn()"
          alt="icono suma"
          width="20"
        />
      </button>
    </div>
    <div v-if="valueColumn === true" class="flex justify-around">
      <button>
        <img
          src="../img/confirm_icon.svg"
          @click="insert(column.id), switchValueColumn()"
          alt="edit icon"
          width="40"
          class="bg-white border-2 border-black hover:border-green-500 rounded-full p-1"
        />
      </button>
      <button>
        <img
          src="../img/cancel.svg"
          @click="switchValueColumn()"
          alt="cancel icon"
          width="40"
          class="bg-white border-2 border-black hover:border-red-500 rounded-full p-1"
        />
      </button>
    </div>

    <div
      v-if="valueColumn === true"
      class="flex flex-col p-2 m-4 gap-2 bg-white rounded-xl"
    >
      <input
        type="text"
        v-model="title"
        name="task"
        id="task"
        placeholder="title"
        class="inputFocus font-bold color-dark-blue uppercase border-b-2 borderColor pb-3 px-2"
      />
      <textarea
        @input="resize($event)"
        type="text"
        v-model="description"
        name="task"
        id="task"
        placeholder="description"
        class="inputFocus mt-5 px-2"
      />
    </div>
  </div>
</template>

<script>
import { mapStores } from "pinia";
import tasksStore from "../stores/tasks";
import userStore from "../stores/user";
import columnsStore from "../stores/columns";

export default {
  props: ["column"],

  data() {
    return {
      title: null,
      description: null,
      valueColumn: false,
    };
  },

  computed: {
    ...mapStores(tasksStore),
    ...mapStores(userStore),
    ...mapStores(columnsStore),
  },

  methods: {
    async insert(status) {
      let order = 0;
      if (this.tasksStore.tasks.length > 0) {
        order = this.tasksStore.getTasksByOrder + 1;
      }
      await this.tasksStore.insertTasks(
        this.userStore.user.id,
        this.title,
        this.description,
        status,
        order
      );
      await this.tasksStore.fetchTasks();
    },

    switchValueColumn() {
      if (this.valueColumn === true) {
        this.valueColumn = false;
      } else if (this.valueColumn === false) {
        this.valueColumn = true;
      }

      this.title = "";
      this.description = "";
    },

    resize(event) {
      event.target.style.height = "auto";
      event.target.style.height = `${event.target.scrollHeight}px`;
    },
  },
};
</script>

<style>
.addBtt {
  border-width: 3px;
  border-color: #fb8500;
}

.addBtt:hover {
  background-color: white;
  border-color: #fb8500;
}

.inputFocus:focus {
  outline: none !important;
  border: 2px solid #fb8500;
  border-radius: 10px;
}
</style>
