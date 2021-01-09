import store from './store';
import router from './router';
import replayDataStore from './store/modules/replayData';
import { EventBus } from './event-bus.js';

export default function replayDataManager() {

  EventBus.$on('ReplayDataReady', onReplayDataReady);

  function onReplayDataReady(replayJSON) {
    registerReplayDataStore(replayJSON);
    store.commit('settings/setCurrentMod', replayJSON.mod);
    store.commit('settings/setAnalyticsReadyState', true);
    store.commit('settings/setLoadingState', false);
    router.push({ name: 'analyze' });
  }

  function loadNewReplay() {
    unregisterReplayDataStore();
    store.commit('settings/setAnalyticsReadyState', false);
    router.push('/');
  }

  function registerReplayDataStore(replayJSON) {
    if (store.hasModule('replayData')) {
      return;
    }

    replayDataStore.state = replayJSON;
    store.registerModule('replayData', replayDataStore);
  }

  function unregisterReplayDataStore() {
    if (store.hasModule('replayData')) {
      store.unregisterModule('replayData');
    }
  }

  return {
    loadNewReplay: loadNewReplay,
  }
}
