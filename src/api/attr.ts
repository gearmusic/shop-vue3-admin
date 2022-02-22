import request from '@/libs/request'

import { Attr } from '@/types/attr'
import { Category } from '@/types/category'

export const reqAttrList = (category: Category) => 
  request({ url: `/admin/product/attrInfoList/${ category.category1Id }/${ category.category2Id }/${ category.category3Id }`, method: 'get' })

export const postUpdAttr = (attr: Attr) => 
  request({ url: `/admin/product/saveAttrInfo`, method: 'post', data: attr })

export const deletetAttr = (attrId: number) => 
  request({ url: `/admin/product/deleteAttr/${attrId}`, method: 'delete' })