import { createRouter, createWebHistory } from 'vue-router'
import mainApp from '../views/main-app.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // {
    //   path: '/',
    //   name: 'home',
    //   component: HomeView
    // },
    {
      path: '/main',
      name: 'main-app',
      component: mainApp
    },
  ]
})

export default router
