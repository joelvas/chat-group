import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index'
import GAuth from 'vue3-google-oauth2'

const app = createApp(App)

const gAuthOptions = {
  clientId: '138302178510-s9r8h4af5m243j7a0pj1thf36tjaj9qf.apps.googleusercontent.com',
  scope: 'email', prompt: 'consent', fetch_basic_profile: true
}
app.use(GAuth, gAuthOptions)

app.use(router)
app.use(store)
app.mount('#app')
