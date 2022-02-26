<template>
  <div class="header">
    <span>搜索用户数</span>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    <svg @click="getData()" class="icon" viewBox="0 0 1024 1024" version="1.1" width="16" height="16"><path d="M935.161672 427.51891c-14.511505-11.744485-37.643342-9.155521-49.1627 5.403057l-12.9438 16.20917c-0.926092-5.842055-1.995447-11.625782-3.158946-17.325597C831.326792 245.594511 666.360623 110.434182 477.668077 110.434182c-27.455305 0-55.099922 2.885723-82.198094 8.562003C179.036629 164.405397 39.60195 378.546545 84.655052 596.34499c38.522362 186.222285 203.488531 321.383638 392.229173 321.383638 27.430746 0 55.076386-2.873444 82.174558-8.549723 75.144444-15.746636 144.18589-53.508681 198.288089-108.002806l1.87572-1.662873c1.757017-1.74576 2.778276-3.432169 2.588965-3.443425l1.781576-2.387373c2.137687-3.527336 4.65502-9.191336 4.65502-16.173354 0-17.361413-14.035668-31.479969-31.326473-31.479969-4.275373 0-8.454556 0.914836-12.325723 2.612501l-1.90028-1.318018-8.644891 8.65717c-46.359864 46.478568-104.261599 78.042447-167.484525 91.283006-22.657023 4.750187-45.766346 7.160073-68.684312 7.160073-157.818375 0-295.733445-113.073288-327.96145-268.87268-37.738509-182.291766 78.849836-361.484961 259.918751-399.448598 22.657023-4.750187 45.766346-7.160073 68.708871-7.160073 157.793816 0 295.709909 113.061009 327.96145 268.860401 0.427742 2.101871 0.855484 4.227278 1.258667 6.364965l-13.751189-11.091616c-14.511505-11.768021-37.59627-9.1678-49.1627 5.390777-12.017708 15.056927-9.619078 37.156248 5.343705 49.269124l78.089519 63.1032c0.14224 0.106424 0.285502 0.213871 0.427742 0.332575l3.491521 2.814092 0.712221 0c6.483668 3.657296 15.770172 4.964058 21.065781 4.322445 9.475815-0.890276 17.954931-5.485945 23.940249-12.93152l62.723553-78.659501C952.498526 461.635939 950.052824 439.560154 935.161672 427.51891z" p-id="2208"></path></svg>  
  </div>
  <div class="des">
    1213
    &nbsp;&nbsp;
    <svg style="vertical-align:sub" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="16" height="16"><path d="M804.571429 402.285714q0 14.857143-10.857143 25.714286t-25.714286 10.857143H256q-14.857143 0-25.714286-10.857143T219.428571 402.285714t10.857143-25.714285l256-256q10.857143-10.857143 25.714286-10.857143t25.714286 10.857143l256 256q10.857143 10.857143 10.857143 25.714285z" p-id="6114" fill="#f00"></path></svg>
    &nbsp;&nbsp;&nbsp;&nbsp;
    17.1
    <svg style="vertical-align:top;"  class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="16" height="16"><path d="M795.681749 621.714286q0 14.857143-10.857143 25.714285l-256 256q-10.857143 10.857143-25.714286 10.857143t-25.714286-10.857143L221.396034 647.428571q-10.857143-10.857143-10.857143-25.714285t10.857143-25.714286 25.714286-10.857143h512q14.857143 0 25.714286 10.857143t10.857143 25.714286z" p-id="5482" fill="#0f0"></path></svg>
  </div>
  <div class="charts" ref="myCharts"></div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted } from 'vue'
import * as echarts from 'echarts'

const myCharts = ref<HTMLDivElement | null>(null)

const data = reactive([] as number[])

const option = reactive({ obj: {} as echarts.SetOptionOpts })

const getData = () => {
  data.length = 0
  for(let i = 0; i < 8; i++) {
    data.push(
      Math.floor(Math.random()*100)
    )
  }  

  const instance = echarts.init(myCharts.value as HTMLDivElement)

  option.obj = {
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
        data: data,
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
.header {
  font-size: 14px;
  color: #999;
  line-height: 25px;
}
.des {
  font-size: 14px;
  line-height: 25px;
}
.charts {
  margin: 10px 0;
  width: 100%;
  height: 120px;
}
</style>