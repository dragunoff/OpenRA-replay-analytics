<template>
  <span class="c-mod-name">
    {{ modName }}
  </span>
</template>

<script>
export default {
  computed: {
    modName() {
      return this.$store.getters['modData/modName'];
    },
  },
};
</script>
