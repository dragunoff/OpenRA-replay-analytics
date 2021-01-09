<template>
  <span class="c-spinner">
    <img class="c-spinner__img" :src="spinnerUrl" alt="" />
  </span>
</template>

<script>
export default {
  computed: {
    spinnerUrl() {
      return './assets/spinner.webp';
    },
  },
}
</script>

<style lang="scss">
.c-spinner {
  display: inline-block;
  width: 18px;
  height: 18px;

  &__img {
    display: inline-block;
    width: 100%;
    height: auto;
    image-rendering: crisp-edges;
    margin-top: -3px;
    margin-right: -8px;
  }
}
</style>
