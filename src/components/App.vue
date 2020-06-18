<template>
  <div id="app">

    <Navbar />

    <div class="container-fluid my-5">

      <HeaderDefault v-if="!isReplayDataReady"/>
      <Header v-if="isReplayDataReady"/>

      <b-tabs card v-if="!isReplayDataReady">
        <b-tab title="Upload Replay" active>
          <ReplayFileInput />
        </b-tab>
        <b-tab title="Paste JSON">
          <ReplayDataInput />
        </b-tab>
      </b-tabs>

      <b-tabs card @input="onTabActivated" v-if="isReplayDataReady">
        <b-tab title="Game Info" active>
          <TabGameInfo />
        </b-tab>

        <b-tab title="Clients">
          <TabClients />
        </b-tab>

        <b-tab title="Build Orders &amp; Powers">
          <TabBuildOrders />
        </b-tab>

        <b-tab title="Chat">
          <TabChat />
        </b-tab>
      </b-tabs>
    </div>

    <Footer />
  </div>
</template>

<script>
import Navbar from './Navbar.vue';
import ReplayDataInput from './ReplayDataInput.vue';
import ReplayFileInput from './ReplayFileInput.vue';
import HeaderDefault from './HeaderDefault.vue';
import Header from './Header.vue';
import Footer from './Footer.vue';
import TabGameInfo from './TabGameInfo.vue';
import TabClients from './TabClients.vue';
import TabBuildOrders from './TabBuildOrders.vue';
import TabChat from './TabChat.vue';

export default {
  name: 'app',
  computed: {
    isReplayDataReady() {
      return this.$store.state.settings.isReplayDataReady;
    },
  },
  components: {
    Navbar,
    ReplayDataInput,
    ReplayFileInput,
    HeaderDefault,
    Header,
    Footer,
    TabGameInfo,
    TabClients,
    TabBuildOrders,
    TabChat,
  },
  methods: {
    onTabActivated(index) {
      this.$store.commit('settings/setCurrentTab', index);
    },
  },
};
</script>

<style lang="scss">
@import '../scss/_global.scss';
</style>
