const state = {};

const getters = {
  modName: (state, getters, rootState) => {
    const id = rootState.replayData.mod;

    if (state.hasOwnProperty('name')) {
      name = state.name;
    } else {
      name = id;
    }

    return name;
  },
  isModSupported: (state, getters, rootState) => id => {
    const mod = rootState.replayData.mod;
    const supportedMods = rootState.settings.supportedMods;

    return supportedMods.includes(mod);
  },
  modFeatures: (state, getters, rootState) => {
    const id = rootState.replayData.mod;
    let features = [];

    if (state.hasOwnProperty('features')) {
      features = state.features;
    }

    return features;
  },
  factionInfo: (state, getters, rootState) => id => {
    const mod = rootState.replayData.mod;
    id = id.toLowerCase();

    if (!state.hasOwnProperty('factions')) {
      return false;
    }

    if (!state.factions.hasOwnProperty(id)) {
      return { 'id': id, 'name': id };
    }

    return state.factions[id];
  },
  actorInfo: (state, getters, rootState) => id => {
    const mod = rootState.replayData.mod;

    if (!state.hasOwnProperty('actors')) {
      return false;
    }

    if (!state.actors.hasOwnProperty(id)) {
      return { 'id': id, 'name': id, "type": "unknown" };
    }

    return state.actors[id];
  },
  buildings: (state) => {
    return _.filter(state.actors, ['type', 'building']);
  },
  defences: (state) => {
    return _.filter(state.actors, ['type', 'defence']);
  },
};

const actions = {};

const mutations = {};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
