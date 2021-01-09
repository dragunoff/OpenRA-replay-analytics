<template>
  <div id="app" class="d-flex flex-column min-vh-100">

    <Navbar />

    <div class="container-fluid my-5 flex-grow-1">
      <router-view></router-view>
    </div>

    <Footer />
  </div>
</template>

<script>
import Navbar from './Navbar.vue';
import Footer from './Footer.vue';

export default {
  name: 'app',
  components: {
    Navbar,
    Footer,
  },
};
</script>

<style lang="scss">
@import '../scss/_global.scss';
</style>
