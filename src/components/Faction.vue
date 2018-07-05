<template>
  <span class="c-faction" v-if="faction.actual">
    <span class="c-faction__name">{{ info.name }}</span> <small v-if="faction.chosen !== faction.actual" class="c-faction__chosen">({{ faction.chosen }})</small>
  </span>
</template>

<script>
export default {
  props: {
    faction: Object,
  },
  computed: {
    info() {
      return this.$store.getters['modData/factionInfo'](this.faction.actual.toLowerCase());
    },
  },
};
</script>
