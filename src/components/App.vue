<template>
  <div id="app">

    <Navbar />

    <div class="container-fluid my-5">

      <HeaderDefault v-if="!isReplayDataReady"/>
      <Header v-if="isReplayDataReady"/>

      <b-card v-if="!isReplayDataReady">
        <b-row>
          <b-col>
            <ReplayDataInput />
          </b-col>
        </b-row>
      </b-card>

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
body {
  overflow-x: hidden;
}

.is-help {
  cursor: help;
}

.o-label {
  text-transform: uppercase;
  font-size: 11px;
  opacity: 0.8;
  background-color: #999;
  color: white;
  padding: 0.15em 0.45em;
}
</style>
