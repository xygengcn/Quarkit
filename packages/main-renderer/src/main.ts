import { createApp } from 'vue';
import App from './App';
import Transport from './transport';
import { createPinia } from 'pinia';

// 注册pinia
const pinia = createPinia();

// 注册通信工具
const transport = new Transport();
window.$api = transport;

createApp(App).use(pinia).mount('#app');
