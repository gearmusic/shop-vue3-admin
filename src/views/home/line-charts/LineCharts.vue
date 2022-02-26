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
        type: 'line',
        smooth: true,
        data: [5, 37, 50, 22, 40, 2, 30, 22, 10],
        itemStyle: {
          color: '#9b1e64',
          opacity: 0
        },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [{
                offset: 0, color: '#1772b4' // 0% 处的颜色
            }, {
                offset: 1, color: '#fff' // 100% 处的颜色
            }]
          }
        }
      },
    ],
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