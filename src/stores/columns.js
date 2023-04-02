import { defineStore } from "pinia";
import { supabase } from "../supabase";

export default defineStore("columns", {
  state() {
    return {
      columns: [],
    };
  },

  getters: {
    getColumnsByOrder(state) {
      let orderColumns = state.columns.map((column) => column.order);
      return Math.max(...orderColumns);
    },
  },

  actions: {
    async fetchColumns() {
      const { data: columns } = await supabase
        .from("columns")
        .select("*")
        .order("order", { ascending: true });

      this.columns = columns;
    },

    async insertColumns(user, order) {
      const { error } = await supabase
        .from("columns")
        .insert({ user_id: user, order: order });
      if (error) throw error;
    },

    async updateTitleCol(title, id) {
      const { error } = await supabase
        .from("columns")
        .update({ title: title })
        .eq("id", id);

      if (error) throw error;
    },

    async moveColumns(id, order) {
      const { error } = await supabase
        .from("columns")
        .update({ order: order })
        .eq("id", id);
      if (error) throw error;
      this.fetchColumns();
    },

    async deleteColumns(id) {
      const { error } = await supabase.from("columns").delete("*").eq("id", id);
      if (error) throw error;
    },

    async orderColumn(id, order) {
      const { error } = await supabase
        .from("columns")
        .update({ order: order })
        .eq("id", id);
      if (error) throw error;
    },
  },
});
