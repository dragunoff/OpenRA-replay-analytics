<template>
  <div id="app">

    <Navbar />

    <div class="container-fluid my-5">

      <HeaderDefault v-if="!isAnalyticsReady"/>
      <Header v-if="isAnalyticsReady"/>

      <Input v-if="!isAnalyticsReady" />
      <Analytics v-if="isAnalyticsReady" />
    </div>

    <Footer />
  </div>
</template>

<script>
import replayDataStore from '../store/modules/replayData';
import modDataStore from '../store/modules/modData';
import { EventBus } from '../event-bus.js';

import Navbar from './Navbar.vue';
import HeaderDefault from './HeaderDefault.vue';
import Header from './Header.vue';
import Footer from './Footer.vue';
import Input from './Input.vue';
import Analytics from './Analytics.vue';

export default {
  name: 'app',
  computed: {
    isAnalyticsReady() {
      return this.$store.state.settings.isAnalyticsReady;
    },
    supportedMods() {
      return this.$store.state.settings.supportedMods;
    },
  },
  components: {
    Navbar,
    HeaderDefault,
    Header,
    Footer,
    Input,
    Analytics,
  },
  methods: {
    onReplayDataReady(replayJSON) {
      this.registerReplayDataStore(replayJSON);
      this.registerModDataStore(replayJSON);
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
          this.$store.commit('settings/setAnalyticsReadyState', true);
          this.$store.commit('settings/setCurrentMod', replayJSON.mod);
        })
        .catch(e => {
          this.setError(e);
          this.$store.commit('settings/setLoadingState', false);
        });
    },
  },
  created() {
    EventBus.$on('replayDataReady', this.onReplayDataReady);
  },
};
</script>

<style lang="scss">
@import '../scss/_global.scss';
</style>
