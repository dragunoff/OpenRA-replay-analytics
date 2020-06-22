<template>
  <div class="c-replay-file-input">
    <b-form @submit="onSubmit($event)">
      <b-alert variant="danger" dismissible :show="hasError">
        {{ errorMessage }}
      </b-alert>
      <fieldset class="c-replay-file-input__fieldset" :disabled=isLoading>
        <b-form-group label="Replay file" label-for="input-replay-data">
          <b-form-file
            v-model="file"
            accept=".orarep"
            :required="true"
          ></b-form-file>
          <small class="form-text text-muted">
            Choose or drag and drop an <strong>.orarep</strong> file.
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
      hasError: false,
      errorMessage: '',
      file: null,
      replayJSON: null,
    };
  },
  computed: {
    isLoading() {
      return this.$store.state.settings.isLoading;
    },
  },
  methods: {
    onSubmit(e) {
      e.preventDefault();

      if (this.file) {
        this.$store.commit('settings/setLoadingState', true);

        const formData = new FormData(e.target);
        formData.append('data', this.file);

        fetch(process.env.VUE_APP_OPENRA_API_ENDPOINT, {
          method: 'POST',
          body: formData
        }).then(
          response => response.json()
        ).then(replayJSON => {
          this.replayJSON = replayJSON;
          this.replayDataReady();
        }).catch(e => {
          this.setError(e);
          this.$store.commit('settings/setLoadingState', false);
        });
      }
    },
    replayDataReady() {
      EventBus.$emit('replayDataReady', this.replayJSON);
    },
    setError(e) {
      this.hasError = true;
      this.errorMessage = `${e.name}: ${e.message}`;
    },
  },
};
</script>

<style lang="scss">
.c-replay-file-input {
  &__fieldset {
    max-width: 50rem;
  }
}
</style>
