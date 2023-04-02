import { defineStore } from "pinia";
import { supabase } from "../supabase";

export default defineStore("tasks", {
  state() {
    return {
      tasks: [],
      id: null,
      title: null,
    };
  },

  getters: {
    getTasksByStatus(state) {
      return function (taskStatus) {
        return state.tasks.filter((task) => task.status === taskStatus);
      };
    },
    getTasksByOrder(state) {
      let orderTasks = state.tasks.map((task) => task.order);
      return Math.max(...orderTasks);
    },
  },

  actions: {
    async fetchTasks() {
      const { data: tasks } = await supabase
        .from("tasks")
        .select("*")
        .order("order", { ascending: true });

      this.tasks = tasks;
    },

    async insertTasks(user, title, description, status, order) {
      const { error } = await supabase
        .from("tasks")
        .insert({
          user_id: user,
          title: title,
          description: description,
          status: status,
          order: order,
        });
      if (error) throw error;
    },

    async updateTasks(id, title, description) {
      const { error } = await supabase
        .from("tasks")
        .update({ title: title, description: description })
        .eq("id", id);
      if (error) throw error;
    },

    async deleteTasks(id) {
      const { error } = await supabase.from("tasks").delete("*").eq("id", id);
      if (error) throw error;
    },

    async moveTask(id, status, order) {
      const { error } = await supabase
        .from("tasks")
        .update({ status: status, order: order })
        .eq("id", id);
      if (error) throw error;
    },
    async orderTask(id, order) {
      const { error } = await supabase
        .from("tasks")
        .update({ order: order })
        .eq("id", id);
      if (error) throw error;
    },
  },
});
