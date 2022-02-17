import { defineStore } from 'pinia'

import { PageInfo, Status } from '@/types/api'
import { Trademark } from '@/types/trademark'

import { 
  reqTrademarkList,
  reqTrademark,
  postTrademark,
  putTrademark,
  deleteTrademark,

} from '@/api/trademark'

const useTrademarkStore = defineStore('trademark', {
  state : () => ({
    trademarkList : [] as Trademark[],
    pageInfo: {} as PageInfo
  }),
  getters: {

  },
  actions: {
    async getPageList(pageSize: number, pageNo: number) {

      this.pageInfo = (await reqTrademarkList(pageSize, pageNo)).data.data
      this.trademarkList.length = 0
      this.trademarkList.push(...this.pageInfo.records)
    }
    , async getTrademark(id: number) {
      let result = (await reqTrademark(id)).data.data

      return result as Trademark
    }       
    , async postTrademark(trademark: Trademark) {
      let result = (await postTrademark(trademark)).data as Status

      if(result.code === 200) {
        await this.getPageList(this.pageInfo.size, this.pageInfo.current > 1 && this.pageInfo.pages * this.pageInfo.size === this.pageInfo.total ? this.pageInfo.pages + 1 : this.pageInfo.pages)
        return true
      }

      return false
    }    
    , async deleteTrademark(id: number) {
      let result = (await deleteTrademark(id)).data as Status

      if(result.code === 200) {
        await this.getPageList(this.pageInfo.size, this.pageInfo.current > 1 && this.pageInfo.current * this.pageInfo.size === this.pageInfo.total ? this.pageInfo.current - 1 : this.pageInfo.current)
        return true
      }

      return false
    }
    , async putTrademark(trademark: Trademark) {
      let result = (await putTrademark(trademark)).data as Status

      if(result.code === 200) {
        await this.getPageList(this.pageInfo.size, this.pageInfo.current)
        return true
      }

      return false
    }    

  }

})

export default useTrademarkStore