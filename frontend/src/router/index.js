import { createRouter, createWebHashHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Profile from '../views/Profile.vue'

const routes = [
  {
    path: '/login',
    name: 'HomeSignUp',
    component: Login
  },
  {
    path: '/profile',
    name: 'homeProfile',
    component: Profile
  },
 
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router;
