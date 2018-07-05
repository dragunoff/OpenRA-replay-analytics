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

      if (this.team === 'spectators' || (this.player && !this.player.is_player)) {
        name = 'Spectators';
      } else if (this.team === null || this.team === 'ffa') {
        name = 'Free for All';
      } else {
        name = `Team ${this.team}`;
      }

      return name;
    },
  },
};
</script>
