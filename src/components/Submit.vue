<template>
  <div>
    <b-btn
      type="submit"
      variant="primary"
      :disabled="isInputDisabled"
      @click="onClick"
    >
      {{ isLoading ? this.loadingLabel : this.defaultLabel }}
      <Spinner v-show="isLoading" />
    </b-btn>
    <small class="d-block mt-2 text-muted" v-if="isTakingTooLong && isLoading">
      Please be patient, large replays may take several minutes to process.
    </small>
  </div>
</template>

<script>
import Spinner from './Spinner.vue';

export default {
  components: {
    Spinner,
  },
  props: {
    isButton: {
      type: Boolean,
      default: true,
    },
    defaultLabel: {
      type: String,
      default: 'Submit',
    },
  },
  data() {
    return {
      isTakingTooLong: false,
      delay: 5000,
      loadingLabel: 'Submit',
    }
  },
  computed: {
    isLoading() {
      return this.$store.state.settings.isLoading;
    },
    isInputDisabled() {
      return !this.isButton || this.$store.state.settings.isInputDisabled;
    },
  },
  methods: {
    onClick() {
      this.resetState();
      setTimeout(this.updateLabel, 0, Date.now());
    },
    resetState() {
      this.loadingLabel = this.defaultLabel;
      this.isTakingTooLong = false;
    },
    updateLabel(startTime) {
      if (!this.isLoading) {
        this.resetState();
        return;
      }

      const elapsed = Date.now() - startTime;

      if (elapsed >= this.delay * 4) {
        this.isTakingTooLong = true;
        return;
      }

      if (elapsed >= this.delay * 3) {
        this.loadingLabel = 'Engineering...';
      } else if (elapsed >= this.delay * 2) {
        this.loadingLabel = 'Examining diagrams...';
      } else if (elapsed >= this.delay) {
        this.loadingLabel = 'Studying blue prints...';
      } else {
        this.loadingLabel = 'Analyzing schematics...';
      }

      setTimeout(this.updateLabel, this.delay, startTime);
    }
  },
  mounted() {
    if(!this.isButton) {
      this.onClick();
    }
  }
};
</script>
