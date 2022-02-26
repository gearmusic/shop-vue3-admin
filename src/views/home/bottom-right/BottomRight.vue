<template>
  <div class="header">
    <span>销售额类别占比</span>
    
    <el-button-group>
      <el-button :type="btnIndex === '全部门店' ? 'primary' : 'default'" @click="btnClick('全部门店')">全部门店</el-button>
      <el-button :type="btnIndex === '线上' ? 'primary' : 'default'" @click="btnClick('线上')">线上</el-button>
      <el-button :type="btnIndex === '门店' ? 'primary' : 'default'" @click="btnClick('门店')">门店</el-button>
    </el-button-group>
  </div>

  <div class="chart">
    <div class="charts" ref="myCharts"></div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted } from 'vue'
import * as echarts from 'echarts'

interface Schema {
  value: number,
  name: string
}

const btnIndex = ref('全部门店')

const myCharts = ref<HTMLDivElement | null>(null)

const data = reactive([] as Schema[])

const option = reactive({ obj: {} as echarts.SetOptionOpts })

const titles = ['视频广告', '搜索引擎', '直接访问', '邮件营销', '联盟广告'];

const getData = () => {

  data.length = 0
  for(let i = 0; i < titles.length; i++) {
    data.push({
      name: titles[i],
      value: Math.floor(Math.random() * 300)
    } as Schema)
  }

  const instance = echarts.init(myCharts.value as HTMLDivElement)

  option.obj = {
    tooltip: {
      trigger: 'item'
    },
    series: [
      {
        name: btnIndex.value,
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
      
        label: {
          show: true,
        },
        emphasis: {
          label: {
            show: true,
            fontSize: '12',
            fontWeight: 'bold'
          }
        },      
        labelLine: {
          show: true
        },
        data: data
      }
    ],
    legend: {
      orient: 'vertical',
      left: 'left'
    },    
    grid: {
      left: 10,
      right: 10,
      top: 10,
      bottom: 10
    }
  } as echarts.SetOptionOpts;

  instance.setOption(option.obj)
}

const btnClick = (_btnIndex: string) => {
  btnIndex.value = _btnIndex
  getData()
}

onMounted(() => {
  getData()
})

</script>

<style lang="less" scoped>
.header {
  display: flex;
  justify-content: space-between;
}

.charts {
  width: 100%;
  height: 280px;
}

</style>