import request from '@/libs/request'

import { Attr, AttrValue } from '@/types/attr'
import { SelectCategoryId } from '@/types/category'

export const reqAttrList = (selectCategoryId: SelectCategoryId) => 
  request({ url: `/admin/product/attrInfoList/${ selectCategoryId.categoryId1 }/${ selectCategoryId.categoryId2 }/${ selectCategoryId.categoryId3 }`, method: 'get' })

export const postUpdAttr = (attr: Attr) => 
  request({ url: `/admin/product/saveAttrInfo`, method: 'post', data: attr })

export const deletetAttr = (attrId: number) => 
  request({ url: `/admin/product/deleteAttr/${attrId}`, method: 'delete' })