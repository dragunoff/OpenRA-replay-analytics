import _ from 'lodash';

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

    function getCurrentClientTeam(client) {
      let team;

      if (!client.team && client.is_player) {
        team = 'ffa';
      } else if (!client.team && !client.is_player) {
        team = 'spectators';
      } else {
        team = client.team;
      }

      return team;
    }

    // build object for teams
    _.forEach(clients, function(client) {
      let team = getCurrentClientTeam(client);

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
      let team = getCurrentClientTeam(client);
      teams[team].push(client);
    });

    return teams;
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
