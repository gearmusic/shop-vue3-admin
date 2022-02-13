<template>
  <el-container class="container">

    <el-aside class="left-side" width="200px">

      <div class="logo-container">
        <img src="images/logo.png" alt="" />
      </div>

      <side-bar></side-bar>

    </el-aside>

    <el-container>
      
      <el-header>

        <nav-bar></nav-bar>

      </el-header>
      
      <el-main>

        <router-view :key="$route.path"></router-view>
      
      </el-main>
    </el-container>

  </el-container>

  
</template>

<script lang="ts" setup>
import { computed } from 'vue';

import SideBar from '@/views/dashboard/side-bar/SideBar.vue';
import NavBar from '@/views/dashboard/navi-bar/NaviBar.vue';


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
}

</style>