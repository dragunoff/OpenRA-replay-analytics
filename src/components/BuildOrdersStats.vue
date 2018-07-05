<template>
  <div class="c-orders__simple">

    <div v-for="(team, index) of teams" :key="index" class="c-orders__team">

      <div v-for="(player, index) of team" :key="index" class="c-orders__player">

        <div class="c-orders__order c-order c-order--simple">

          <Actor v-for="(actor) of buildings" :key="actor.id" :actor="actor" :badge="count(actor.id, player.build)" v-if="count(actor.id, player.build)" />

          <Actor v-for="(actor) of defences" :key="actor.id" :actor="actor" :badge="count(actor.id, player.build)" v-if="count(actor.id, player.build)" />

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
