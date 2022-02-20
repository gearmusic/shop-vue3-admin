import request from '@/libs/request'

import { Spu } from '@/types/spu'

export const reqSpuList = (category3Id: number, pageSize: number, pageNo: number) => 
  request({ url: `/admin/product/${pageNo}/${pageSize}?category3Id=${category3Id}`, method: 'get' })

export const getIt = (spuId: number) => request({ url: `/admin/product/getSpuById/${spuId}`, method: 'get' })

export const deleteIt = (spuId: number) => request({ url: `/admin/product/deleteSpu/${spuId}`, method: 'delete' })

export const saveIt = (spu: Spu) => request({ url: `/admin/product/updateSpuInfo`, method: 'post', data: spu })

export const addIt = (spu: Spu) => request({ url: `/admin/product/saveSpuInfo`, method: 'post', data: spu })