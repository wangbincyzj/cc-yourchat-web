import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router"

const routes: Array<RouteRecordRaw> = [
  {
    name: "login",
    path: "/login",
    component: () => import("@/views/login/login.vue"),
    meta: {
      fullScreen: true
    }
  },
  {
    name: "config",
    path: "/config",
    component: () => import("@/views/config/config.vue")
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router