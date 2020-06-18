<template>
  <div>
    <b-form @submit="onSubmit($event)">
      <b-alert variant="danger" dismissible :show="hasError">
        {{ errorMessage }}
      </b-alert>
      <fieldset ref="fieldset">
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
        <b-btn type="submit" variant="primary">Submit</b-btn>
      </fieldset>
    </b-form>
  </div>
</template>

<script>
import replayDataStore from '../store/modules/replayData';
import modDataStore from '../store/modules/modData';

const API_URL = 'http://li2152-223.members.linode.com/replays/data';

export default {
  data() {
    return {
      isValid: null,
      hasError: false,
      errorMessage: '',
      file: null,
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

      if (this.file) {
        this.disableInput();

        const formData = new FormData(e.target);
        formData.append('data', this.file);

        fetch(API_URL, {
          method: 'POST',
          body: formData
        }).then(
          response => response.json()
        ).then(replayJSON => {
          this.registerReplayDataStore(replayJSON);
          this.registerModDataStore(replayJSON);
        }).catch(e => {
          this.setError(e);
          this.enableInput();
        });
      }
    },
    setError(e) {
      this.isValid = false;
      this.hasError = true;
      this.errorMessage = `${e.name}: ${e.message}`;
    },
    disableInput() {
      this.$refs.fieldset.setAttribute('disabled', 'disabled');
    },
    enableInput() {
      this.$refs.fieldset.removeAttribute('disabled');
    },
    registerReplayDataStore(replayJSON) {
      replayDataStore.state = replayJSON;
      this.$store.registerModule('replayData', replayDataStore);
    },
    registerModDataStore(replayJSON) {
      let mod = replayJSON.mod;
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
            modDataJSON.name = replayJSON.mod;
          }

          modDataStore.state = modDataJSON;
          this.$store.registerModule('modData', modDataStore);
          this.$store.commit('settings/setReplayDataReadyState', true);
          this.$store.commit('settings/setCurrentMod', replayJSON.mod);
        })
        .catch(e => {
          this.setError(e);
          this.enableInput();
        });
    },
  },
};
</script>
