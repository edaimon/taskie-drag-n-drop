<template>
  <div
    v-if="value === false"
    class="flex flex-col bg-white rounded-lg p-2 cardsHeight"
  >
    <div
      class="font-bold color-dark-blue uppercase border-b-2 borderColor pb-3 px-2"
    >
      {{ item.title }}
    </div>
    <div class="mt-5 px-2">{{ item.description }}</div>

    <div id="icons" class="flex justify-end gap-5 min-w-fit">
      <button>
        <img
          src="../img/delete.svg"
          @click="deleteTask(item.id)"
          alt="delete icon"
          width="15"
          class="hover:scale-125"
        />
      </button>
      <button>
        <!-- MODIFICAR TASK -->
        <img
          src="../img/edit.svg"
          @click="switchValue(id)"
          alt="edit icon"
          width="15"
          class="hover:scale-125"
        />
      </button>
    </div>
  </div>

  <div
    v-if="value === true"
    class="bg-white p-2 flex flex-col gap-2 my-2 rounded-xl cardsHeight"
  >
    <input
      type="text"
      v-model="item.title"
      name="item.id"
      id="item.id"
      placeholder="Introduce your new title"
      class="inputFocus font-bold color-dark-blue uppercase border-b-2 borderColor pb-3 px-2"
    />
    <textarea
      @input="resize($event)"
      type="text"
      v-model="item.description"
      name="item.id"
      id="item.id"
      placeholder="Introduce your new description"
      class="inputFocus textarea mt-3 px-2"
    />
    <div class="flex justify-end min-w-fit">
      <button>
        <img
          src="../img/confirm_icon.svg"
          @click="
            editTask(item.id, item.title, item.description), switchValue()
          "
          alt="edit icon"
          width="20"
          class="hover:scale-125 mt-2"
        />
      </button>
    </div>
  </div>
</template>

<script>
import { mapStores } from "pinia";
import tasksStore from "../stores/tasks";
import userStore from "../stores/user";
export default {
  data() {
    return {
      value: false,
    };
  },
  computed: {
    ...mapStores(tasksStore),
    ...mapStores(userStore),
    checkStatus() {
      return this.item.status === 3;
    },
  },

  props: ["item"],

  methods: {
    async editTask(id, title, description) {
      await this.tasksStore.updateTasks(id, title, description);
    },

    async deleteTask(id) {
      await this.tasksStore.deleteTasks(id);
      await this.tasksStore.fetchTasks();
    },

    switchValue() {
      if (this.value === true) {
        this.value = false;
      } else if (this.value === false) {
        this.value = true;
      }
    },

    resize(event) {
      event.target.style.height = "auto";
      event.target.style.height = `${event.target.scrollHeight}px`;
    },
  },
};
</script>

<style>
.borderColor {
  border-color: #fb8500;
}
.cardsHeight {
  min-height: 5rem;
}

.textarea {
  width: 100%;
  outline: none;
  min-height: 50px;
  box-sizing: border-box;
}

.inputFocus:focus {
  outline: none !important;
  border-color: #fb8500;
}
</style>
