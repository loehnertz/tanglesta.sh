import Vue from 'vue'
import axios from 'axios'

import App from './App'
import router from './router'

import 'bulma/css/bulma.css'
import 'font-awesome/css/font-awesome.css'
import Tabs from 'vue-tabs-component'

if (!process.env.IS_WEB) Vue.use(require('vue-electron'));
Vue.http = Vue.prototype.$http = axios;
Vue.config.productionTip = false;
Vue.use(Tabs);

/* eslint-disable no-new */
new Vue({
    components: {App},
    router,
    template: '<App/>'
}).$mount('#app');
