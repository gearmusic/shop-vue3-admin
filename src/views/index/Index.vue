<template>
  <div class="login-container">

    <el-form class="login-form" ref="formRef" label-width="120px">
      <h3>用户登录</h3>

      <el-form-item label="用户名">
        <el-input v-model="userInfo.name">
        </el-input>
      </el-form-item>

      <el-form-item label="密 码">
        <el-input v-model="userInfo.password" type="password" show-password ></el-input>
      </el-form-item>

      <el-form-item>
        <el-button :icon="Search" type="primary" @click="loginClick">登录</el-button>
        
      </el-form-item>
      <span class="info">(admin 111111)</span>
    </el-form>



  </div>

  <el-dialog
    v-model="dialogLogin"
    title="Tips"
    width="30%"
  >
    <span>抱歉，登录失败。 Sorry. Login Failed.</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="dialogLogin = false"
          >Confirm 确认</el-button
        >
        
      </span>
      
    </template>
  </el-dialog>

</template>

<script lang="ts" setup>
import { ref, reactive, inject } from 'vue'
import { useRouter } from 'vue-router'

import { Search } from '@element-plus/icons-vue'

import ILoginService from '@/services/ILoginService'

//界面层只关注界面数据, 交给注入inject的业务逻辑接口实现类，并等待业务方法的执行结果，再进行页面响应

//取到当前注入的业务对象
const loginService: ILoginService = inject('ILoginService')!

const userInfo = reactive({ name: '', password: '' })

const dialogLogin = ref(false)

const router = useRouter()

const loginClick = async () => {

  let loginSuccess = await loginService.login(userInfo.name, userInfo.password)
  if(loginSuccess) {

    router.push({ name: 'home' })
  } else {
    dialogLogin.value = true
    userInfo.name = ''
    userInfo.password = ''
  }
  
}

</script>

<style lang="less" scoped>

.login-container {
  min-height: 100%;
  width: 100%;  
  background-color: #283443;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;



    h3 {
      text-align: center;
    }
    
    .info {
      display: block;
      text-align: center;
      line-height: 30px;
      color: #fff;
    }


  }
}



</style>