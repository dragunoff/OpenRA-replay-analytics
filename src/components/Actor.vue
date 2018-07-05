<template>
  <div v-show="isFilteredIn" class="c-actor" :class="[typeClass, { 'has-error': hasCameoError }]" :title="popoverTitle" v-b-popover.hover.focus.bottom="name">
    <img class="c-actor__cameo" :src="cameoUrl" :alt="name" @error="cameoError($event)" :width="width" :height="height" />
    <span class="c-actor__badge h4" v-if="badge"><b-badge>{{ badge }}</b-badge></span>
  </div>
</template>

<script>
export default {
  data() {
    return {
      hasCameoError: false,
    };
  },
  props: {
    actor: {
      type: Object,
      default: () => {},
    },
    build: {
      type: Object,
      default: () => {},
    },
    width: {
      type: Number,
      default: 64,
    },
    badge: '',
  },
  mounted() {
    if (this.$store.state.settings.buildOrderViewMode === 'timeline') {
      this.unclump(this.$el);
    }
  },
  computed: {
    height() {
      return 0.75 * this.width;
    },
    offset() {
      if (!this.build || _.isEmpty(this.build)) {
        return '0px';
      }

      return this.build.game_time.msec * this.$store.state.settings.timelineScalingFactor + 'px';
    },
    info() {

      if (this.actor && !_.isEmpty(this.actor)) {
        return this.actor;
      }

      let id;
      if (this.build && !_.isEmpty(this.build)) {
        id = this.build.structure.toLowerCase();
      }

      return this.$store.getters['modData/actorInfo'](id);
    },
    name() {
      return this.info.name;
    },
    popoverTitle() {
      let title = '';

      if (this.build && !_.isEmpty(this.build)) {
        title = this.build.game_time.formatted;
      }

      return title;
    },
    typeClass() {
      return `c-actor--${this.info.type}`;
    },
    cameoUrl() {
      let href = window.location.href.replace(/\/$/, '');
      let mod = this.$store.state.replayData.mod;

      return href + '/assets/mods/' + mod + '/cameos/' + this.info.id + '.gif';
    },
    isFilteredIn() {
      let filters = this.$store.state.settings.buildOrderFilter;
      return 'all' === filters || this.info.type === filters;
    },
  },
  methods: {
    unclump(el) {
      el.classList.add('is-offset');
      el.style.left = this.offset;

      const previous = el.previousSibling;

      if (!previous) {
        return;
      }

      const rectEl = el.getBoundingClientRect();
      const rectPrevious = previous.getBoundingClientRect();

      if (rectEl.left >= rectPrevious.right) {
        return;
      }

      let diff = rectPrevious.top - rectEl.top;
      let offset = diff + rectPrevious.height - rectPrevious.height * 0.2;
      el.style.top = offset + 'px';
    },
    cameoError(e) {
      this.hasCameoError = true;
    },
  },
};
</script>

<style lang="scss">
.c-actor {
  $cameo-width: 64px;
  $base-color: rebeccapurple;

  display: flex;

  position: relative;

  width: $cameo-width;
  height: 0.75 * $cameo-width;
  margin-right: 1em;

  font-size: 14px;
  line-height: 1;

  background-color: $base-color;
  color: white;

  cursor: default;
  -webkit-user-select: none;
  -moz-user-select: none;
  user-select: none;

  &.is-offset {
    position: absolute;
    margin: 0;
  }

  &--defence {
    background-color: lighten($base-color, 25%);
  }

  &:hover {
    z-index: 1;
  }

  &__cameo {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: auto;

    font-size: smaller;

    .has-error & {
      padding: 6px;
    }
  }

  &__badge {
    position: absolute;
    top: 0;
    left: 0;

    transform: translate(-25%, -25%);

    z-index: 1;
  }
}
</style>
