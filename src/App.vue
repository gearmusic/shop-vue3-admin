<template>
  <router-view></router-view>
</template>

<script lang="ts" setup>

//使用provide和inject来实现对业务方法的IOC
import { provide } from 'vue'

//这里集中注入当前有效的业务方法
/*
思想是对业务使用provide实现方法的集中管理
在应用中，用inject业务方法接口来使用方法

包装一个service层，可以把诸如网络获取，store管理等等方法都封装成对象的业务方法，

项目应用层只用关注项目的数据模型和该模型的业务方法即可，实现了面向对象
*/

//登录管理业务方法注入
import ILoginService from '@/services/ILoginService'
import LoginService from '@/services/LoginService'
provide<ILoginService>('ILoginService', LoginService)

</script>

<style lang="less" scoped>

</style>
