<template>
  <b-tabs card>
    <b-tab title="Upload Replay">
      <ReplayFileInput />
    </b-tab>
    <b-tab title="Paste JSON">
      <ReplayDataInput />
    </b-tab>
  </b-tabs>
</template>

<script>
import ReplayDataInput from './ReplayDataInput.vue';
import ReplayFileInput from './ReplayFileInput.vue';

export default {
  name: 'app',
  components: {
    ReplayDataInput,
    ReplayFileInput,
  },
};
</script>
