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
        name: 'attr',
        path: 'attr',
        component: () => import('@/views/attr/Attr.vue'),
        meta: { title: '平台属性管理', category: '商品管理' }
      },         
      {
        name: 'trademark',
        path: 'trademark',
        component: () => import('@/views/trademark/Trademark.vue'),
        meta: { title: '品牌管理', category: '商品管理' }
      }, 
      {
        name: 'spu',
        path: 'spu',
        component: () => import('@/views/spu/Spu.vue'),
        meta: { title: 'SPU管理', category: '商品管理' }
      },
      {
        name: 'sku',
        path: 'sku/:spuId?',
        component: () => import('@/views/sku/Sku.vue'),
        meta: { title: 'SKU管理', category: '商品管理' }
      },

      {
        name: '用户管理',
        path: 'user',
        component: () => import('@/views/user/User.vue'),
        meta: { title: '用户管理', category: '系统管理' }
      },
      {
        name: '角色管理',
        path: 'role',
        component: () => import('@/views/role/Role.vue'),
        meta: { title: '角色管理', category: '角色管理' }
      }
    ]
  }, 

]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})



export default router