<template>
  <b-tabs card @input="onTabActivated">
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
</template>

<script>
import TabGameInfo from './TabGameInfo.vue';
import TabClients from './TabClients.vue';
import TabBuildOrders from './TabBuildOrders.vue';
import TabChat from './TabChat.vue';

export default {
  components: {
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
