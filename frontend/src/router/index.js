import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/SignUp.vue'

const routes = [
  {
    path: '/',
    name: 'HomeSignUp',
    component: Home
  },
  
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
