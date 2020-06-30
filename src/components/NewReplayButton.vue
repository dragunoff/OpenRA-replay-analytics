<template>
  <b-btn
    type="button"
    variant="outline-primary"
    size="sm"
    @click="onClick"
  >
    Load New Replay
  </b-btn>
</template>

<script>
export default {
  methods: {
    onClick() {
      this.$replayDataManager.loadNewReplay();
    },
  }
};
</script>
