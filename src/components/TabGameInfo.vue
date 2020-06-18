<template>
  <div class="c-tab-game-info row">
    <dl class="col-sm">
      <dt>Mod</dt>
      <dd>
        <ModName /> ({{ replayData.version }})
      </dd>

      <dt>Map</dt>
      <dd>
        {{ replayData.map.name }}
        <MapInfo :hash="replayData.map.hash" />
      </dd>

      <dt>Game type</dt>
      <dd>{{ replayData.game.type }}</dd>

      <dt>Duration</dt>
      <dd>{{ replayData.game.duration.msec | duration('humanize') }} ({{ replayData.game.duration.formatted }})</dd>

      <dt>Start time</dt>
      <dd><time :datetime="gameTimeISO.start" :title="gameTimeISO.start">{{ gameTimeISO.start | moment('dddd, MMMM Do YYYY [at] h:mm:ss a') }}</time></dd>

      <dt>Server name</dt>
      <dd>{{ replayData.server_name }}</dd>
    </dl>

    <dl class="col-sm">
      <dt>Options</dt>
      <dd v-for="(value, name) of replayData.game.options" :key="name" class="c-tab-game-info__option">
        {{ name | prettifyOptionName }}: {{ value | prettifyOptionValue }}
      </dd>
    </dl>
  </div>
</template>

<script>
import ModName from './ModName.vue';
import MapInfo from './MapInfo.vue';

export default {
  components: {
    ModName,
    MapInfo,
  },
  computed: {
    replayData() {
      return this.$store.state.replayData;
    },
    gameTimeISO() {
      return this.$store.getters['replayData/gameTimeISO'];
    },
  },
  filters: {
    prettifyOptionName(name) {
      let prettyName = name.replace(/_/gi, ' ');
      return prettyName;
    },
    prettifyOptionValue(value) {
      if (true === value) {
        value = 'Yes';
      } else if (false === value) {
        value = 'No';
      }

      return value;
    }
  }
};
</script>

<style lang="scss">
.c-tab-game-info {

  &__option {
    text-transform: capitalize;
  }
}
</style>

