<template>
  <b-navbar variant="dark" type="dark">
    <b-navbar-brand>
      <img :src="iconUrl" class="d-inline-block align-top" alt="">
      {{ headerText }}
    </b-navbar-brand>
    <b-navbar-nav class="ml-auto">
      <new-replay-button v-if="isAnalyticsReady" />
    </b-navbar-nav>
  </b-navbar>
</template>

<script>
import NewReplayButton from './NewReplayButton.vue';

export default {
  components: {
    NewReplayButton,
  },
  computed: {
    iconUrl() {
      return this.$store.state.settings.iconUrl;
    },
    headerText() {
      return this.$store.state.settings.appName;
    },
    isAnalyticsReady() {
      return this.$store.state.settings.isAnalyticsReady;
    },
  },
  methods: {
    loadNewReplay() {
      location.reload();
    }
  }
};
</script>
