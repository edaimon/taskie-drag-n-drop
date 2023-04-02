import { createApp, markRaw} from 'vue'
import { createPinia } from 'pinia'
import piniaPersist from "pinia-plugin-persist";

import App from './App.vue'
import router from './router'

import './assets/main.css'

const app = createApp(App)
const pinia = createPinia()
  .use(piniaPersist);

pinia.use(({ store }) => {
    store.$router = markRaw(router);
  });
app.use(pinia)
app.use(router)

app.mount('#app')



