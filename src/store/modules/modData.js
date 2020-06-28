import _ from 'lodash';
import * as defaultMod from '../data/default.json';
import * as cnc from '../data/cnc.json';
import * as ra from '../data/ra.json';
import * as d2k from '../data/d2k.json';
import * as ts from '../data/ts.json';

const state = {
  'default': defaultMod.default,
  'cnc': cnc.default,
  'ra': ra.default,
  'd2k': d2k.default,
  'ts': ts.default,
};

const getters = {
  modName: (state, getters, rootState) => mod => {
    mod = mod ? mod.toLowerCase() : rootState.replayData.mod;

    if (
      Object.prototype.hasOwnProperty.call(state, mod)
      && Object.prototype.hasOwnProperty.call(state[mod], 'name')
    ) {
      return state[mod].name;
    } else {
      return mod;
    }
  },
  modFeatures: (state, getters, rootState) => mod => {
    mod = mod ? mod.toLowerCase() : rootState.replayData.mod;
    let features = [];

    if (
      Object.prototype.hasOwnProperty.call(state, mod)
      && Object.prototype.hasOwnProperty.call(state[mod], 'features')
    ) {
      features = state[mod].features;
    }

    return features;
  },
  factionInfo: (state, getters, rootState) => (id, mod) => {
    id = id.toLowerCase();
    mod = mod ? mod.toLowerCase() : rootState.replayData.mod;

    if (
      !Object.prototype.hasOwnProperty.call(state, mod)
      || !Object.prototype.hasOwnProperty.call(state[mod], 'factions')
    ) {
      return null;
    }

    if (!Object.prototype.hasOwnProperty.call(state[mod].factions, id)) {
      return { 'id': id, 'name': id };
    }

    return state[mod].factions[id];
  },
  actorInfo: (state, getters, rootState) => (id, mod) => {
    id = id.toLowerCase();
    mod = mod ? mod.toLowerCase() : rootState.replayData.mod;

    if (
      !Object.prototype.hasOwnProperty.call(state, mod)
      || !Object.prototype.hasOwnProperty.call(state[mod], 'actors')
    ) {
      return null;
    }

    if (!Object.prototype.hasOwnProperty.call(state[mod].actors, id)) {
      return { 'id': id, 'name': id, 'type': 'unknown' };
    }

    return state[mod].actors[id];
  },
  supportPowerInfo: (state, getters, rootState) => (id, mod) => {
    id = id.toLowerCase();
    mod = mod ? mod.toLowerCase() : rootState.replayData.mod;

    if (
      !Object.prototype.hasOwnProperty.call(state, mod)
      || !Object.prototype.hasOwnProperty.call(state[mod], 'support_powers')
    ) {
      return null;
    }

    if (!Object.prototype.hasOwnProperty.call(state[mod].support_powers, id)) {
      return { 'id': id, 'name': id, 'type': 'unknown' };
    }

    return state[mod].support_powers[id];
  },
  buildings: (state, getters, rootState) => {
    const mod = rootState.replayData.mod;
    return _.filter(state[mod].actors, ['type', 'building']);
  },
  defences: (state, getters, rootState) => {
    const mod = rootState.replayData.mod;
    return _.filter(state[mod].actors, ['type', 'defence']);
  },
  support_powers: (state, getters, rootState) => {
    const mod = rootState.replayData.mod;
    return _.filter(state[mod].support_powers, ['type', 'support_power']);
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
