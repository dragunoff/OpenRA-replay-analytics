<template>
  <div class="c-clients">
    <div v-for="(team, index) of teams" :key="index" class="c-clients__team">
      <span class="o-label c-clients__team-name"><TeamName :teamId="index" /></span>
      <div class="row">
        <div v-for="(client, index) of team" :key="index" class="c-clients__client col-sm-2 mb-3">
            <ClientInfo :client="client" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TeamName from './TeamName.vue';
import ClientInfo from './ClientInfo.vue';

export default {
  computed: {
    teams() {
      return this.$store.getters['replayData/teams'];
    },
  },
  components: {
    TeamName,
    ClientInfo,
  },
};
</script>

<style lang="scss">
.c-clients {
  &__team {
    border-top: 1px solid #ccc;
    position: relative;
    padding: 2.5rem 0;
    // margin: 0 -1.25rem;
  }

  &__team-name {
    position: absolute;
    top: 0;
    left: 0;
  }
}
</style>
