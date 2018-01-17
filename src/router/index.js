import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/index/index'
import My from '@/components/my/my'
import Find from '@/components/find/find'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/index',
      redirect: '/'
    },
    {
      path: '/my',
      name: 'My',
      component: My
    },
    {
      path: '/find',
      name: 'Find',
      component: Find
    }
  ]
})
