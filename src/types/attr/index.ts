import { TagSelect } from '@/types'

export interface Attr {
  id: number,
  attrName: string,
  categoryId: number,
  categoryLevel: number,
  attrValueList: AttrValue[]
}

export interface AttrValue extends TagSelect{
  id: number,
  valueName: string,
  attrId: number,
}
