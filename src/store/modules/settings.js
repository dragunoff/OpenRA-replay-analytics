const state = {
  appName: 'OpenRA Replay Analytics',
  currentTab: null,
  currentMod: null,
  iconUrl: 'assets/mods/ra/icon.png',
  isInputDisabled: false,
  isLoading: false,
  isAnalyticsReady: false,
  timelineScalingFactor: 0.005,
  buildOrderViewMode: 'simple',
  buildOrderFilter: 'all',
  chatFilter: ['all'],
};

const getters = {
  timelineSize(state, getters, rootState) {
    return rootState.replayData.game.duration.msec * state.timelineScalingFactor;
  },
};

const actions = {};

const mutations = {
  setAnalyticsReadyState(state, isReady) {
    state.isAnalyticsReady = isReady;
  },
  setInputDisabledState(state, isInputDisabled) {
    state.isInputDisabled = isInputDisabled;
  },
  setLoadingState(state, isLoading) {
    state.isLoading = isLoading;
    state.isInputDisabled = isLoading;
  },
  setCurrentTab(state, index) {
    state.currentTab = index;
  },
  setCurrentMod(state, id) {
    state.currentMod = id;
    state.iconUrl = state.iconUrl.replace(/(mods\/).+(\/)/, '$1' + id + '$2');
  },
  setBuildOrderViewMode(state, payload) {
    state.buildOrderViewMode = payload.mode;
  },
  setBuildOrderFilter(state, payload) {
    state.buildOrderFilter = payload.filter;
  },
  setChatFilter(state, payload) {
    state.chatFilter = payload.filter;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
