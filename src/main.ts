import { createApp } from 'vue'
//状态管理库
import {createPinia} from 'pinia'
//自定义的通用样式
import '@/style.scss'
//根组件
import App from './App.vue'
//windi样式库
import 'virtual:windi.css'
/****************vant的样式手动引入* */
import {Search,Card,Icon,Skeleton,ShareSheet,showToast,
Dialog,showDialog} from "vant"
import 'vant/lib/index.css';

/*************** */
//路由
import router from "./router/index"

import axios from 'axios'



createApp(App)
    .use(createPinia())
    .use(router)
    .use(Search)
    .use(Card)
    .use(Icon)
    .use(Skeleton)
    .use(ShareSheet)
    .use(showToast)
    .use(Dialog)
    .use(showDialog)
    .mount('#app')
