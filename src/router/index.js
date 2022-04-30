import { createRouter, createWebHistory } from 'vue-router'
import jwt_decode from "jwt-decode";
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import ProfileView from '../views/ProfileView.vue'
import store from '../store/index'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { requiresAuth: true }
    },
    {
      path: '/profile',
      name: 'profile',
      component: ProfileView,
      meta: { requiresAuth: true }
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: { requiresAuth: false }
    }
  ]
})

router.beforeEach((to, from, next) => {
  const token = JSON.parse(localStorage.getItem('token'))
  const user = JSON.parse(localStorage.getItem('user'))
  if (token) {
    const decodedToken = jwt_decode(token)
    const expDate = new Date(Number(decodedToken.exp) * 1000)
    const nowDate = new Date()
    if (expDate - nowDate > 0) {
      store.commit('setCredentials', { user, token })
    } else {
      store.dispatch('logout')
    }
  }
  const isAuthenticated = store.state.isAuthenticated
  if (!to.meta.requiresAuth) {
    if (!isAuthenticated) {
      next()
    } else {
      next({ name: 'home' })
    }
  } else {
    if (isAuthenticated) {
      next()
    } else {
      next({ name: 'login' })
    }
  }
})

export default router