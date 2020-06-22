<template>
  <span class="c-spinner">
    <img class="c-spinner__img" :src="spinnerUrl" alt="" />
  </span>
</template>

<script>
export default {
  computed: {
    spinnerUrl() {
      let href = window.location.href.replace(/\/$/, '');

      return href + '/assets/spinner.png';
    },
  },
}
</script>

<style lang="scss">
.c-spinner {
  display: inline-block;
  width: 19px;
  height: 19px;

  &__img {
    display: inline-block;
    width: 100%;
    height: auto;
    image-rendering: crisp-edges;
    margin-top: -7px;
    margin-right: -5px;
  }
}
</style>
