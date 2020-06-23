<template>
  <b-tabs card @input="onTabActivated">
    <b-tab title="Upload Replay" :disabled="isInputDisabled && currentTab !== 0">
      <ReplayFileInput />
    </b-tab>
    <b-tab title="Paste JSON" :disabled="isInputDisabled && currentTab !== 1">
      <ReplayDataInput />
    </b-tab>
    <b-tab title="Stored Replays" :disabled="isInputDisabled && currentTab !== 2">
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
    isInputDisabled() {
      return this.$store.state.settings.isInputDisabled;
    },
  },
  methods: {
    onTabActivated(index) {
      this.currentTab = index;
    },
  },
};
</script>
