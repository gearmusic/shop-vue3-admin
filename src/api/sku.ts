import request from '@/libs/request'

import { Sku } from '@/types/sku'

export const reqList = (pageSize: number, pageNo: number) => 
  request({ url: `/admin/product/list/${pageNo}/${pageSize}`, method: 'get' })

export const reqListBySpuId = (spuId: number) => request({ url: `/admin/product/findBySpuId/${spuId}`, method: 'get' })

export const getIt = (id: number) => request({ url: `/admin/product/getSkuById/${id}`, method: 'get' })

export const deleteIt = (id: number) => request({ url: `/admin/product/deleteSku/${id}`, method: 'delete' })

export const addIt = (sku: Sku) => request({ url: `/admin/product/saveSkuInfo`, method: 'post', data: sku })

export const reqSkuCancelSale = (id: number) => request({ url: `/admin/product/cancelSale/${id}`, method: 'get' })

export const reqSkuOnSale = (id: number) => request({ url: `/admin/product/onSale/${id}`, method: 'get' })