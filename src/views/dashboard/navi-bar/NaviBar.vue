<template>
  <div class="navi-bar">
    <el-button class="btn-collapse" :icon="useDashboardStore().sideBarCollapse ? Expand : Fold" @click="btnCollapseClick"></el-button>

    <breadcrumb class="breadcrumb-container" />

    <el-button class="btn-quit" @click="btnQuitClick">
      退出<el-icon class="el-icon--right"><Right /></el-icon>
    </el-button>
  </div>
</template>

<script lang="ts" setup>
import { inject } from 'vue'

import {
  Fold, Expand, Right
} from '@element-plus/icons-vue'

import Breadcrumb from '@/components/breadcrumb/Breadcrumb.vue'
import ILoginService from '@/services/ILoginService'

import useDashboardStore from '@/store/dashboard';
import { useRouter } from 'vue-router'

const loginService: ILoginService = inject('ILoginService')!

const router = useRouter()

const btnCollapseClick = () => {
  useDashboardStore().collapseSideBar()
}

const btnQuitClick = () => {
  loginService.Logout()
  router.push({ name: 'index' })
}

</script>

<style lang="less" scoped>

.navi-bar {

  .breadcrumb-container {
    float: left;
  }

  .btn-collapse {
    float: left;
    margin: 10px 0 0 10px;
  }

  .btn-quit {
    float: right;
    margin: 10px 10px 0 0;
  }  

}
</style>