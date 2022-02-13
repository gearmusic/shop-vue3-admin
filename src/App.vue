<template>
  <router-view></router-view>
</template>

<script lang="ts" setup>

//use provide & inject to implement IOC model 
//使用provide和inject来实现对业务方法的IOC use p

import { provide } from 'vue'

//all business services are privided here
//这里集中注入当前有效的业务方法 
/*
To encapsulate a service layer for every business model. axios, store or any other base layer are all encasulated in services.
So UI layer only use services, system becomes three layers. In App.vue case, we create a service instance to provide in vue 'provide' and
we announce provide type as a interface, so services implements and using is seperated.

思想是对业务使用provide实现方法的集中管理
在应用中，用inject业务方法接口来使用方法

包装一个service层，可以把诸如网络获取，store管理等等方法都封装成对象的业务方法，

项目应用层只用关注项目的数据模型和该模型的业务方法即可,也就是只关注接口不关注实现，实现了业务逻辑和实现的分离
*/

//登录管理业务方法注入
//provide login service
import ILoginService from '@/services/ILoginService'
import LoginService from '@/services/LoginService'

provide<ILoginService>('ILoginService', LoginService)

</script>

<style lang="less" scoped>

</style>
