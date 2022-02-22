import { defineStore } from 'pinia'

import { dateformat } from '@/libs/utils'

import { PageInfo, Status } from '@/types/api'
import { Sku, SkuImage, SkuAttrValue, SkuSaleAttrValue } from '@/types/sku'
import type { UploadFile } from 'element-plus/es/components/upload/src/upload.type'

import useCategoryStore from '@/store/category'
import useAttrStore from '@/store/attr'
import useSpuStore from '@/store/spu'

import { 
  getIt,
  deleteIt,
  addIt,
  reqList,
  reqListBySpuId,
  reqSkuCancelSale,
  reqSkuOnSale
} from '@/api/sku'
import { SelectItem } from '@/types'

const useSkuStore = defineStore('sku', {
  state : () => ({
    skuList: [] as Sku[],
    pageInfo: {} as PageInfo,   
    skuObj: {} as Sku,
    spuId: 0
  }),
  getters: {

  },
  actions: {
    async loadSpuList(spuId: number) {
      this.skuList = (await reqListBySpuId(spuId)).data.data

      this.spuId = spuId
    },
    async loadList(pageSize: number, pageNo: number) {
      this.pageInfo = (await reqList(pageSize, pageNo)).data.data
      this.skuList.length = 0
      this.skuList.push(...this.pageInfo.records)
      this.spuId = 0
    },
    async loadObj(id: number) {
      this.skuObj = (await getIt(id)).data.data

      //图片列表的载入
      if(this.skuObj.skuImageList === null) {
        this.skuObj.skuImageList = [] as SkuImage[]
      } else {
        this.skuObj.skuImageList.forEach(m => {
          m.uid = m.id!
          m.name = m.imgName!
          m.url = m.imgUrl!
        })
      }    
    },    
    async getNewObj(spuId: number) {
      
      //销售属性的构建
      const spuStore = useSpuStore()
      await spuStore.loadObj(spuId)

      let skuSaleAttrValueList: SkuSaleAttrValue[] = []

      skuSaleAttrValueList.push(
        ...spuStore.spuObj.spuSaleAttrList.map(m => {
          return {
            spuId,
            saleAttrValueId: '',
            saleAttrId: m.id,
            saleAttrName: m.saleAttrName,
            saleAttrValueName: '',
            //为了携带选项数据而增加一个数组
            saleAttrValueOptions: [
              ...m.spuSaleAttrValueList.map(n => {
                return {
                  id: n.id,
                  text: n.saleAttrValueName
                } as SelectItem
              })
            ] as SelectItem[]
          } as SkuSaleAttrValue
        })
      )

      //平台属性的构建
      const categoryStore = useCategoryStore()
      const attrStore = useAttrStore()

      await attrStore.getAttrsList(categoryStore.category)
      
      let skuAttrValueList: SkuAttrValue[] = []
      skuAttrValueList.push(
        //防止跳出太多，截取8个演示下就行
        ...attrStore.attrsListOfCategory3.splice(0, 8).map(m => {
          return {
            attrId: m.id,
            valueId: '',
            attrName: m.attrName,
            valueName: '', 
            //为了携带选项数据而增加一个数组
            saleAttrOptions: [
              ...m.attrValueList.map(n => {
                return {
                  id: n.id,
                  text: n.valueName
                } as SelectItem
              })
            ]
          } as SkuAttrValue
        })
      )

      this.skuObj = {
        id: 0,
        spuId: spuId,
        price: 0,
        skuName: '',
        skuDesc: '',
        weight: '',
        tmId: spuStore.spuObj.tmId,
        category3Id: spuStore.spuObj.id,
        spuName: spuStore.spuObj.spuName,
        skuDefaultImg: 'http://47.93.148.192:8080/group1/M00/00/02/rBHu8l-sklaAPVqkAAEoiSa9WoM463.jpg',
        isSale: 1,
        createTime: dateformat(new Date(), 'yyyy-MM-dd HH:mm:ss'),
        skuImageList: [],
        skuAttrValueList,
        skuSaleAttrValueList
      }

    }, 

    async delete(id: number) {
      let result = (await deleteIt(id)).data as Status

      if(result.code === 200) {
        return true
      }

      return false
    },
    async saveIt() {

      //数据整理
      this.skuObj.skuAttrValueList.forEach((m, index) => {
        m.valueId !== '' && (m.valueName = 
          m.saleAttrOptions![m.saleAttrOptions!.findIndex(n => n.id === (m.valueId as number))].text
          )
      })

      this.skuObj.skuSaleAttrValueList.forEach((m, index) => {
        m.saleAttrValueId !== '' && (m.saleAttrValueName = 
          m.saleAttrValueOptions![m.saleAttrValueOptions!.findIndex(n => n.id === (m.saleAttrValueId as number))].text
          )
      })

      //图片数据整理
      let skuImageList = [] as SkuImage[]

      this.skuObj.skuImageList!.forEach((m, index) => {
        let uploadFile = m as UploadFile
        let url = (uploadFile.response! as {data: string}).data as string

        skuImageList.push(
          {
            imgName: uploadFile.name,
            imgUrl: url,
            spuImgId: index + '',
            isDefault: (index === 0 ? '1' : '0')
          } as SkuImage
        )
      })

      this.skuObj.skuImageList = []
      this.skuObj.skuImageList.push(...skuImageList)
      if(skuImageList.length > 0) {
        this.skuObj.skuDefaultImg = skuImageList[0].imgUrl!
      }

      //保存状态
      let result = (await addIt(this.skuObj)).data as Status

      if(result.code === 200) {
        return true
      }

      return false
    },
    async onAndCancel(id: number, isSale: number) {
      let result = {} as Status

      if(isSale === 1){
        result = (await reqSkuCancelSale(id)).data as Status
      }else{
        result = (await reqSkuOnSale(id)).data as Status
      }

      if(result.code === 200) {
        return true
      }

      return false
    },


  }

})

export default useSkuStore