<template>
  <div id="app" class="d-flex flex-column min-vh-100">

    <Navbar />

    <div class="container-fluid my-5 flex-grow-1">

      <HeaderDefault v-if="!isAnalyticsReady"/>
      <Header v-else />

      <Input v-if="!isAnalyticsReady" />
      <Analytics v-else />
    </div>

    <Footer />
  </div>
</template>

<script>
import replayDataStore from '../store/modules/replayData';
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
      this.$store.commit('settings/setCurrentMod', replayJSON.mod);
      this.$store.commit('settings/setAnalyticsReadyState', true);
      EventBus.$emit('AnalyticsReady', replayJSON);
      this.$store.commit('settings/setLoadingState', false);
    },
    registerReplayDataStore(replayJSON) {
      replayDataStore.state = replayJSON;
      this.$store.registerModule('replayData', replayDataStore);
    },
  },
  created() {
    EventBus.$on('ReplayDataReady', this.onReplayDataReady);
  },
};
</script>

<style lang="scss">
@import '../scss/_global.scss';
</style>
