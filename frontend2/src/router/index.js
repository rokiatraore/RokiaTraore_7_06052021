import Login from '../views/Login.vue'
import Profile from '../views/Profile.vue'
import Posts from '../views/Posts.vue'
import GetOnePost from '../views/GetOnePost.vue'

const routes = [
  {
    path: '/',
    name: 'LoginBody',
    component: Login
  },
  {
    path: '/profile',
    name: 'ProfileBody',
    component: Profile
  },
  {
    path: '/posts',
    name: 'PostsBody',
    component: Posts
  },
  {
    path: '/post/:id',
    name: 'GetOnePostBody',
    component: GetOnePost,
  }
]


export default routes;
