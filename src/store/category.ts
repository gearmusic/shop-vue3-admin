import { defineStore } from 'pinia'

import { Category } from '@/types/category'

import { 
  reqCategory1List,
  reqCategory2List,
  reqCategory3List,
} from '@/api/category'

const useCatagoryStore = defineStore('category', {
  state : () => ({
    category1List : [] as Category[],
    category2List : [] as Category[],
    category3List : [] as Category[],

  }),
  getters: {

  },
  actions: {
    async getCategory1List() {
      this.category1List = (await reqCategory1List()).data.data
      this.category2List.length = 0
      this.category3List.length = 0
    },
    async getCategory2List(categortId1: number) {
      this.category2List = (await reqCategory2List(categortId1)).data.data
      this.category3List.length = 0
    },
    async getCategory3List(categortId2: number) {
      this.category3List = (await reqCategory3List(categortId2)).data.data
    }

  }

})

export default useCatagoryStore