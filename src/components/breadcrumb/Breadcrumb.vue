<template>
  <el-breadcrumb 
    class="el-breadcrumb" 
    separator="/">
    
    <el-breadcrumb-item>{{ $route.meta.category }}</el-breadcrumb-item>

    <el-breadcrumb-item>{{ $route.meta.title }}</el-breadcrumb-item>

  </el-breadcrumb>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'


</script>

<style lang="less" scoped>
.el-breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 8px;

  .no-redirect {
    color: #97a8be;
    cursor: text;
  }
}
</style>