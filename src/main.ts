import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import router from '@/router'
import { createPinia } from 'pinia'
import App from '@/App.vue'

//css
import '@/assets/css/base.less'
import 'element-plus/dist/index.css'

import Toast from '@/components/toast/Toast.vue'

//创建pinia对象
const pinia = createPinia()

const app = createApp(App);

app
.use(router)
.use(pinia)
.use(ElementPlus)
.component('toast', Toast)
.mount('#app')
