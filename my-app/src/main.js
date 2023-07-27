import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import Antd from 'ant-design-vue'
import 'antd/dist/antd.css'
const app=createApp(App)
app.use(ElementPlus).use(Antd).use(store).use(router).mount('#app')
