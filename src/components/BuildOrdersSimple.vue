<template>
  <div class="c-build-orders-simple">

    <div v-for="(team, index) of teams" :key="index" class="c-build-orders-simple__team">

      <div v-for="(player, index) of team" :key="index" class="c-build-orders-simple__player">

        <div class="c-build-orders-simple__order">
          <Actor
            v-for="(build, index) of mergeActors(player.build, player.support_powers)"
            :key="`${build.actor_type}-${index}`"
            :id="build.actor_id"
            :game_time="build.game_time"
            :type="build.actor_type"
          />
        </div>

      </div>

    </div>

  </div>
</template>

<script>
import Utils from '../utils.js';
import Actor from './Actor.vue';

export default {
  props: {
    teams: {
      type: Object,
      required: true,
    },
  },
  components: {
    Actor,
  },
  methods: {
    mergeActors(build, powers) {
      return Utils.mergeActors(build, powers);
    }
  }
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
