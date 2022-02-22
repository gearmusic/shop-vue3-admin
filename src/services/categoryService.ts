import { 
  reqCategory1List,
  reqCategory2List,
  reqCategory3List,
} from '@/api/category'

import { Status } from '@/types/api'
import { Category, Option } from '@/types/category'

const categoryService = {

  async getCategory1List(category: Category) {
    category.options1 = []
    let result = (await reqCategory1List()).data as Status
    if(result.code === 200) {
      category.options1.push(...(result.data as Option[]))
    }
  },

  async getCategory2List(category: Category, categortId1: number) {
    category.options2 = []
    let result = (await reqCategory2List(categortId1)).data as Status
    if(result.code === 200) {
      category.options2.push(...(result.data as Option[]))
    }
  },

  async getCategory3List(category: Category, categortId2: number) {
    category.options3 = []
    let result = (await reqCategory3List(categortId2)).data as Status
    if(result.code === 200) {
      category.options3.push(...(result.data as Option[]))
    }
  }

}

export default categoryService
