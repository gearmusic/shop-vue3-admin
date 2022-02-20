import { defineStore } from 'pinia'

import { PageInfo, Status } from '@/types/api'
import { Spu, SpuImg } from '@/types/spu'
import type { UploadFile } from 'element-plus/es/components/upload/src/upload.type'

import { 
  reqSpuList,
  deleteIt,
  getIt,
  saveIt,
  addIt
} from '@/api/spu'

const useSpuStore = defineStore('spu', {
  state : () => ({
    spuList: [] as Spu[],
    pageInfo: {} as PageInfo,
    spuObj: {} as Spu
  }),
  getters: {

  },
  actions: {
    async loadList(category3Id: number | '', pageSize: number, pageNo: number) {
      if(category3Id !== '') {
        this.pageInfo = (await reqSpuList(category3Id, pageSize, pageNo)).data.data
        this.spuList.length = 0
        this.spuList.push(...this.pageInfo.records)
      }
    },
    getNewObj(category3Id: number) {
      this.spuObj = {
        id: 0,
        spuName: '',
        category3Id: category3Id,
        description: '',
        spuImageList: [],
        spuSaleAttrList: [],
        tmId: 0
      }
    }, 
    async loadObj(spuId: number) {
      this.spuObj = (await getIt(spuId)).data.data

      //图片列表的载入
      if(this.spuObj.spuImageList === null) {
        this.spuObj.spuImageList = [] as SpuImg[]
      } else {
        this.spuObj.spuImageList.forEach(m => {
          m.uid = m.id!
          m.name = m.imgName!
          m.url = m.imgUrl!
        })
      }

      /*
      this.spuObj.spuImageList = [] as SpuImg[]
      this.spuObj.spuImageList!.push({
        name: 'fsds',
        url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
        uid: 100,
        id: 100,
        imgUrl: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
        imgName: 'fssd',  
        spuId: 22        
      })
      */

      //所有checked属性设置初值
      this.spuObj.spuSaleAttrList.forEach(m => {
        m.spuSaleAttrValueList.forEach(n => {
          n.value = n.saleAttrValueName!
          n.selected = false
        })
      })

    },
    async delete(id: number) {
      let result = (await deleteIt(id)).data as Status

      if(result.code === 200) {
        return true
      }

      return false
    },
    /*
    resetIsChecked() {
      this.spuObj.spuSaleAttrList.forEach(m => {
        m.spuSaleAttrValueList.forEach(n => {
          n.isChecked = false
        })  
      })
    }
    */
    async saveIt() {
      //数据整理
      this.spuObj.spuSaleAttrList.forEach((m, index_m) => {
        m.baseSaleAttrId = index_m
        m.spuId = this.spuObj.id
        m.spuSaleAttrValueList.forEach(n => {
          n.saleAttrName = m.saleAttrName,
          n.saleAttrValueName = n.value
          n.baseSaleAttrId = index_m
          n.spuId = this.spuObj.id
        })
      })

      //图片数据整理
      let spuImageList = [] as SpuImg[]

      this.spuObj.spuImageList!.forEach(m => {
        let uploadFile = m as UploadFile
        let url = (uploadFile.response! as {data: string}).data as string

        spuImageList.push(
          {
            imgName: uploadFile.name,
            imgUrl: url,
            spuId: this.spuObj.id,
            name: uploadFile.name,
            url,
          } as SpuImg
        )
      })

      this.spuObj.spuImageList = []
      this.spuObj.spuImageList.push(...spuImageList)

      //保存状态
      let result = {} as Status

      if(this.spuObj.id === 0) {
        result = (await addIt(this.spuObj)).data as Status
      } else {
        result = (await saveIt(this.spuObj)).data as Status
      }

      if(result.code === 200) {
        return true
      }

      return false
    }

  }

})

export default useSpuStore