<template>
  <div class="c-orders__timeline" ref="timeline" @mousemove="onTimelineEvent($event)" @scroll="onTimelineEvent($event)">

    <div v-for="(team, index) of teams" :key="index" class="c-orders__team">

      <div v-for="(player, index) of team" :key="index" class="c-orders__player">

        <div class="c-orders__order" :style="{ width: timelineSize + 'px' }">

          <div class="c-order c-order--timeline" v-if="isBuildOrderTabActive">
            <Actor v-for="(build, index) of player.build" :key="index" :build="build" />
          </div>

        </div>

      </div>

    </div>

    <div class="c-orders__veil-wrap" ref="veil">
      <div class="c-orders__veil"></div>
    </div>

    <div class="c-orders__playhead" ref="playhead" current-time="00:00:00"></div>

  </div>
</template>

<script>
import moment from 'moment';
import Actor from './Actor.vue';

export default {
  data() {
    return {
      isTimelineScrolling: false,
      timelineScrollRaf: false,
      offsetX: 0,
      mouseX: 0,
    };
  },
  props: {
    teams: Object,
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
$border-color: #ccc;

.c-order {
  position: relative;
}

.c-orders {
  &__timeline {
    position: relative;
    overflow-x: auto;
    overflow-y: hidden;

    border-top: 1px solid $border-color;
    border-left: 1px solid $border-color;
    border-right: 1px solid rgba($border-color, 0.2);
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
