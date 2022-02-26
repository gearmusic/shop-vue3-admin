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
      min: 0,
      max: 100
    },
    yAxis: {
      show: false,
      type: 'category'
    },
    series: [
      {
        type: 'bar',
        data: [78],
        color: '#57c3c2',
        barWidth: 10,
        showBackground: true,
        backgroundStyle: {
          color: '#eee'
        }
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