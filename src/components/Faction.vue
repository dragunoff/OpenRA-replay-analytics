<template>
  <span class="c-faction" v-if="faction.actual">
    <span class="c-faction__name">{{ actual.name }}</span> <small v-if="faction.chosen !== faction.actual" class="c-faction__chosen">({{ chosen.name }})</small>
  </span>
</template>

<script>
export default {
  props: {
    faction: Object,
  },
  computed: {
    actual() {
      return this.$store.getters['modData/factionInfo'](this.faction.actual);
    },
    chosen() {
      return this.$store.getters['modData/factionInfo'](this.faction.chosen);
    },
  },
};
</script>
