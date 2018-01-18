import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/index/index'
import My from '@/components/my/my'
import Find from '@/components/find/find'
import PlayList from '@/components/playlist/playlist'
import PlayListInfo from '@/components/playListInfo/playListInfo'
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
    },
    {
      path: '/playlist',
      name: 'PlayList',
      component: PlayList,
      children: [
        {
          path: ':id',
          component: PlayListInfo
        }
      ]
    }
  ]
})
