<template>
  <b-row>
    <b-col lg="7">
      <b-form @submit="onSubmit($event)">
        <b-alert variant="danger" dismissible :show="hasError">
          {{ errorMessage }}
        </b-alert>
        <fieldset :disabled="isInputDisabled">
          <b-form-group label="Replay hash" label-for="input-replay-hash">
            <b-form-input
              id="input-replay-hash"
              type="text"
              name="hash"
              v-model="hash"
              required
              :state="isValid"
            ></b-form-input>
            <small class="form-text text-muted">
              Paste the <strong>replay hash</strong> from <a href="http://oraladder.net/">ORALadder</a> or <a href="http://ragl.org/">RAGL</a>.
            </small>
          </b-form-group>
          <b-form-group label="Source" label-for="input-replay-hash-source">
            <b-form-radio-group
              id="input-replay-hash-source"
              v-model="source"
              name="input-replay-hash-source"
            >
              <b-form-radio value="oraladder">ORA Ladder</b-form-radio>
              <b-form-radio value="ragl">RAGL</b-form-radio>
            </b-form-radio-group>
          </b-form-group>
          <Submit />
        </fieldset>
      </b-form>
    </b-col>
  </b-row>
</template>

<script>
import { EventBus } from '../event-bus.js';
import Utils from '../utils.js';

import Submit from './Submit.vue';

export default {
  components: {
    Submit,
  },
  data() {
    return {
      isValid: null,
      hasError: false,
      errorMessage: null,
      hash: null,
      source: 'oraladder',
      replayJSON: null,
    };
  },
  computed: {
    isInputDisabled() {
      return this.$store.state.settings.isInputDisabled;
    },
  },
  methods: {
    onSubmit(e) {
      e.preventDefault();

      if (this.isInputDisabled) {
        return;
      }

      this.clearError();

      if (!this.hash) {
        return;
      }

      this.$store.commit('settings/setLoadingState', true);

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
      this.isValid = false;
      this.hasError = true;
      this.errorMessage = `${e.name}: ${e.message}`;
    },
    clearError() {
      this.isValid = null;
      this.hasError = false;
      this.errorMessage = null;
    },
  },
};
</script>
