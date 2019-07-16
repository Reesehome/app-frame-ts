import Vue from 'vue';
import App from './App.vue';
import * as FastClick from 'fastclick';
import router from './router';
import store from './store';

import './assets/styles/common/base.less';
import './assets/iconfonts/alibaba/iconfont.css';

/**
 * @description 生产环境关掉提示
 */
Vue.config.productionTip = false;
export default new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');

/*添加Fastclick移除移动端点击延迟*/
FastClick.attach(document.body);
