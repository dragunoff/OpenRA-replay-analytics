<template>
  <b-btn type="submit" variant="primary">
    {{ isLoading ? 'Analyzing Replay&hellip;' : 'Submit' }}
    <Spinner v-if="isLoading" />
  </b-btn>
</template>

<script>
import Spinner from './Spinner.vue';

export default {
  components: {
    Spinner,
  },
  computed: {
    isLoading() {
      return this.$store.state.settings.isLoading;
    },
  },
};
</script>
