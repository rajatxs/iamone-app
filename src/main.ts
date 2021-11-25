import { createApp } from 'vue'
import router from './router'
import store from './store'

import App from './App.vue'
import { AppPlugin } from './plugins'

const app = createApp(App)

app.use(AppPlugin)
app.use(router)
app.use(store)
app.mount('#app')
