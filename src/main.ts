import { createApp } from 'vue';
import App from './App.vue';
import { i18n } from '@/i18n';
import router from '@/router';
import store from '@/store';

import lazy from '@/utils/lazy';
import './assets/font/iconfont.css';
import './assets/app.css';
import './styles/index.scss';

//全局密码加密
import { AES_Encrypt, AES_Decrypt } from '@/utils/aes';

const app = createApp(App);

// 路由
app.use(router);

// 国际化
app.use(i18n);

// 状态管理
app.use(store);
// 图片懒加载
app.use(lazy);

app.mount('#app');
app.config.globalProperties.$AES_Encrypt = AES_Encrypt; //全局加密
app.config.globalProperties.$AES_Decrypt = AES_Decrypt; //全局解密
