// Global CSS import
import './assets/main.css'
import './assets/custom.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

// TEMPORARY !!!
window.backendServer = '10.59.1.131:3000'
window.useBackend = false

//Setup vue + addons
const app = createApp(App)
app.use(createPinia())
app.use(router)

app.mount('#app')
