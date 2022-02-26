<template>
  <h3>门店销售额排名</h3>
  <ul class="ul">
    <li class="li clearfix">
      <span class="left top">1</span>
      <span>肯德基</span>
      <span class="right">1234</span>
    </li>
    <li class="li clearfix">
      <span class="left top">2</span>
      <span>麦当劳</span>
      <span class="right">1111</span>
    </li>
    <li class="li clearfix">
      <span class="left top">3</span>
      <span>海底捞</span>
      <span class="right">1098</span>
    </li>
    <li class="li clearfix">
      <span class="left">4</span>
      <span>俏江南</span>
      <span class="right">876</span>
    </li>
    <li class="li clearfix">
      <span class="left">5</span>
      <span>滴露火锅</span>
      <span class="right">876</span>
    </li> 
    <li class="li clearfix">
      <span class="left">6</span>
      <span>垃圾外卖</span>
      <span class="right">675</span>
    </li> 
    <li class="li clearfix">
      <span class="left">7</span>
      <span>三鹿奶粉</span>
      <span class="right">567</span>
    </li>
    <li class="li clearfix">
      <span class="left">8</span>
      <span>苏丹红</span>
      <span class="right">432</span>
    </li>       
  </ul>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

</script>

<style lang="less" scoped>

h3 {
  font-size: 14px;
}

.ul {
  margin: 0;
  padding: 0;

  .li {
    list-style: none;
    font-size: 15px;
    width:100%;
    overflow: hidden;
    height: 30px;
    line-height: 18px;

    .left {
      width: 15px;
      height: 15px;
      line-height: 15px;
      text-align: center;
      float: left;
      font-size: 12px;
      margin-right: 5px;
    }

    .top {
      color: #fff;
      background: #000;
      border-radius: 50%;
    }



    .right {
      width: 50px;
      height: 15px;
      line-height: 15px;
      color: #617172;
      float: right;
      font-size: 12px;
      margin-right: 10px;
    }

  }
}


</style>