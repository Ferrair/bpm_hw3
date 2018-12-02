import Vue from 'vue'
import Router from 'vue-router'
import Visit from '@/components/Visit'
import Examination from '@/components/Examination'
import Home from '@/components/Home'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/visit/:id?',
      name: 'Visit',
      component: Visit
    },
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/examination/:id?',
      name: 'Examination',
      component: Examination
    }
  ]
})
