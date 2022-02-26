<template>
  <div class="header clearfix">
    <el-tabs v-model="activeName" class="tab" @tab-click="handleClick">
      <el-tab-pane label="销售额" name="sale" class="tab"></el-tab-pane>
      <el-tab-pane label="访问量" name="visit" class="tab"></el-tab-pane>
    </el-tabs>
    <div class="right">
      <a href="#" @click.prevent="setDay">今日</a>
      <a href="#" @click.prevent="setWeek">本周</a>
      <a href="#" @click.prevent="setMonth">本月</a>
      <a href="#" @click.prevent="setYear">本年</a>
      <el-date-picker
        v-model="selectDate"
        type="daterange"
        range-separator="-"
        start-placeholder="Start month"
        end-placeholder="End month"
        size='small'
      >
      </el-date-picker>
    </div>
  </div>

  <div class="content">
    <el-row :gutter="10">
      <el-col :span="20" class="charts">
        <slot
          ref="charts"
          name="charts"
          >
          </slot>
      </el-col>
      <el-col :span="4">
        <slot name="right"></slot>
      </el-col>
    </el-row>
  </div>

</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import * as dayjs from 'dayjs'

const activeName = ref('sale')

const selectDate = reactive([])

const setDay = () => {
  
  const day = dayjs(dayjs(), 'YYYY-MM-DD')

  selectDate.length = 0
  selectDate.push(day, day)
}

const setWeek = () => {
  
  const start = dayjs(dayjs().day(0), 'YYYY-MM-DD')
  const end = dayjs(dayjs().day(6), 'YYYY-MM-DD')

  selectDate.length = 0
  selectDate.push(start, end)
}

const setMonth = () => {
  
  const start = dayjs(dayjs().date(1), 'YYYY-MM-DD')
  const end = dayjs(dayjs().date(dayjs().daysInMonth()), 'YYYY-MM-DD')

  selectDate.length = 0
  selectDate.push(start, end)
}

const setYear = () => {
  
  const start = dayjs(dayjs().month(0).date(1), 'YYYY-MM-DD')
  const end = dayjs(dayjs().month(11).date(31), 'YYYY-MM-DD')

  selectDate.length = 0
  selectDate.push(start, end)
}

const emit= defineEmits<{
  (e: 'tabChange', index:number): void,
}>()

const handleClick = (tab: {index: number}) => {
  emit('tabChange', tab.index)
}
</script>

<style lang="less" scoped>
.header {
  display:flex;
  justify-content:space-between;
  position: relative;

  .tab {
    width: 100%;

    .el-tabs__item {
      font-size: 18px!;
    }    
  }

  .right {
    position: absolute;
    right: 0;

    a {
      margin-right: 10px;
      font-size: 14px;
    }
  }
}

.content {
  .charts {
    height: 300px;
  }
  
}

</style>