// /store/user.js

import { defineStore } from "pinia";
import { supabase } from "../supabase";

export default defineStore("user", {
  state() {
    return {
      user: null,
    };
  },

  actions: {

    async fetchUser() {
      const user = await supabase.auth.user();
      this.user = user;
    },

    async signUp(email, password) {

      const response = await supabase.auth.signUp({
        email: email,
        password: password,
      });
      const error = response.error;

      if (error) throw error;
      return 1;
    },

    async signIn(email, password) {
      try{
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });
      if (error) throw error;
      if (data.user) {
        this.user = data.user;
        return 0;
        }
      } catch(error){
        errorMsg.value = 'Error: ${error.message}';
        setTimeout(() => {
            error.Msg.value = null;
        },5000);
      }
    },

    async signOut() {
      const { error } = await supabase.auth.signOut();
      this.user = null;
    },
  },
  persist: {
    enabled: true,
    strategies: [
      {
        key: "user",
        storage: localStorage,
      },
    ],
  },
});
