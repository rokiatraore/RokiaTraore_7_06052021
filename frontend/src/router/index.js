import { createRouter, createWebHashHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Profile from '../views/Profile.vue'
import Posts from '../views/Posts.vue'

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
  {
    path: '/posts',
    name: 'homePosts',
    component: Posts
  },
 
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router;
