<template>
  <div class="c-build-orders-stats">

    <div v-for="(team, index) of teams" :key="index" class="c-build-orders-stats__team">

      <div v-for="(player, index) of team" :key="index" class="c-build-orders-stats__player">

        <div class="c-build-orders-stats__order">

          <div v-for="(actor) of buildings" :key="`structure-${actor.id}`">
            <Actor :id="actor.id" :badge="count_structures(actor.id, player.build)" v-if="count_structures(actor.id, player.build)" />
          </div>

          <div v-for="(actor) of defences" :key="`defence-${actor.id}`">
            <Actor :id="actor.id" :badge="count_structures(actor.id, player.build)" v-if="count_structures(actor.id, player.build)" />
          </div>

          <div v-for="(actor) of support_powers" :key="`support_power-${actor.id}`">
            <Actor :id="actor.id" :badge="count_support_powers(actor.id, player.support_powers)" v-if="count_support_powers(actor.id, player.support_powers)" type="support_power" />
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
    teams: {
      type: Object,
      required: true,
    },
  },
  computed: {
    buildings() {
      return this.$store.getters['modData/buildings'];
    },
    defences() {
      return this.$store.getters['modData/defences'];
    },
    support_powers() {
      return this.$store.getters['modData/support_powers'];
    },
  },
  methods: {
    count_structures(actor_id, build) {
      return _.filter(build, ['structure', actor_id]).length;
    },
    count_support_powers(actor_id, support_powers) {
      return _.filter(support_powers, ['type', actor_id]).length;
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
