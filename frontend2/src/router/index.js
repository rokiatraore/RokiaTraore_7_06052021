import Login from '../views/Login.vue'
import Profile from '../views/Profile.vue'
import Posts from '../views/Posts.vue'
import CreatePost from '../views/CreatePost.vue'

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
    path: '/newpost/',
    name: 'CreatePostBody',
    component: CreatePost,
  }
]


export default routes;
