import Vue from 'vue'
import Router from 'vue-router'
import Visit from '@/components/Visit'
import VisitList from '@/components/VisitList'
import ExaminationList from '@/components/ExaminationList'
import Examination from '@/components/Examination'
import PrescriptList from '@/components/PrescriptList'
import Prescript from '@/components/Prescript'
import Home from '@/components/Home'
import Login from '@/components/Login'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/visit/:id?',
      name: 'Visit',
      component: Visit
    },
    {
      path: '/visit-list',
      name: 'VisitList',
      component: VisitList
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
    },
    {
      path: '/examination-list',
      name: 'ExaminationList',
      component: ExaminationList
    },
    {
      path: '/prescript-list',
      name: 'PrescriptList',
      component: PrescriptList
    },
    {
      path: '/prescript/:id?',
      name: 'Prescript',
      component: Prescript
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }
  ]
})
