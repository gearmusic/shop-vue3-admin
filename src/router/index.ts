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
    name: 'dashboard',
    path: '/dashboard',
    component: () => import('@/views/dashboard/Dashboard.vue'),
    children: [
      {
        path: '',
        redirect: '/dashboard/home',
      },
      {
        name: 'home',
        path: 'home',
        component: () => import('@/views/home/Home.vue'),
      },       
      {
        name: 'brand',
        path: 'brand',
        component: () => import('@/views/brand/Brand.vue'),
      }, 
      {
        name: 'spu',
        path: 'spu',
        component: () => import('@/views/spu/Spu.vue'),
      }, 

    ]
    
  }, 

]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router