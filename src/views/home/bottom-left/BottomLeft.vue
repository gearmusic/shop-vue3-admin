<template>
  <el-card>
    <div class="card-header">
      <span>线上热门搜索</span>
      
      <el-menu
        class="el-menu-demo"
        mode="horizontal"
      >
        <el-menu-item-group>
          <el-menu-item index="1-1" @click="dataLoad">黄金网</el-menu-item>
          <el-menu-item index="1-2" @click="dataLoad">白金网</el-menu-item>
        </el-menu-item-group>
      </el-menu>
    </div>
    <el-row :gutter="10">
      <el-col :span="12" style="height: 180px;">
        <bar-charts-bottom ref="leftBar"></bar-charts-bottom>
      </el-col>
      
      <el-col :span="12">
        <bar-charts-bottom ref="rightBar"></bar-charts-bottom>
      </el-col>
    </el-row>

    <el-row>
      <el-table :data="[{index: 1}]" :border="true" style="width: 100%">
        <el-table-column prop="index" label="排名" width="180" />
        <el-table-column prop="name" label="搜索关键字" width="180" />
        <el-table-column prop="address" label="用户数" :sortable="true" />
        <el-table-column prop="address" label="周涨幅" :sortable="true" />
      </el-table>
    </el-row>

    <el-row class="page">
      <el-pagination layout="prev, pager, next" :total="1000"
      ></el-pagination>
    </el-row>
  </el-card>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import BarChartsBottom from '@/views/home/bar-charts-bottom/BarChartsBottom.vue';

const leftBar = ref<InstanceType<typeof BarChartsBottom>>()
const rightBar = ref<InstanceType<typeof BarChartsBottom>>()

const dataLoad = () => {
  leftBar.value!.getData()
  rightBar.value!.getData()
}

</script>

<style lang="less" scoped>

.card-header {
  display: flex;
  justify-content: space-between;
}


.page {
  float: right;
}
</style>