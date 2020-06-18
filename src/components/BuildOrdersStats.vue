<template>
  <div class="c-build-orders-stats">

    <div v-for="(team, index) of teams" :key="index" class="c-build-orders-stats__team">

      <div v-for="(player, index) of team" :key="index" class="c-build-orders-stats__player">

        <div class="c-build-orders-stats__order">

          <div v-for="(actor) of buildings" :key="actor.id">
            <Actor :actor="actor" :badge="count(actor.id, player.build)" v-if="count(actor.id, player.build)" />
          </div>

          <div v-for="(actor) of defences" :key="actor.id">
            <Actor :actor="actor" :badge="count(actor.id, player.build)" v-if="count(actor.id, player.build)" />
          </div>

        </div>

      </div>

    </div>

  </div>
</template>

<script>
import _ from 'lodash';
import Actor from './Actor.vue';

export default {
  props: {
    teams: Object,
  },
  computed: {
    buildings() {
      return this.$store.getters['modData/buildings'];
    },
    defences() {
      return this.$store.getters['modData/defences'];
    },
  },
  methods: {
    count(actor, build) {
      return _.filter(build, ['structure', actor]).length;
    }
  },
  components: {
    Actor,
  },
};
</script>

<style lang="scss">
@import '../scss/_placeholders.scss';

.c-build-orders-stats {
  @extend %build_orders_wrap;

  &__player {
    @extend %build_orders_player;
  }

  &__order {
    @extend %build_orders_box;
  }
}
</style>
