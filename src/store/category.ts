import { defineStore } from 'pinia'

import { Category } from '@/types/category'


const useCatagoryStore = defineStore('category', {
  state : () => ({
    category : {} as Category
  }),
  getters: {

  },
  actions: {
  
  }
})

export default useCatagoryStore