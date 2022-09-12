import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { Quasar } from 'quasar'
import quasarUserOptions from './quasar-user-options'
import appAxios from './utils/appAxios'
import store from './store'



const app = createApp(App).use(Quasar, quasarUserOptions)
app.use(router)
app.use(store)
app.config.globalProperties.$appAxios = appAxios
app.mount('#app')
