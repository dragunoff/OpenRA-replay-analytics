<template>
  <b-row>
    <b-col lg="7">
      <b-form @submit="onSubmit($event)">
        <b-alert variant="danger" dismissible :show="hasError">
          {{ errorMessage }}
        </b-alert>
        <fieldset :disabled="isInputDisabled">
          <b-form-group label="Replay JSON" label-for="input-replay-json">
            <b-form-textarea
              id="input-replay-json"
              name="replay-data"
              :rows="8"
              :max-rows="8"
              v-model="input"
              required
              :state="isValid"
            ></b-form-textarea>
            <small class="form-text text-muted">
              Paste the JSON output of <strong>openra-ruby</strong> or <a href="data/sample/ra-1v1-sample.json" @click="loadSampleReplay($event)">load a sample 1v1 game</a>.
            </small>
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
      input: null,
      replayJSON: null,
    };
  },
  computed: {
    isInputDisabled() {
      return this.$store.state.settings.isInputDisabled;
    },
  },
  methods: {
    loadSampleReplay(e) {
      e.preventDefault();

      if (this.isInputDisabled) {
        return;
      }

      this.$store.commit('settings/setInputDisabledState', true);

      fetch(e.target.getAttribute('href'))
        .then(response => {
          if (response.ok) {
            return response.text();
          }
          throw new Error('Error fetching sample replay data.');
        })
        .then(replayDataJSON => {
          this.input = replayDataJSON;
          this.$store.commit('settings/setInputDisabledState', false);
        })
        .catch(e => {
          this.setError(e);
          this.$store.commit('settings/setInputDisabledState', false);
        });
    },
    onSubmit(e) {
      e.preventDefault();

      if (this.isInputDisabled) {
        return;
      }

      this.clearError();

      if (!this.input) {
        return;
      }

      this.$store.commit('settings/setLoadingState', true);

      setTimeout(() => {
        try {
          this.replayJSON = Utils.cleanUpBuild(JSON.parse(this.input));
          this.replayDataReady();
        } catch (e) {
          this.setError(e);
          this.$store.commit('settings/setLoadingState', false);
        }
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
