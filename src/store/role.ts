import { defineStore } from 'pinia'

import { Role } from '@/types/role'
import { Status } from '@/types/api'

import { 
  reqList,
  getIt,
  addIt,
  saveIt,
  deleteIt,
  getSelectList
} from '@/api/role'

const useRoleStore = defineStore('role', {
  state : () => ({
    objList: [] as Role[],
    obj: {} as Role,
    allRole: [] as Role[],
    total: 0,
    currentPage: 1
  }),
  getters: {
 
  },
  actions: {
    async getList(pageSize: number, pageNo: number) {
      let result = (await reqList(pageSize, pageNo)).data.data
      this.objList = result.items as Role[]
      this.total = result.total as number
      this.currentPage = 1
      
    },
    async loadObj(id: string) {
      this.obj = (await getIt(id)).data.data.item
    },
    getNewObj() {
      this.obj.id = ''
      this.obj.deleted = false
      this.obj.remark = ''
      this.obj.roleName = ''
    },
    async add() {
      let result = (await addIt(this.obj)).data as Status
      if(result.code === 200 || result.code === 20000) {
        return true
      }
      return false
    },
    async save() {
      let result = (await saveIt(this.obj)).data as Status
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
    async getAllRoles() {
      this.allRole = (await getSelectList()).data.data.allRolesList as Role[]    
    } ,
    async getRoleIds(roleNames: string) {
      let roleIds = this.allRole.filter(m => roleNames.indexOf(m.roleName) >= 0).map(m => m.id)
      return roleIds
    } 
  }
})

export default useRoleStore