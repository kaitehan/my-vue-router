import Vue from 'vue'
import Router from './my-vue-router'

import Login from './components/Login.vue'
import Home from './components/Home.vue'
import Users from '@/components/Users'
import About from '@/components/About'

Vue.use(Router)

export default new Router({
  // model: 'history',
  routes: [
    { path: '/', component: Home },
    { path: '/login', component: Login },
    {
      path: '/about',
      component: About,
      children: [
        { path: 'users', component: Users }
      ]
    }
  ]
})
