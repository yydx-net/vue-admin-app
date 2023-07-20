import { createApp, createVNode } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import antd from 'ant-design-vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'antd/dist/antd.css'
const Vnode=createVNode()
createApp(App).use(antd).use(ElementPlus).use(store).use(router).mount('#app')
