<template>
  <div v-show="isFilteredIn" class="c-message" :class="{ 'is-server': isServer, 'is-spectator': isSpectator }">
    <small class="c-message__channel">#{{ channel }} </small>
    <span class="c-message__name"><strong>{{ name }}</strong>: </span>
    <span class="c-message__message">{{ message.message }}</span>
  </div>
</template>

<script>
export default {
  props: {
    message: Object,
  },
  computed: {
    name() {
      return this.message.name || 'Battlefield Control';
    },
    channel() {
      return this.message.channel || 'spectators';
    },
    isServer() {
      return this.message.channel === 'server' && this.message.name === null;
    },
    isSpectator() {
      return this.message.channel === null;
    },
    isFilteredIn() {
      let filters = this.$store.state.settings.chatFilter;
      return filters.includes('all') || filters.includes(this.channel);
    },
  },
};
</script>

<style lang="scss">
.c-message {
  margin: 0 0 0.35em;

  &__channel {
    opacity: 0.8;
  }

  &__name {
    font-weight: bold;
    white-space: nowrap;
  }

  &__message {
    white-space: pre;
  }

  &.is-server {
    opacity: 0.6;
  }

  &.is-spectator {
    color: #333;
  }
}
</style>
