import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router"

const routes: Array<RouteRecordRaw> = [
  {
    name: "login",
    path: "/login",
    component: () => import("@/views/login/Login.vue"),
    meta: {
      fullScreen: true
    }
  },
  {
    name: "config",
    path: "/config",
    component: () => import("@/views/config/Config.vue")
  },
  {
    name: "chat",
    path: "/chat",
    component: () => import("@/views/chat/Chat.vue")
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
