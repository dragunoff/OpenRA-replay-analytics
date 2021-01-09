import Vue from 'vue';
import VueRouter from 'vue-router';

import store from './../store';

import Home from './Home.vue';
import Analyze from './analyze/Analyze.vue';
import SourceHash from './source-hash/SourceHash.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/analyze',
    name: 'analyze',
    component: Analyze,
    beforeEnter: (to, from, next) => {
      if (!store.state.settings.isAnalyticsReady) {
        next('/');
      }

      next();
    }
  },
  { path: '/:source(oraladder|ragl)/:hash', component: SourceHash },
  { path: '*', component: Home },
];

export default new VueRouter({
  routes
});
