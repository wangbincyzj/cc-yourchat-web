import { createApp } from "vue"
import App from "./App.vue"
import "element-plus/dist/index.css"
import router from "./router"
import { createPinia } from "pinia"
import "@/assets/stylesheets/index.scss"

createApp(App)
  .use(createPinia())
  .use(router)
  .mount("#app")
