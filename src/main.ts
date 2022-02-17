import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import router from '@/router'
import { createPinia } from 'pinia'
import App from '@/App.vue'

//css
import '@/assets/css/base.less'
import 'element-plus/dist/index.css'

//创建pinia对象
const pinia = createPinia()

const app = createApp(App);

app
.use(router)
.use(pinia)
.use(ElementPlus)
.mount('#app')
