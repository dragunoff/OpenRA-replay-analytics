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
};
</script>

<style lang="scss">
@import '../scss/_global.scss';
</style>
