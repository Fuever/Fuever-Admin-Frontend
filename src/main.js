import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
//  additional
import ElementPlus from 'element-plus'
import axios from '@/axios.config'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

// stylesheets
import './styles/element/index.scss'
// original theme
// import 'element-plus/dist/index.css'


const app = createApp(App)
// axios
app.config.globalProperties.$axios=axios
// icon
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }
// 
app
.use(router)
.use(ElementPlus)
.mount('#app')
