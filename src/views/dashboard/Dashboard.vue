<template>
  <el-container class="container">

    <el-aside class="left-side" ref="sideContainer" :style="{ width: useDashboardStore().sideBarWidth + 'px' }">

      <side-bar ref="sideBar"></side-bar>

    </el-aside>

    <el-container>
      
      <el-header class="header">
        <nav-bar id="nav-bar"></nav-bar>
      </el-header>
      
      <el-main  class="main">
        <router-view></router-view>
      </el-main>
    </el-container>

  </el-container>

  
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'

import SideBar from '@/views/dashboard/side-bar/SideBar.vue';
import NavBar from '@/views/dashboard/navi-bar/NaviBar.vue';

import useDashboardStore from '@/store/dashboard'

const sideContainer = ref(null)
const sideBar = ref(null)

onMounted(() => {
 
})

</script>

<style lang="less" scoped>

.container {
  min-height: 100%;
  width: 100%;  
  background-color: #fff;

  .left-side {
    background: #545C64;

    .logo-container {
      text-align: center;
      margin: 20px auto;
    }

  }

  .header {
    padding: 0;
    height: 50px;
    overflow: hidden;
    position: relative;
    background: #fff;
    box-shadow: 0 1px 4px rgba(0,21,41,.08);
  }

  .main {
    padding: 0;
    margin: 0;
  }

}

</style>