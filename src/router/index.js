import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/index/index'
import My from '@/components/my/my'
import Find from '@/components/find/find'
import PlayList from '@/components/playlist/playlist'
import PlayListInfo from '@/components/playListInfo/playListInfo'
import TopList from '@/components/top-list/top-list'
import TopListInfo from '@/base/top-list-info/top-list-info'
import Singer from '@/components/singer/singer'
import SingerDetail from '@/components/singer-detail/singer-detail'
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
      path: '/search',
      name: 'search',
      component: Find
    },
    {
      path: '/playlist',
      name: 'PlayList',
      component: PlayList
    },
    {
      path: '/playlist/:id',
      component: PlayListInfo
    },
    {
      path: '/toplist',
      component: TopList,
      children: [
        {
          path: ':id',
          component: TopListInfo
        }
      ]
    },
    {
      path: '/Singer',
      name: 'singer',
      component: Singer,
      children: [
        {
          path: ':id',
          component: SingerDetail
        }
      ]
    }
  ]
})
