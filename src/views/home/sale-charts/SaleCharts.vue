<template>
  <div class="charts" ref="myCharts"></div>
</template>

<script lang="ts" setup>
import { ref, onMounted, reactive } from 'vue'
import * as echarts from 'echarts'

const myCharts = ref<HTMLDivElement | null>(null)

const data = reactive([] as number[])

const option = reactive({ obj: {} as echarts.SetOptionOpts })

const getData = () => {
  data.length = 0
  for(let i = 0; i < 12; i++) {
    data.push(
      Math.floor(Math.random()*400)
    )
  }  

  const instance = echarts.init(myCharts.value as HTMLDivElement)

  option.obj = {
    xAxis: {
      type: 'category',
      data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: 'direct',
        barWidth: '40%',
        data: data,
        type: 'bar',
        color: '#b2cf87'
      }
    ],
    title: {
      text: '销售额趋势'
    },
    tooltip: {
    
    },
    grid: {
      left: 50,
      right: 50,
      top: 60,
      bottom: 20
    }
  } as echarts.SetOptionOpts;

  instance.setOption(option.obj)
}

defineExpose({
  getData
})

onMounted(() => {
  getData()
})

</script>

<style lang="less" scoped>
.charts {
  width: 100%;
  height: 100%;
}
</style>