import { defineStore } from 'pinia'

import { Status } from '@/types/api'
import { SelectCategoryId } from '@/types/category'
import { Attr, AttrValue } from '@/types/attr'


import { 
  reqAttrList,
  postUpdAttr,
  deletetAttr,
} from '@/api/attr'

const useAttrStore = defineStore('attr', {
  state : () => ({
    attrsList: [] as Attr[]
  }),
  getters: {
    attrsListOfCategory3(state) {
      return state.attrsList.filter(m => m.categoryLevel === 3)
    }
  },
  actions: {
    async getAttrsList(selectCategortId: SelectCategoryId) {
      if(selectCategortId.categoryId3 !== '') {

        this.attrsList = (await reqAttrList(selectCategortId)).data.data

        this.attrsList.forEach(m => {
          m.attrValueList.forEach(n => {
            n.selected = false
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