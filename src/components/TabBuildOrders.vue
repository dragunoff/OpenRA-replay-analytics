<template>
  <div class="c-tab-orders">

    <FilterBuildOrders />

    <div class="c-tab-build-orders">

        <div class="c-tab-build-orders__teams">

            <div v-for="(team, index) of teams" :key="index" class="c-tab-build-orders__team">

                <div v-for="(player, index) of team" :key="index" class="c-tab-build-orders__player">

                    <div class="c-tab-build-orders__client">
                        <ClientInfo :client="player" :showTeam="!is1v1" v-if="player.is_player" />
                    </div>

                </div>

            </div>

        </div>

        <BuildOrdersTimeline :teams="teams" v-if="buildOrderViewMode === 'timeline'" />
        <BuildOrdersSimple :teams="teams" v-else-if="buildOrderViewMode === 'simple'" />
        <BuildOrdersStats :teams="teams" v-else-if="buildOrderViewMode === 'stats'" />

    </div>

  </div>
</template>

<script>
import FilterBuildOrders from './FilterBuildOrders.vue';
import BuildOrdersSimple from './BuildOrdersSimple.vue';
import BuildOrdersTimeline from './BuildOrdersTimeline.vue';
import BuildOrdersStats from './BuildOrdersStats.vue';
import ClientInfo from './ClientInfo.vue';

export default {
  computed: {
    is1v1() {
      return this.$store.state.replayData.game.type === '1v1';
    },
    teams() {
      return this.$store.getters['replayData/players'];
    },
    buildOrderViewMode() {
      return this.$store.state.settings.buildOrderViewMode;
    },
  },
  components: {
    FilterBuildOrders,
    ClientInfo,
    BuildOrdersSimple,
    BuildOrdersTimeline,
    BuildOrdersStats,
  },
};
</script>

<style lang="scss">
@import '../scss/_placeholders.scss';
@import '../scss/_vars.scss';

.c-tab-build-orders {
  display: flex;
  position: relative;
  // margin: 0 -1.25rem;

  &__teams {
    flex-basis: 250px;
    min-width: 250px;
    border-top: 1px solid $border-color;
  }

  &__player {
    @extend %build_orders_player;
  }

  &__client {
    @extend %build_orders_box;
    border-top: 0;
  }
}
</style>
