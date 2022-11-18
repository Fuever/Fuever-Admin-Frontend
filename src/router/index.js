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
    component:() => import('../views/HomeView.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
