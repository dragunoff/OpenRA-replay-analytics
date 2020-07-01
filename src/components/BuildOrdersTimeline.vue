<template>
  <div class="c-build-orders-timeline" ref="timeline" @mousemove="onTimelineEvent($event)" @scroll="onTimelineEvent($event)">

    <div v-for="(team, index) of teams" :key="index" class="c-build-orders-timeline__team">

      <div v-for="(player, index) of team" :key="index" class="c-build-orders-timeline__player">

        <div class="c-build-orders-timeline__order" :style="{ width: timelineSize + 'px' }">

          <div class="c-build-orders-timeline__actor" v-if="isBuildOrderTabActive">
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

    <div class="c-build-orders-timeline__veil-wrap" ref="veil">
      <div class="c-build-orders-timeline__veil"></div>
    </div>

    <div class="c-build-orders-timeline__playhead" ref="playhead" current-time="00:00:00"></div>

  </div>
</template>

<script>
import moment from 'moment';
import Utils from '../utils.js';
import Actor from './Actor.vue';

export default {
  data() {
    return {
      isTimelineScrolling: false,
      offsetX: 0,
      mouseX: 0,
    };
  },
  props: {
    teams: {
      type: Object,
      required: true,
    },
  },
  computed: {
    timelineSize() {
      return this.$store.getters['settings/timelineSize'];
    },
    timelineScalingFactor() {
      return this.$store.state.settings.timelineScalingFactor;
    },
    isBuildOrderTabActive() {
      return 2 === this.$store.state.settings.currentTab;
    },
  },
  methods: {
    mergeActors(build, powers) {
      return Utils.mergeActors(build, powers);
    },
    onTimelineEvent(e) {
      // calculate offset
      const timeline = this.$refs.timeline;
      const rect = timeline.getBoundingClientRect();

      // calculate mouse coord
      if (e.clientX) {
        let mouseX = e.clientX - rect.left;
        this.mouseX = mouseX < 0 ? 0 : mouseX;
      }

      // update timeline
      this.offsetX = this.mouseX + timeline.scrollLeft;
      this.timelineAnimation();
    },
    timelineAnimation() {
      if (this.isTimelineScrolling) {
        return;
      }

      this.isTimelineScrolling = true;

      window.requestAnimationFrame(() => {
        if (this.offsetX <= this.timelineSize) {
          this.updateTimeline();
        }

        this.isTimelineScrolling = false;
      });
    },
    updateTimeline() {
      // select elements
      const playhead = this.$refs.playhead;
      const veil = this.$refs.veil;

      // update playhead
      let currentTime = Math.round(this.offsetX / this.timelineScalingFactor);
      currentTime = moment.utc(currentTime).format('HH:mm:ss');

      playhead.style.transform = `translateX(${this.offsetX}px)`;
      playhead.setAttribute('current-time', currentTime);

      // update veil
      veil.style.transform = `translateX(${this.offsetX}px)`;
    },
  },
  components: {
    Actor,
  },
};
</script>

<style lang="scss">
@import '../scss/_placeholders.scss';
@import '../scss/_vars.scss';

.c-build-orders-timeline {
  @extend %build_orders_wrap;

  position: relative;
  overflow-y: hidden;

  &__player {
    display: flex;
  }

  &__order {
    @extend %build_orders_box;

    padding-left: 0;
    padding-right: 0;
  }

  &__actor {
    position: relative;
  }

  &__veil-wrap {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    width: 100%;

    overflow: hidden;

    z-index: 2;
    pointer-events: none;
  }

  &__veil {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;

    opacity: 0.8;
    background-color: white;
  }

  &__playhead {
    position: absolute;
    top: 0;
    bottom: 0;
    left: -25px;

    width: 50px;

    z-index: 3;
    pointer-events: none;

    &::before,
    &::after {
      display: block;
      content: '';
      position: absolute;
      background-color: blue;
    }

    &::before {
      top: 0;
      bottom: 0;
      left: 50%;

      width: 1px;
    }

    &::after {
      content: attr(current-time);

      top: 0;
      left: 50%;

      padding: 0.5em;

      font-size: 14px;
      line-height: 1;

      color: white;
    }
  }
}
</style>
