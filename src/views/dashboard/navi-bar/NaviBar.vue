<template>
  <div class="navi-bar">
    <el-button class="btn-collapse" size="small" :icon="useDashboardStore().sideBarCollapse ? Expand : Fold" @click="btnCollapseClick"></el-button>

    <breadcrumb class="breadcrumb-container" />

    <el-button class="btn-quit" @click="btnQuitClick">
      退出<el-icon class="el-icon--right"><Right /></el-icon>
    </el-button>
  </div>
</template>

<script lang="ts" setup>
import {
  Fold, Expand, Right
} from '@element-plus/icons-vue'

import Breadcrumb from '@/components/breadcrumb/Breadcrumb.vue'

import useDashboardStore from '@/store/dashboard';
import { useRouter } from 'vue-router'

import LoginService from '@/services/LoginService'

const router = useRouter()

const btnCollapseClick = () => {
  useDashboardStore().collapseSideBar()
}

const btnQuitClick = () => {
  LoginService.Logout()
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