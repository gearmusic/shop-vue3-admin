import { defineStore } from 'pinia'

import { User } from '@/types/user'
import { Status } from '@/types/api'

import { 
  reqList,
  getIt,
  addIt,
  deleteIt,
  assignIt
} from '@/api/user'

const useUserStore = defineStore('user', {
  state : () => ({
    userList: [] as User[],
    userObj: {} as User,
    total: 0,
    currentPage: 1
  }),
  getters: {
 
  },
  actions: {
    async getUserList(pageSize: number, pageNo: number) {
      let result = (await reqList(pageSize, pageNo)).data.data
      this.userList = result.items as User[]
      this.total = result.total as number
      this.currentPage = 1
      
    },
    async loadObj(id: string) {
      this.userObj = (await getIt(id)).data.data.item
  
    },
    getNewObj() {
      this.userObj.id =  (10000 + Math.ceil(Math.random() * 10000)) + ''
      this.userObj.username = ''
      this.userObj.nickName = ''
      this.userObj.password = ''
      this.userObj.roleName = ''
    },
    async add() {
      let result = (await addIt(this.userObj)).data as Status
      if(result.code === 200 || result.code === 20000) {
        return true
      }
      return false
    },
    async delete(id: string) {
      let result = (await deleteIt(id)).data as Status

      if(result.code === 200 || result.code === 20000) {
        return true
      }

      return false
    },    
    async assign(id: string, roleIds: string[]) {
      let result = (await assignIt(id, roleIds)).data as Status

      if(result.code === 200 || result.code === 20000) {
        return true
      }

      return false
    }, 

  }
})

export default useUserStore