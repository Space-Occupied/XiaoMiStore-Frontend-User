import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createBootstrap } from 'bootstrap-vue-next'
import { BModal } from 'bootstrap-vue-next';
// import './style.css'
import router from './router';
import App from './App.vue';
import 'bootstrap/dist/css/bootstrap.css' //引用bootstrap的样式
import 'bootstrap/dist/js/bootstrap.min.js' //引用bootstrap的js
import 'font-awesome/css/font-awesome.min.css'
import 'bootstrap-vue-next/dist/bootstrap-vue-next.css'
import '@/assets/iconfont/iconfont.css'
import store from './store'

const pinia = createPinia();
const app = createApp(App);
app.use(router);
app.component('BModal', BModal); // 单独注册组件
app.use(pinia);
app.use(store);
app.use(createBootstrap());
app.mount('#app')
