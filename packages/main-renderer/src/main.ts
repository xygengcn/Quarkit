import { createApp } from 'vue';
import App from './App';
import Transport from './transport';

// 注册通信工具
const transport = new Transport();
window.$api = transport;

createApp(App).mount('#app');
