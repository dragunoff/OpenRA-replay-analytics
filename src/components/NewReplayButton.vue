<template>
  <b-btn
    type="button"
    variant="outline-primary"
    size="sm"
    @click="loadNewReplay"
  >
    Load New Replay
  </b-btn>
</template>

<script>
export default {
  methods: {
    loadNewReplay() {
      this.unregisterReplayDataStore();
      this.$store.commit('settings/setAnalyticsReadyState', false);
    },
    unregisterReplayDataStore() {
      if (this.$store.hasModule('replayData')) {
        this.$store.unregisterModule('replayData');
      }
    },
  }
};
</script>
