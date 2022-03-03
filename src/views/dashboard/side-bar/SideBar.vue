<template>

  <el-menu
    active-text-color="#ffd04b"
    background-color="#545c64"
    default-active="2"
    text-color="#fff"
    :collapse-transition="false"
    :collapse="useDashboardStore().sideBarCollapse"
    :router="true"
    :style="{width: useDashboardStore().sideBarWidth + 'px'}"
  >
    <el-menu-item index="/dashboard/home">
      <el-icon><HomeFilled /></el-icon>
      <template #title>
        首页
      </template>
    </el-menu-item>

    <el-sub-menu index="1">

      <template #title>
        <el-icon><Key /></el-icon>
        <span>系统管理</span>
      </template>

      <el-menu-item index="/dashboard/user">用户管理</el-menu-item>
      <el-menu-item index="/dashboard/role">角色管理</el-menu-item>

    </el-sub-menu>

    <el-sub-menu index="2">

      <template #title>
      <el-icon><icon-menu /></el-icon>
      <span>商品管理</span>
      </template>

      <el-menu-item index="/dashboard/trademark">
        品牌管理
      </el-menu-item>
      <el-menu-item index="/dashboard/attr">
        平台属性管理
      </el-menu-item>
      <el-menu-item index="/dashboard/spu">
        Spu管理
      </el-menu-item>
      <el-menu-item index="/dashboard/sku">
        Sku管理
      </el-menu-item>

    </el-sub-menu>

    <el-menu-item>
      <el-icon><location /></el-icon>
      <template #title>
        <a target="_blank" href="http://175.178.85.196">前台网站</a>
      </template>
    </el-menu-item>

  </el-menu>

</template>

<script lang="ts" setup>

import {
  Location,
  HomeFilled,
  Key,
  Menu as IconMenu,
} from '@element-plus/icons-vue'

import useDashboardStore from '@/store/dashboard'

import { useRouter } from 'vue-router';

const routers = useRouter().getRoutes()


</script>

<style lang="less" scoped>


</style>