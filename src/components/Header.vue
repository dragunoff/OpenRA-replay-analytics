<template>
  <b-jumbotron>
    <h1 class="display-4">{{ players }}</h1>
    <p class="lead">on map "{{ map.name }}" in <ModName /></p>
  </b-jumbotron>
</template>

<script>
import _ from 'lodash';
import ModName from './ModName.vue';

export default {
  components: {
    ModName,
  },
  computed: {
    modName() {
      return this.$store.getters['modData/modName'];
    },
    map() {
      return this.$store.state.replayData.map;
    },
    players() {
      const teams = this.$store.getters['replayData/teams'];
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
  },
  created() {
    document.title = `${this.players} on map "${this.map.name}" in ${this.modName} | ${
      this.$store.state.settings.appName
    }`;
  },
};
</script>
