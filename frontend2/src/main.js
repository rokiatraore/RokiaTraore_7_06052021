import Vue from 'vue'
import App from './App.vue'
import  store  from './store'
import VueRouter from 'vue-router'
import routes from './router'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(VueRouter)

const router = new VueRouter ({ 
    routes : routes , 
    mode : 'history' 
})

new Vue ({
    el: '#app',
    store,
    router: router,
    render: h => h(App),
})