<template>
  <b-form @submit="onSubmit($event)">
    <b-alert variant="danger" dismissible :show="hasError">
      {{ errorMessage }}
    </b-alert>
    <fieldset ref="fieldsetInputReplayData">
      <b-form-group label="Replay JSON" label-for="input-replay-data">
        <b-form-textarea name="replay-data" :rows="10" :max-rows="10" v-model="inputReplayData" required :state="isValid" tabindex="1"></b-form-textarea>
        <small class="form-text text-muted">
          Paste the output of <strong>openra-ruby</strong> or <a href="data/sample/ra-1v1-sample.json" @click="loadSampleReplay($event)">load a sample 1v1 game</a>.
        </small>
      </b-form-group>
      <b-btn type="submit" variant="primary" tabindex="2">Submit</b-btn>
    </fieldset>
  </b-form>
</template>

<script>
import replayDataStore from '../store/modules/replayData';
import modDataStore from '../store/modules/modData';

export default {
  data() {
    return {
      isValid: null,
      hasError: false,
      errorMessage: '',
      inputReplayData: '',
    };
  },
  computed: {
    supportedMods() {
      return this.$store.state.settings.supportedMods;
    },
  },
  methods: {
    onSubmit(e) {
      e.preventDefault();
      this.disableInput();

      if (this.inputReplayData) {
        try {
          let inputReplayDataJSON = JSON.parse(this.inputReplayData);
          this.registerReplayDataStore(inputReplayDataJSON);
          this.registerModDataStore(inputReplayDataJSON);
        } catch (e) {
          this.setError(e);
          this.enableInput();
        }
      } else {
        this.enableInput();
      }
    },
    disableInput() {
      this.$refs.fieldsetInputReplayData.setAttribute('disabled', 'disabled');
    },
    enableInput() {
      this.$refs.fieldsetInputReplayData.removeAttribute('disabled');
    },
    registerReplayDataStore(inputReplayDataJSON) {
      replayDataStore.state = inputReplayDataJSON;
      this.$store.registerModule('replayData', replayDataStore);
    },
    registerModDataStore(inputReplayDataJSON) {
      let mod = inputReplayDataJSON.mod;
      let isModSupported = this.supportedMods.includes(mod);

      if (!isModSupported) {
        mod = 'default';
      }

      fetch('data/mods/' + mod + '.json')
        .then(response => {
          if (response.ok) {
            return response.json();
          }
          throw new Error('Error fetching mod data.');
        })
        .then(modDataJSON => {
          if (!isModSupported) {
            modDataJSON.name = inputReplayDataJSON.mod;
          }

          modDataStore.state = modDataJSON;
          this.$store.registerModule('modData', modDataStore);
          this.$store.commit('settings/setReplayDataReadyState', true);
          this.$store.commit('settings/setCurrentMod', inputReplayDataJSON.mod);
        })
        .catch(e => {
          this.setError(e);
          this.enableInput();
        });
    },
    loadSampleReplay(e) {
      e.preventDefault();

      const url = e.target.getAttribute('href');

      fetch(url)
        .then(response => {
          if (response.ok) {
            return response.text();
          }
          throw new Error('Error fetching sample replay data.');
        })
        .then(replayDataJSON => {
          this.inputReplayData = replayDataJSON;
        })
        .catch(e => {
          this.setError(e);
          this.enableInput();
        });
    },
    setError(e) {
      this.isValid = false;
      this.hasError = true;
      this.errorMessage = `${e.name}: ${e.message}`;
    },
  },
};
</script>
