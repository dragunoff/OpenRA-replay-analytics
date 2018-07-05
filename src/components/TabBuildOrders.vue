<template>
  <div class="c-tab-orders">

    <FilterBuildOrders />

    <div class="c-orders">

        <div class="c-orders__teams">

            <div v-for="(team, index) of teams" :key="index" class="c-orders__team">

                <div v-for="(player, index) of team" :key="index" class="c-orders__player">

                    <div class="c-orders__client">
                        <ClientInfo :client="player" :showTeam="true" v-if="player.is_player" />
                    </div>

                </div>

            </div>

        </div>

        <BuildOrdersTimeline :teams="teams" v-if="buildOrderViewMode === 'timeline'" />
        <BuildOrdersSimple :teams="teams" v-if="buildOrderViewMode === 'simple'" />
        <BuildOrdersStats :teams="teams" v-if="buildOrderViewMode === 'stats'" />

    </div>

  </div>
</template>

<script>
import FilterBuildOrders from './FilterBuildOrders.vue';
import TeamName from './TeamName.vue';
import BuildOrdersSimple from './BuildOrdersSimple.vue';
import BuildOrdersTimeline from './BuildOrdersTimeline.vue';
import BuildOrdersStats from './BuildOrdersStats.vue';
import ClientInfo from './ClientInfo.vue';

export default {
  computed: {
    teams() {
      return this.$store.getters['replayData/players'];
    },
    buildOrderViewMode() {
      return this.$store.state.settings.buildOrderViewMode;
    },
  },
  components: {
    FilterBuildOrders,
    TeamName,
    ClientInfo,
    BuildOrdersSimple,
    BuildOrdersTimeline,
    BuildOrdersStats,
  },
};
</script>

<style lang="scss">
.c-orders {
  $border-color: #ccc;

  display: flex;
  position: relative;
  // margin: 0 -1.25rem;

  &__teams {
    flex-basis: 250px;
    min-width: 250px;
    border-top: 1px solid $border-color;
  }

  &__player {
    display: flex;
  }

  &__client,
  &__order {
    display: flex;
    flex: 1 0 auto;
    min-height: 220px;

    padding: 1.25rem 0;
    border-bottom: 1px solid $border-color;
    border-top: 1px solid $border-color;
    margin-top: -1px;
  }
}
</style>
