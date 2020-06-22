<template>
  <b-tabs card @input="onTabActivated">
    <b-tab title="Upload Replay" :disabled="isLoading && currentTab !== 0">
      <ReplayFileInput />
    </b-tab>
    <b-tab title="Paste JSON" :disabled="isLoading && currentTab !== 1">
      <ReplayDataInput />
    </b-tab>
    <b-tab title="Stored Replays" :disabled="isLoading && currentTab !== 2">
      <StoredReplays />
    </b-tab>
  </b-tabs>
</template>

<script>
import ReplayDataInput from './ReplayDataInput.vue';
import ReplayFileInput from './ReplayFileInput.vue';
import StoredReplays from './StoredReplays.vue';

export default {
  components: {
    ReplayDataInput,
    ReplayFileInput,
    StoredReplays,
  },
  data() {
    return {
      currentTab: null,
    }
  },
  computed: {
    isLoading() {
      return this.$store.state.settings.isLoading;
    },
  },
  methods: {
    onTabActivated(index) {
      this.currentTab = index;
    },
  },
};
</script>
