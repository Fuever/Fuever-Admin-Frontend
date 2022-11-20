import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect:'/entry'
  },
  {
    path: '/entry',
    name: 'entry-page',
    component: () => import('../views/EntryView.vue')
  },
  {
    path:'/home',
    name:'home-page',
    component:() => import('../views/HomeView.vue'),
    default:'/forum',
    children:[
      {
        path:'/forum',
        component:() => import('../components/home/contents/forum/ForumManage.vue')
      },
      {
        path:'/user',
        component:() => import('../components/home/contents/user/UserManage.vue')
      },
      {
        path:'/news',
        component:() => import('../components/home/contents/news/NewsManage.vue')
      },
      {
        path:'/anniv',
        component:() => import('../components/home/contents/anniv/AnnivManage.vue')
      },
      {
        path:'/personal',
        component:() => import('../components/home/contents/personal/PersonalCenter.vue')
      },
    ]
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
