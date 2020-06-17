const state = {
  appName: 'OpenRA Replay Analytics',
  supportedMods: ['cnc', 'ra', 'd2k', 'ts'],
  currentTab: null,
  currentMod: 'ra',
  iconUrl: 'assets/mods/ra/icon.png',
  isReplayDataReady: false,
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
  setReplayDataReadyState(state, ready) {
    state.isReplayDataReady = ready;
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
