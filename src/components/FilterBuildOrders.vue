<template>
  <div class="c-filters mb-3 mt-1">
    <small class="d-inline-block mr-2">View mode</small>
    <b-btn-group size="sm">
      <b-btn variant="outline-primary" :pressed="buildOrderViewMode === 'simple'" @click="setViewMode($event)" value="simple">Simple</b-btn>
      <b-btn variant="outline-primary" :pressed="buildOrderViewMode === 'timeline'" @click="setViewMode($event)" value="timeline">Timeline</b-btn>
      <b-btn variant="outline-primary" :pressed="buildOrderViewMode === 'stats'" @click="setViewMode($event)" value="stats">Statistics</b-btn>
    </b-btn-group>
    <small class="d-inline-block mr-2 ml-5">Show</small>
    <b-btn-group size="sm">
      <b-btn variant="outline-primary" :pressed="buildOrderFilter === 'all'" @click="setFilters($event)" value="all">Everything</b-btn>
      <b-btn v-if="modFeatures.includes('buildings')" variant="outline-primary" :pressed="buildOrderFilter === 'building'" @click="setFilters($event)" value="building">Buildings</b-btn>
      <b-btn v-if="modFeatures.includes('defences')" variant="outline-primary" :pressed="buildOrderFilter === 'defence'" @click="setFilters($event)" value="defence">Defences</b-btn>
      <b-btn v-if="modFeatures.includes('support_powers')" variant="outline-primary" :pressed="buildOrderFilter === 'support_power'" @click="setFilters($event)" value="support_power">Support Powers</b-btn>
    </b-btn-group>
  </div>
</template>

<script>
export default {
  computed: {
    buildOrderViewMode() {
      return this.$store.state.settings.buildOrderViewMode;
    },
    buildOrderFilter() {
      return this.$store.state.settings.buildOrderFilter;
    },
    modFeatures() {
      return this.$store.getters['modData/modFeatures']();
    },
  },
  methods: {
    setViewMode(e) {
      let newMode = e.target.value;

      this.$store.commit('settings/setBuildOrderViewMode', {
        mode: newMode,
      });
    },
    setFilters(e) {
      let newFilter = e.target.value;

      this.$store.commit('settings/setBuildOrderFilter', {
        filter: newFilter,
      });
    },
  },
};
</script>
