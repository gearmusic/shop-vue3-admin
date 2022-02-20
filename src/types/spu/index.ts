import { TagSelect, FileUploadImg } from '@/types'

export interface Spu {
  id: number,
  spuName: string,
  category3Id: number,
  description: string,
  spuImageList: SpuImg[] | null
  spuSaleAttrList: SpuSaleAttr[]
  tmId: number
}

export interface SpuSaleAttr {
  baseSaleAttrId: number,
  id: number
  saleAttrName: string,
  spuId: number,
  spuSaleAttrValueList: SpuSaleAttrValue[]
}

export interface SpuSaleAttrValue extends TagSelect {
  baseSaleAttrId?: number,
  id?: number,
  isChecked?: string,
  saleAttrName?: string,
  saleAttrValueName?: string,
  spuId?: number  
}

export interface SpuImg extends FileUploadImg {
  id?: number,
  imgUrl?: string,
  imgName?: string,  
  spuId?: number
}
