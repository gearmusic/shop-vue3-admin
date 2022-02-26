<template>
  <el-main>
    <el-row :gutter="10">
      <el-col :span="6">
        <detail title="总销售额" count="￥ 12560">
          <template #charts>
            <span>
              周同比 56.67%
              <svg style="vertical-align:sub" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="16" height="16"><path d="M804.571429 402.285714q0 14.857143-10.857143 25.714286t-25.714286 10.857143H256q-14.857143 0-25.714286-10.857143T219.428571 402.285714t10.857143-25.714285l256-256q10.857143-10.857143 25.714286-10.857143t25.714286 10.857143l256 256q10.857143 10.857143 10.857143 25.714285z" p-id="6114" fill="#e16531"></path></svg>
              &nbsp;&nbsp;日同比 19.16%
              <svg style="vertical-align:text-bottom;"  class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="16" height="16"><path d="M795.681749 621.714286q0 14.857143-10.857143 25.714285l-256 256q-10.857143 10.857143-25.714286 10.857143t-25.714286-10.857143L221.396034 647.428571q-10.857143-10.857143-10.857143-25.714285t10.857143-25.714286 25.714286-10.857143h512q14.857143 0 25.714286 10.857143t10.857143 25.714286z" p-id="5482" fill="#19fa28"></path></svg>
            </span>
          </template>
          <template #footer>
            销售额￥ 12423
          </template>
        </detail>
      </el-col>
      <el-col :span="6">
        <detail title="访问量" count="88460">
          <template #charts>
            <line-charts></line-charts>
          </template>
          <template #footer>
            日访问量 1234
          </template>
        </detail>
      </el-col>
      <el-col :span="6">
        <detail title="支付笔数" count="88460">
          <template #charts>
            <span>
              <bar-charts></bar-charts>
            </span>
          </template>
          <template #footer>
            转化率 65%
          </template>
        </detail>
      </el-col>      
      <el-col :span="6">
        <detail title="运营活动效果" count="78%">
          <template #charts>
            <progress-charts></progress-charts>
          </template>
          <template #footer>
            周同比 56.67%
            <svg style="vertical-align:bottom;" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="16" height="16"><path d="M804.571429 402.285714q0 14.857143-10.857143 25.714286t-25.714286 10.857143H256q-14.857143 0-25.714286-10.857143T219.428571 402.285714t10.857143-25.714285l256-256q10.857143-10.857143 25.714286-10.857143t25.714286 10.857143l256 256q10.857143 10.857143 10.857143 25.714285z" p-id="6114" fill="#e16531"></path></svg>
            &nbsp;&nbsp;日同比 19.16%
            <svg style="vertical-align:top;"  class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="16" height="16"><path d="M795.681749 621.714286q0 14.857143-10.857143 25.714285l-256 256q-10.857143 10.857143-25.714286 10.857143t-25.714286-10.857143L221.396034 647.428571q-10.857143-10.857143-10.857143-25.714285t10.857143-25.714286 25.714286-10.857143h512q14.857143 0 25.714286 10.857143t10.857143 25.714286z" p-id="5482" fill="#19fa28"></path></svg>
          </template>
        </detail>
      </el-col>
    </el-row>

    <el-card style="margin: 10px 0; padding: 0;">
      <sale @tab-change="tabChange">
        <template #charts>
          <sale-charts ref="saleCharts"></sale-charts>
        </template>
        <template #right>
          <data-list></data-list>
        </template>
      </sale>
    </el-card>

    <el-row :gutter="10">
      <el-col :span="12">
        <bottom-left></bottom-left>
      </el-col>

      <el-col :span="12">
        <el-card>
          <bottom-right></bottom-right>
        </el-card>
      </el-col>
      
    </el-row>

  </el-main>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

import Detail from './detail/Detail.vue'
import LineCharts from './line-charts/LineCharts.vue'
import BarCharts from './bar-charts/BarCharts.vue'
import ProgressCharts from './progress-charts/ProgressCharts.vue'
import Sale from './sale/Sale.vue'
import SaleCharts from './sale-charts/SaleCharts.vue'
import DataList from './data-list/DataList.vue'
import BottomLeft from './bottom-left/BottomLeft.vue'
import BottomRight from './bottom-right/BottomRight.vue'


const saleCharts = ref<InstanceType<(typeof SaleCharts)>>()

const tabChange = (index: number) => {
  saleCharts.value!.getData()
}

</script>

<style lang="less" scoped>

</style>