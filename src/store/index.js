import Vue from 'vue';
import Vuex from 'vuex';
import settings from './modules/settings';
import modData from './modules/modData';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  modules: {
    settings,
    modData,
  },
  strict: debug,
});
