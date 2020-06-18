<template>
  <div class="c-build-orders-simple">

    <div v-for="(team, index) of teams" :key="index" class="c-build-orders-simple__team">

      <div v-for="(player, index) of team" :key="index" class="c-build-orders-simple__player">

        <div class="c-build-orders-simple__order">
          <Actor v-for="(build, index) of player.build" :key="index" :build="build" />
        </div>

      </div>

    </div>

  </div>
</template>

<script>
import Actor from './Actor.vue';

export default {
  props: {
    teams: Object,
  },
  components: {
    Actor,
  },
};
</script>

<style lang="scss">
@import '../scss/_placeholders.scss';

.c-build-orders-simple {
  @extend %build_orders_wrap;

  &__player {
    @extend %build_orders_player;
  }

  &__order {
    @extend %build_orders_box;
  }
}
</style>
