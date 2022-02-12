import { createRouter, createWebHashHistory } from 'vue-router'

export const routes = [
  {
    path: '/',
    redirect: '/index',
  },  
  {
    name: 'index',
    path: '/index',
    component: () => import('@/views/index/Index.vue'),
  },  
  {
    name: 'home',
    path: '/home',
    component: () => import('@/views/home/Home.vue'),
  },
  
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router