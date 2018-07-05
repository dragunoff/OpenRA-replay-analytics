<template>
  <div class="c-orders__simple">

    <div v-for="(team, index) of teams" :key="index" class="c-orders__team">

      <div v-for="(player, index) of team" :key="index" class="c-orders__player">

        <div class="c-orders__order c-order c-order--simple">
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
$border-color: #ccc;

.c-orders__simple {
  overflow-x: auto;
  border-top: 1px solid $border-color;
  border-left: 1px solid $border-color;
  border-right: 1px solid $border-color;
}

.c-order--simple {
  display: flex;
  padding-left: 1.25rem;
  padding-right: 1.25rem;
}
</style>
