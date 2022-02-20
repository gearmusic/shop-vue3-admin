import request from '@/libs/request'

import { Trademark } from '@/types/trademark'


export const reqTrademarkList = (pageSize: number, pageNo: number) => request({ url: `/admin/product/baseTrademark/${pageNo}/${pageSize}`, method: 'get' })

export const reqTrademarkListAll = () => request({ url: `/admin/product/baseTrademark/getTrademarkList`, method: 'get' })

export const reqTrademark = (id: number) => request({ url: `/admin/product/baseTrademark/get/${id}`, method: 'get' })

export const deleteTrademark = (id: number) => request({ url: `/admin/product/baseTrademark/remove/${id}`, method: 'delete' })

export const postTrademark = (trademark: Trademark) => request({ url: `/admin/product/baseTrademark/save`, method: 'post', data: trademark })

export const putTrademark = (trademark: Trademark) => request({ url: `/admin/product/baseTrademark/update`, method: 'put', data: trademark })

