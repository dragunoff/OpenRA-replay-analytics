<template>
  <div class="c-filters mb-3 mt-1">
    <small class="d-inline-block mr-2">Channels</small>

    <b-btn-group size="sm">
      <b-btn variant="outline-primary" :pressed="chatFilter.includes('all')" @click="setFilters($event)" value="all">Show All</b-btn>

      <b-btn v-for="(channel, index) in channels" :key="index" variant="outline-primary" :pressed="chatFilter === channel || !channel && chatFilter === 'spectators'" @click="setFilters($event)" :value="channel || 'spectators'">#{{ channel || 'spectators' }}</b-btn>
    </b-btn-group>
  </div>
</template>

<script>
export default {
  computed: {
    channels() {
      return this.$store.getters['replayData/chatChannels'];
    },
    chatFilter() {
      return this.$store.state.settings.chatFilter;
    },
  },
  methods: {
    setFilters(e) {
      let newFilter = e.target.value;

      this.$store.commit('settings/setChatFilter', {
        filter: newFilter,
      });
    },
  },
};
</script>
