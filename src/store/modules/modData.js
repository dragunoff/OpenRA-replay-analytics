import _ from 'lodash';

const state = {};

const getters = {
  modName: (state, getters, rootState) => {
    const id = rootState.replayData.mod;
    let name = '';

    if (Object.prototype.hasOwnProperty.call(state, 'name')) {
      name = state.name;
    } else {
      name = id;
    }

    return name;
  },
  isModSupported: (state, getters, rootState) => () => {
    const mod = rootState.replayData.mod;
    const supportedMods = rootState.settings.supportedMods;

    return supportedMods.includes(mod);
  },
  modFeatures: (state) => {
    let features = [];

    if (Object.prototype.hasOwnProperty.call(state, 'features')) {
      features = state.features;
    }

    return features;
  },
  factionInfo: (state) => id => {
    id = id.toLowerCase();

    if (!Object.prototype.hasOwnProperty.call(state, 'factions')) {
      return false;
    }

    if (!Object.prototype.hasOwnProperty.call(state.factions, id)) {
      return { 'id': id, 'name': id };
    }

    return state.factions[id];
  },
  actorInfo: (state) => id => {
    if (!Object.prototype.hasOwnProperty.call(state, 'actors')) {
      return false;
    }

    if (!Object.prototype.hasOwnProperty.call(state.actors, id)) {
      return { 'id': id, 'name': id, 'type': 'unknown' };
    }

    return state.actors[id];
  },
  supportPowerInfo: (state) => id => {
    if (!Object.prototype.hasOwnProperty.call(state, 'support_powers')) {
      return false;
    }

    if (!Object.prototype.hasOwnProperty.call(state.support_powers, id)) {
      return { 'id': id, 'name': id, 'type': 'unknown' };
    }

    return state.support_powers[id];
  },
  buildings: (state) => {
    return _.filter(state.actors, ['type', 'building']);
  },
  defences: (state) => {
    return _.filter(state.actors, ['type', 'defence']);
  },
  support_powers: (state) => {
    return _.filter(state.support_powers, ['type', 'support_power']);
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
