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
  },
  // HACK: Try to work-around a bug where sometimes a building
  // registers as being placed twice in quick succession
  cleanUpBuild(replayJSON) {
    if (replayJSON.game.options.cheats_enabled) {
      return replayJSON;
    }

    const threshold = 300;

    _.each(replayJSON.clients, (client, index) => {

      _.reverse(client.build);

      let prevStructure, prevTimestamp;

      let cleanBuild = _.filter(client.build, build => {
        if (
          build.structure === prevStructure
          && build.game_time.msec + threshold >= prevTimestamp
        ) {
          return false;
        }

        prevStructure = build.structure;
        prevTimestamp = build.game_time.msec;

        return true;
      });

      _.reverse(client.build);

      replayJSON.clients[index].build = cleanBuild;
    });

    return replayJSON;
  }
}
