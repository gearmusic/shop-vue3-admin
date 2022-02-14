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
        name: 'home',
        path: 'home',
        component: () => import('@/views/home/Home.vue'),
        meta: { title: '首页', category: '首页' }
      },       
      {
        name: 'brand',
        path: 'brand',
        component: () => import('@/views/brand/Brand.vue'),
        meta: { title: '品牌管理', category: '商品管理' }
      }, 
      {
        name: 'spu',
        path: 'spu',
        component: () => import('@/views/spu/Spu.vue'),
        meta: { title: 'SPU管理', category: '商品管理' }
      }, 

    ]
    
  }, 

]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router