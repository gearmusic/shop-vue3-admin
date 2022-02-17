export interface Attr{
  id: number,
  attrName: string,
  categoryId: number,
  categoryLevel: number,
  attrValueList: AttrValue[]
}

export interface AttrValue{
  id: number,
  valueName: string,
  attrId: number,
  selected: boolean
}
