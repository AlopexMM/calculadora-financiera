import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/HomeView.vue'

const routes = [
  {
    path:'/',
    name: 'Home',
    component: Home
  },
  {
    path: '/salary',
    name: 'Salary',
    component: () => import('../views/SalaryView.vue'),
    props: true
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
