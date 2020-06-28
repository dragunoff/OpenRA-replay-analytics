<template>
  <span class="c-faction" v-if="faction.actual">
    <span class="c-faction__name">{{ actual.name }}</span> <small v-if="faction.chosen !== faction.actual" class="c-faction__chosen">({{ chosen.name }})</small>
  </span>
</template>

<script>
export default {
  props: {
    faction: Object,
    mod: {
      type: String,
      default: null,
    },
  },
  computed: {
    actual() {
      return this.$store.getters['modData/factionInfo'](this.faction.actual, this.mod);
    },
    chosen() {
      return this.$store.getters['modData/factionInfo'](this.faction.chosen, this.mod);
    },
  },
};
</script>
