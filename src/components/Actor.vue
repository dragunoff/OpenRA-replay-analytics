<template>
  <div
    v-show="isFilteredIn"
    :class="[
      'c-actor',
      typeClass,
      { 'is-offset': isOffset, 'has-error': hasCameoError }
    ]"
    :title="popoverTitle"
    v-b-popover.hover.focus.bottom="name"
  >
    <img class="c-actor__cameo" :src="cameoUrl" :alt="name" @error="cameoError($event)" :width="width" :height="height" />
    <span class="c-actor__badge h4" v-if="badge"><b-badge>{{ badge }}</b-badge></span>
  </div>
</template>

<script>
import _ from 'lodash';

export default {
  data() {
    return {
      hasCameoError: false,
      isOffset: false,
    };
  },
  props: {
    id: {
      type: String,
      default: null,
    },
    mod: {
      type: String,
      default: null,
    },
    type: {
      type: String,
      default: 'actor',
    },
    game_time: Object,
    width: {
      type: Number,
      default: 64,
    },
    badge: {
      type: Number,
      default: null,
    },
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
      if (!this.game_time || _.isEmpty(this.game_time)) {
        return '0px';
      }

      return this.game_time.msec * this.$store.state.settings.timelineScalingFactor + 'px';
    },
    info() {
      if (this.type === 'support_power') {
        return this.$store.getters['modData/supportPowerInfo'](this.id, this.mod);
      }

      return this.$store.getters['modData/actorInfo'](this.id, this.mod);
    },
    name() {
      return this.info.name;
    },
    popoverTitle() {
      let title = '';

      if (this.game_time && !_.isEmpty(this.game_time)) {
        title = this.game_time.formatted;
      }

      return title;
    },
    typeClass() {
      return `c-actor--${this.info.type}`;
    },
    cameoUrl() {
      let mod = this.$store.state.replayData.mod;

      let filename = this.info.id + '.gif';
      if (this.type === 'support_power') {
        filename = 'support_power-' + filename;
      }

      return './assets/mods/' + mod + '/cameos/' + filename;
    },
    isFilteredIn() {
      let filters = this.$store.state.settings.buildOrderFilter;
      return 'all' === filters || this.info.type === filters;
    },
  },
  methods: {
    unclump(el) {
      // HACK: Both methods for adding the classname are here
      // because in case of cameo error the class will be wiped
      el.classList.add('is-offset');
      this.isOffset = true;

      el.style.left = this.offset;

      const previous = el.previousSibling;

      if (!previous) {
        return;
      }

      const rect = el.getBoundingClientRect();
      const rectPrevious = previous.getBoundingClientRect();

      if (rect.left >= rectPrevious.right || rect.bottom <= rectPrevious.top) {
        return;
      }

      let diff = rectPrevious.top - rect.top;
      let offset = diff + rectPrevious.height;
      el.style.top = offset + 'px';
    },
    cameoError() {
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
