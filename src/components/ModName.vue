<template>
  <span class="c-mod-name">
    {{ modName }}
  </span>
</template>

<script>
export default {
  props: {
    mod: {
      type: String,
      default: null,
    },
  },
  computed: {
    modName() {
      return this.$store.getters['modData/modName'](this.mod);
    },
  },
};
</script>
