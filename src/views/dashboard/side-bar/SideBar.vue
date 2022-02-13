<template>

  <el-menu
    active-text-color="#ffd04b"
    background-color="#545c64"
    class="el-menu-vertical-demo"
    default-active="2"
    text-color="#fff"
    @open="handleOpen"
    @close="handleClose"
  >
    <el-menu-item index="0">
      <el-icon><HomeFilled /></el-icon>
      <router-link to="/dashboard/home">首页</router-link>
    </el-menu-item>

    <el-sub-menu index="1">

      <template #title>
        <el-icon><Key /></el-icon>
        <span>权限管理</span>
      </template>

      <el-menu-item index="1-1">item one</el-menu-item>
      <el-menu-item index="1-2">item one</el-menu-item>

    </el-sub-menu>

    <el-sub-menu index="2">

      <template #title>
      <el-icon><icon-menu /></el-icon>
      <span>商品管理</span>
      </template>

      <el-menu-item index="2-1">
        <router-link to="/dashboard/brand">品牌管理</router-link>
      </el-menu-item>
      <el-menu-item index="2-2">
        平台属性管理
      </el-menu-item>
      <el-menu-item index="2-3">
        <router-link to="/dashboard/spu">Spu管理</router-link>
      </el-menu-item>
      <el-menu-item index="2-4">Sku管理</el-menu-item>  

    </el-sub-menu>

    <el-menu-item index="3">
      <el-icon><location /></el-icon>
      <a target="_blank" href="http://175.178.85.196">前台网站</a>
    </el-menu-item>
  </el-menu>



</template>

<script lang="ts" setup>
import { ref } from 'vue'

import {
  Location,
  HomeFilled,
  Key,
  Menu as IconMenu,
} from '@element-plus/icons-vue'


const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
</script>

<style lang="less" scoped>


</style>