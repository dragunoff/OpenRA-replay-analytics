<template>
  <div class="c-client-info">
    <h4>{{ client.name }}</h4>
    <Faction :faction="client.faction" />

    <div class="c-client-info__icons">
      <span v-if="client.is_player" class="c-client-info__color is-help" :title="'Player color: #' + client.color" :style="{ backgroundColor: '#' + client.color }"></span>
      <i v-if="client.is_player && !client.is_bot" class="material-icons is-help" title="Human Player">person</i>
      <i v-if="client.is_player && client.is_bot" class="material-icons is-help" title="AI Player">computer</i>
      <i v-if="!client.is_player" class="material-icons is-help" title="Spectator">remove_red_eye</i>
      <i v-if="client.is_winner" class="material-icons is-help" title="Winner">stars</i>
    </div>

    <span class="o-label" v-if="showTeam"><TeamName :player="client" /></span>
  </div>
</template>

<script>
import Faction from './Faction.vue';
import TeamName from './TeamName.vue';

export default {
  props: {
    client: Object,
    showTeam: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    Faction,
    TeamName,
  },
};
</script>

<style lang="scss">
.c-client-info {
  &__color {
    position: relative;
    top: -2px;

    display: inline-block;
    height: 20px;
    width: 20px;
    border: 2px solid transparent;

    border-radius: 100%;
  }
}
</style>
