import request from '@/libs/request'

export const reqCategory1List = () => request({ url: `/admin/product/getCategory1`, method: 'get' })

export const reqCategory2List = (categortId1: number) => request({ url: `/admin/product/getCategory2/${ categortId1 }`, method: 'get' })

export const reqCategory3List = (categortId2: number) => request({ url: `/admin/product/getCategory3/${ categortId2 }`, method: 'get' })