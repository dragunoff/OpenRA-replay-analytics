<template>
  <span class="c-team-name">{{ name }}</span>
</template>

<script>
export default {
  props: {
    teamId: {
      default: false,
    },
    player: {
      type: Object,
      required: false,
    },
  },
  computed: {
    team() {
      if (this.teamId) {
        return this.teamId;
      } else if (this.player) {
        return this.player.team;
      } else {
        return null;
      }
    },
    name() {
      let name = '';
      const gameType = this.$store.state.replayData.game.type;

      if (this.team === 'spectators' || (this.player && !this.player.is_player)) {
        name = 'Spectators';
      } else if (this.team === null || this.team === 'ffa') {
        name = gameType === '1v1' ? 'Players' : 'Free for All';
      } else {
        name = `Team ${this.team}`;
      }

      return name;
    },
  },
};
</script>
