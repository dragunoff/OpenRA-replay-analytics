<template>
  <b-jumbotron>
    <h1 class="display-4">{{ versus }}</h1>
    <p class="lead">on "{{ map.name }}" in <ModName /></p>
  </b-jumbotron>
</template>

<script>
import ModName from './ModName.vue';

export default {
  components: {
    ModName,
  },
  computed: {
    modName() {
      return this.$store.getters['modData/modName']();
    },
    map() {
      return this.$store.state.replayData.map;
    },
    versus() {
      return this.$store.getters['replayData/versus'];
    },
  },
  created() {
    document.title = `${this.versus} on "${this.map.name}" in ${this.modName} | ${
      this.$store.state.settings.appName
    }`;
  },
};
</script>
