<template>
  <div class="charts" ref="myCharts"></div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'

const myCharts = ref<HTMLDivElement | null>(null)

onMounted(() => {
  const instance = echarts.init(myCharts.value as HTMLDivElement)

  instance.setOption({
    tooltip: {},
    xAxis: {
      show: false,
      type: 'category'
    },
    yAxis: {
      show: false
    },
    series: [
      {
        type: 'bar',
        data: [5, 37, 50, 22, 40, 2, 30, 22, 10, 47, 36],
        color: '#2486b9'
      },
    ],
    toolTip: {},
    grid: {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0
    }
    
  } as echarts.EChartsCoreOption);

})

</script>

<style lang="less" scoped>
.charts {
  width: 100%;
  height: 100%;
}
</style>