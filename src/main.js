import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';
import VueMoment from 'vue-moment';
import store from './store';
import App from './components/App.vue';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import storageManager from './storage-manager.js';

Vue.config.productionTip = false
Vue.use(BootstrapVue);
Vue.use(VueMoment);
Vue.prototype.$storageManager = storageManager();

new Vue({
  el: '#app',
  store,
  render: h => h(App),
})
