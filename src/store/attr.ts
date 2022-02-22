import { defineStore } from 'pinia'

import { Attr } from '@/types/attr'
import { Category } from '@/types/category'

import { 
  reqAttrList,
  postUpdAttr,
  deletetAttr,
} from '@/api/attr'

const useAttrStore = defineStore('attr', {
  state : () => ({
    attrsList: [] as Attr[],
    attrObj: {} as Attr
  }),
  getters: {
    attrsListOfCategory3(state) {
      return state.attrsList.filter(m => m.categoryLevel === 3)
    },  
  },
  actions: {
    async getAttrsList(category: Category) {
      if(category.category3Id !== '') {

        this.attrsList = (await reqAttrList(category)).data.data

        this.attrsList.forEach(m => {
          m.attrValueList.forEach(n => {
            n.selected = false
            n.value = n.valueName
          })
        })

      }
    },

    async saveAttr(attr: Attr) {
      await postUpdAttr(attr)
    },
    async deleteAttr(attrId: number) {
      await deletetAttr(attrId)
    },
  }
})

export default useAttrStore