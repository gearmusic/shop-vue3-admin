import { defineStore } from 'pinia'

const useDashboardStore = defineStore('dashboard', {
  state : () => ({
    sideBarCollapse : false
  }),
  getters: {
    sideBarWidth(state) {
      return state.sideBarCollapse ? 60 : 200
    }
  },
  actions: {
    collapseSideBar() {
      this.sideBarCollapse = !this.sideBarCollapse
    }
  }

})

export default useDashboardStore