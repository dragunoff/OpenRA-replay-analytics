<template>
  <b-alert variant="danger" dismissible :show="hasError">
    {{ errorMessage }}
  </b-alert>
</template>

<script>
import { EventBus } from '../event-bus.js';
import Utils from '../utils.js';

export default {
  props: {
    hash: {
      type: String,
      default: null,
    },
    source: {
      type: String,
      default: null,
    },
  },
  data () {
    return {
      hasError: false,
      errorMessage: null,
      replayJSON: null,
    }
  },
  created () {
    this.fetchData()
  },
  watch: {
    // call again the method if the route changes
    // TODO: Do we need this?
    '$route': 'fetchData'
  },
  methods: {
    fetchData() {
      this.clearError();

      if (!this.source || !this.hash) {
        return;
      }

      this.$store.commit('settings/setLoadingState', true);

      // TODO: Move this to a service and reuse in all API calls
      setTimeout(() => {
        fetch(`${process.env.VUE_APP_OPENRA_API_ENDPOINT}/${this.source}/${this.hash}`).then(
          response => response.json()
        ).then(replayJSON => {
          this.replayJSON = Utils.cleanUpBuild(replayJSON);
          this.replayDataReady();
        }).catch(e => {
          this.setError(e);
          this.$store.commit('settings/setLoadingState', false);
        });
      }, 0);
    },
    replayDataReady() {
      EventBus.$emit('ReplayDataReady', this.replayJSON);
      this.$storageManager.storeReplay(this.replayJSON);
    },
    setError(e) {
      this.hasError = true;
      this.errorMessage = `${e.name}: ${e.message}`;
    },
    clearError() {
      this.hasError = false;
      this.errorMessage = null;
    },
  },
}
</script>
