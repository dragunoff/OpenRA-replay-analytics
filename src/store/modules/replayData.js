import _ from 'lodash';
import Utils from '../../utils.js';

const state = {};

const getters = {
  gameTimeISO(state) {
    let time = {};

    time.start = state.game.start_time;
    time.end = state.game.end_time;

    return time;
  },
  teams(state) {
    var teams = {};
    const clients = state.clients;

    // build object for teams
    _.forEach(clients, function(client) {
      const team = Utils.getClientTeam(client);

      if (Object.prototype.hasOwnProperty.call(teams, team)) {
        return;
      }
      teams = Object.defineProperty(teams, team, {
        value: [],
        enumerable: true,
      });
    });

    // add clients to teams
    _.forEach(clients, function(client) {
      const team = Utils.getClientTeam(client);
      teams[team].push(client);
    });

    return teams;
  },
  versus(state, getters) {
    const teams = getters.teams;
    var versus = '';

    _.forEach(teams, function(clients, teamName) {
      if ('spectators' === teamName) {
        return;
      }

      versus = versus ? `${versus} VS ` : '';
      var playersNames = _.map(clients, 'name');
      var sep = ', ';
      var lastPlayer;

      if ('ffa' === teamName) {
        sep = ' VS ';
      } else if (playersNames.length > 2) {
        lastPlayer = playersNames.pop();
      }

      versus = versus + playersNames.join(sep);

      if (lastPlayer) {
        versus = versus + ' & ' + lastPlayer;
      }
    });

    return versus;
  },
  players(state, getters) {
    return _.omit(getters.teams, 'spectators');
  },
  spectators(state) {
    return _.filter(state.clients, { is_player: false });
  },
  chat(state) {
    return state.chat;
  },
  chatChannels(state) {
    let messages = state.chat;
    let channels = [];

    _.forEach(messages, function(message) {
      _.forOwn(message, function(value, key) {
        if('channel' !== key) {
          return;
        }

        if(null === value && !channels.includes('spectators')) {
          value = 'spectators';
        }

        if(channels.includes(value)) {
          return;
        }

        channels.push(value);
      });
    });

    return _.compact(channels);
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
