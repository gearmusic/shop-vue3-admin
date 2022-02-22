import { FileUploadImg, SelectItem } from '@/types'


export interface Sku {
  id: number,
  spuId: number,
  price: number,
  skuName: string,
  skuDesc: string,
  weight: string,
  tmId: number,
  category3Id: number,
  skuDefaultImg: string,
  isSale: 0 | 1,
  createTime: string,
  skuImageList: SkuImage[],
  skuAttrValueList: SkuAttrValue[],
  skuSaleAttrValueList: SkuSaleAttrValue[],

  //这个属性是为了方便显示增加的
  spuName: string,  
}

export interface SkuAttrValue {
  id: number,
  attrId: number,
  valueId: number | '',
  skuId: number,
  attrName: string,
  valueName: string, 
  //为了携带选项数据而增加一个数组
  saleAttrOptions?: SelectItem[]
}

export interface SkuSaleAttrValue {
  id: number,
  skuId: number,
  spuId: number,
  saleAttrValueId: number | '',
  saleAttrId: number,
  saleAttrName: string,
  saleAttrValueName: string,
  //为了携带选项数据而增加一个数组
  saleAttrValueOptions?: SelectItem[]
}

export interface SkuImage extends FileUploadImg {
  id?: number,
  skuId?: number,
  imgName?: string,
  imgUrl?: string,
  spuImgId?: string,
  isDefault?: '0' | '1'
}
