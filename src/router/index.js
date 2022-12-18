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
        path:'',
        name:'default',
        redirect:'/forum'
      },
      {
        path:'/forum',
        name:'forum',
        component:() => import('../components/home/contents/forum/ForumManage.vue')
      },
      {
        path:'/user',
        name:'user',
        component:() => import('../components/home/contents/user/UserManage.vue')
      },
      {
        path:'/news',
        name:'news',
        component:() => import('../components/home/contents/news/NewsManage.vue')
      },
      {
        path:'/new_news',
        name:'new_news',
        component:() => import('../components/home/contents/news/NewNews.vue')
      },
      {
        path:'/anniv',
        name:'anniv',
        component:() => import('../components/home/contents/anniv/AnnivManage.vue')
      },
      {
        path:'/new_anniv',
        name:'new_anniv',
        component:()=> import('../components/home/contents/anniv/NewAnniv.vue')
      },
      {
        path:'/gallery',
        name:'gallery',
        component:() => import('../components/home/contents/gallery/GalleryManage.vue')
      },
      {
        path:'/new_gallery',
        name:'new_gallery',
        component:()=> import('../components/home/contents/gallery/NewGallery.vue')
      },
      {
        path:'/personal',
        name:'personal',
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
