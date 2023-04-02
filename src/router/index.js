import { createRouter, createWebHistory } from "vue-router";

import Dashboard from "../views/Dashboard.vue";
import SignUp from "../views/SignUp.vue";
import { supabase } from "../supabase";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: "/", name: "signup", component: SignUp },
    { path: "/Dashboard", name: "dashboard", component: Dashboard },
  ],
});

router.beforeEach(async (to) => {
  const userAuth = await supabase.auth.getSession();
  const isLoggedIn = userAuth.data.session !== null;

  if (isLoggedIn && to.name === "signup") {
    return "/dashboard";
  }
  if (!isLoggedIn && to.name !== "signup") {
    return "/";
  }
});

export default router;
