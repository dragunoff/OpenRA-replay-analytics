import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';
import VueMoment from 'vue-moment';
import store from './store';
import router from './router';
import App from './components/App.vue';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import storageManager from './storage-manager.js';
import replayDataManager from './replay-data-manager.js';

Vue.config.productionTip = false
Vue.use(BootstrapVue);
Vue.use(VueMoment);
Vue.prototype.$storageManager = storageManager();
Vue.prototype.$replayDataManager = replayDataManager();

new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App),
})
