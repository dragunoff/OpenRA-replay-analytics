import _ from 'lodash';

export default {
  mergeActors(build, powers) {
    let merged = [].concat(build, powers);
    merged = _.sortBy(merged, [function(obj) { return obj.game_time.msec; }]);
    merged = merged.map(obj => {
      if (Object.prototype.hasOwnProperty.call(obj, 'structure')) {
        obj.actor_id = obj.structure;
        obj.actor_type = 'build';
      } else if (Object.prototype.hasOwnProperty.call(obj, 'type')) {
        obj.actor_id = obj.type;
        obj.actor_type = 'support_power';
      }
      return obj;
    });

    return merged;
  },
  getClientTeam(client) {
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
}
