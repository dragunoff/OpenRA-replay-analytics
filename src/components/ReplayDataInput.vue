<template>
  <div class="c-replay-data-input">
    <b-form @submit="onSubmit($event)">
      <b-alert variant="danger" dismissible :show="hasError">
        {{ errorMessage }}
      </b-alert>
      <fieldset class="c-replay-file-input__fieldset" :disabled=isLoading>
        <b-form-group label="Replay JSON" label-for="input-replay-data">
          <b-form-textarea name="replay-data" :rows="8" :max-rows="8" v-model="input" required :state="isValid"></b-form-textarea>
          <small class="form-text text-muted">
            Paste the JSON output of <strong>openra-ruby</strong> or <a href="data/sample/ra-1v1-sample.json" @click="loadSampleReplay($event)">load a sample 1v1 game</a>.
          </small>
        </b-form-group>
        <Submit />
      </fieldset>
    </b-form>
  </div>
</template>

<script>
import { EventBus } from '../event-bus.js';

import Submit from './Submit.vue';

export default {
  components: {
    Submit,
  },
  data() {
    return {
      isValid: null,
      hasError: false,
      errorMessage: '',
      input: null,
      replayJSON: null,
    };
  },
  computed: {
    isLoading() {
      return this.$store.state.settings.isLoading;
    },
  },
  methods: {
    loadSampleReplay(e) {
      e.preventDefault();

      if (this.isLoading) {
        return;
      }

      this.$store.commit('settings/setLoadingState', true);

      fetch(e.target.getAttribute('href'))
        .then(response => {
          if (response.ok) {
            return response.text();
          }
          throw new Error('Error fetching sample replay data.');
        })
        .then(replayDataJSON => {
          this.input = replayDataJSON;
          this.$store.commit('settings/setLoadingState', false);
        })
        .catch(e => {
          this.setError(e);
          this.$store.commit('settings/setLoadingState', false);
        });
    },
    onSubmit(e) {
      e.preventDefault();

      if (this.input) {
        this.$store.commit('settings/setLoadingState', true);

        try {
          this.replayJSON = JSON.parse(this.input);
          this.replayDataReady();
        } catch (e) {
          this.setError(e);
          this.$store.commit('settings/setLoadingState', false);
        }
      }
    },
    replayDataReady() {
      EventBus.$emit('replayDataReady', this.replayJSON);
    },
    setError(e) {
      this.isValid = false;
      this.hasError = true;
      this.errorMessage = `${e.name}: ${e.message}`;
    },
  },
};
</script>

<style lang="scss">
.c-replay-data-input {
  &__fieldset {
    max-width: 50rem;
  }
}
</style>
