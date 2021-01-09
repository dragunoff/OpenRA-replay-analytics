<template>
  <div>
    <Header />
    <Analytics />
  </div>
</template>

<script>
import Analytics from '../../components/Analytics.vue';
import Header from '../../components/Header.vue';

export default {
  components: {
    Header,
    Analytics,
  },
};
</script>
