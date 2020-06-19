<template>
  <div>
    <b-form @submit="onSubmit($event)">
      <b-alert variant="danger" dismissible :show="hasError">
        {{ errorMessage }}
      </b-alert>
      <fieldset :disabled=isLoading>
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
        <b-btn type="submit" variant="primary">
          Submit
          <b-spinner small v-if="isLoading"></b-spinner>
        </b-btn>
      </fieldset>
    </b-form>
  </div>
</template>

<script>
import { EventBus } from '../event-bus.js';

const GEM_ENDPOINT = 'http://li2152-223.members.linode.com/replays/data';

export default {
  data() {
    return {
      isValid: null,
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

        fetch(GEM_ENDPOINT, {
          method: 'POST',
          body: formData
        }).then(
          response => response.json()
        ).then(replayJSON => {
          this.replayJSON = replayJSON;
          this.onReplayDataReady();
        }).catch(e => {
          this.setError(e);
          this.$store.commit('settings/setLoadingState', false);
        });
      }
    },
    onReplayDataReady() {
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
