<template>
  <div
    v-for="column in columnsStore.columns"
    :key="column.id"
    class="flex flex-col shrink-0 bg-gradient-to-r from-cyan-500 to-blue-500 lg:w-1/4 rounded-3xl shadow-lg shadow-blue-500 w-3/4 mt-10 max-w-md"
    draggable="true"
    @dragstart="startDragCol($event, column)"
    @drop="onDropAux($event, column.order, column.id)"
    @dragover.prevent
    @dragenter.prevent
  >
    <editTitleCol :column="column" />

    <div
      v-for="item in tasksStore.getTasksByStatus(column.id)"
      :key="item.id"
      draggable="true"
      @dragstart="startDrag($event, item)"
      @drop="dropCards($event, item.order, column.id)"
      @dragover.prevent
      @dragenter.prevent
      class="flex flex-col"
    >
      <div
        v-if="item.status === column.id"
        class="mx-3 my-3 p-2 bg-white rounded-xl shadow-md shadow-gray-400"
      >
        <cards :item="item" />
      </div>
    </div>

    <addTask :column="column" />
  </div>
</template>

<script>
import { mapStores } from "pinia";
import tasksStore from "../stores/tasks";
import userStore from "../stores/user";
import columnsStore from "../stores/columns";
import cards from "./cards.vue";
import addTask from "./addTask.vue";
import editTitleCol from "./editTitleCol.vue";

export default {
  data() {
    return {
      status: null,
      titleColumn: null,
    };
  },

  components: {
    cards,
    addTask,
    editTitleCol,
  },
  computed: {
    ...mapStores(tasksStore),
    ...mapStores(userStore),
    ...mapStores(columnsStore),
  },
  methods: {
    onDropAux(event, order, state) {
      if (event.dataTransfer.getData("itemId")) {
        this.onDrop(event, state);
      } else {
        this.onDropCol(event, order);
      }
    },

    startDrag(event, item) {
      event.dataTransfer.setData("itemId", item.id);
    },
    onDrop(event, state) {
      const itemId = event.dataTransfer.getData("itemId");
      let item = this.tasksStore.tasks.find((item) => item.id == itemId);
      item.status = state;
      this.tasksStore.moveTask(itemId, state);
    },

    startDragCol(event, column) {
      event.dataTransfer.setData("colId", column.id);
    },
    onDropCol(event, order) {
      const colId = event.dataTransfer.getData("colId");
      let col = this.columnsStore.columns.find((column) => column.id == colId);

      let columnsBelow = this.columnsStore.columns.filter(
        (column) => column.order > col.order && column.order <= order
      );

      let columnsAbove = this.columnsStore.columns.filter(
        (column) => column.order < col.order && column.order >= order
      );

      if (order > col.order) {
        columnsBelow.forEach(async (column) => {
          column.order--;
          await this.columnsStore.orderColumn(column.id, column.order);
        });
      } else if (order < col.order) {
        columnsAbove.forEach(async (column) => {
          column.order++;
          await this.columnsStore.orderColumn(column.id, column.order);
        });
      }

      col.order = order;
      this.columnsStore.moveColumns(colId, order);
    },
    async dropCards(event, order, column) {
      const itemId = event.dataTransfer.getData("itemId");
      let item = this.tasksStore.tasks.find((item) => item.id == itemId);
      if (column === item.status) {
        let actualTasks = this.tasksStore.getTasksByStatus(item.status);

        let tasksBelow = actualTasks.filter(
          (task) => task.order > item.order && task.order <= order
        );
        let tasksAbove = actualTasks.filter(
          (task) => task.order < item.order && task.order >= order
        );

        if (order > item.order) {
          tasksBelow.forEach(async (task) => {
            task.order--;
            await this.tasksStore.orderTask(task.id, task.order);
          });
        } else if (order < item.order) {
          tasksAbove.forEach(async (task) => {
            task.order++;
            await this.tasksStore.orderTask(task.id, task.order);
          });
        }
      } else if (column != item.status) {
        let actualTasks = this.tasksStore.getTasksByStatus(column);
        let tasks = actualTasks.filter((task) => task.order >= order);
        tasks.forEach(async (task) => {
          task.order++;
          await this.tasksStore.orderTask(task.id, task.order);
        });
      }

      item.order = order;
      await this.tasksStore.orderTask(item.id, order);
      await this.tasksStore.fetchTasks();
    },
  },
  mounted() {
    this.tasksStore.fetchTasks();
    this.columnsStore.fetchColumns();
  },
};
</script>

<style></style>
