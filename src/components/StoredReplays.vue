<template>
  <div class="c-stored-replays" v-bind:class="{ 'is-loading': isLoading }">

    <b-row>

      <b-col sm="5" md="6" class="my-2">

        <h3 class="h3">Stored Replays ({{ storedReplays.length }})</h3>

        <p v-if="!hasStored" class="text-muted">
          You don't have any replays. Go ahead and sumbit some!
        </p>

      </b-col>

      <b-col sm="5" md="6" class="my-2">

        <b-form-group
          label="Filter"
          label-cols-sm="3"
          label-align-sm="right"
          label-size="sm"
          label-for="filterInput"
          class="mb-0"
        >
          <b-input-group size="sm">
            <b-form-input
              v-model="filter"
              type="search"
              id="filterInput"
              placeholder="Type to Search"
              debounce="500"
            ></b-form-input>
            <b-input-group-append>
              <b-button :disabled="!filter" @click="filter = ''">Clear</b-button>
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
      </b-col>
    </b-row>

    <b-alert variant="danger" dismissible :show="hasError">
      {{ errorMessage }}
    </b-alert>

    <b-table
      hover
      :items="storedReplays"
      :fields="fields"
      :filter="filter"
      @row-clicked="loadReplay($event)"
      v-if="hasStored"
    >
      <template v-slot:cell(gameInfo)="data">
        <h4 class="h5">{{ data.item.versus }}</h4>
        <span>on map "{{ data.item.data.map.name }}" in {{ data.item.modName }}</span>
      </template>

      <template v-slot:cell(duration)="data">
        <time :title="data.item.data.game.duration.formatted">
          {{ data.item.data.game.duration.msec | duration('humanize') }}
        </time>
      </template>

      <template v-slot:cell(timestamp)="data">
        {{ data.item.timestamp | moment('from', 'now') }}
      </template>

      <template v-slot:cell(actions)="data">
        <b-button
          variant="outline-primary"
          size="sm"
          :id="data.index"
          @click="onDeleteClicked($event)"
        >
          Delete
        </b-button>
      </template>
    </b-table>
  </div>
</template>

<script>
import { EventBus } from '../event-bus.js';

export default {
  data() {
    return {
      storedReplays: [],
      fields: [
        { key: 'gameInfo', label: 'Game Info' },
        { key: 'duration', label: 'Duration', sortable: true },
        { key: 'timestamp', label: 'Added', sortable: true },
        { key: 'actions', label: 'Actions' },
      ],
      replayJSON: null,
      hasError: false,
      errorMessage: null,
      filter: null,
    };
  },
  computed: {
    hasStored() {
      return this.storedReplays.length > 0;
    },
    isLoading() {
      return this.$store.state.settings.isLoading;
    },
  },
  methods: {
    onAnalyticsReady(replayJSON) {
      if (!replayJSON) {
        return;
      }

      this.storedReplays.unshift({
        versus: this.$store.getters['replayData/versus'],
        modName: this.$store.getters['modData/modName'],
        timestamp: Date.now(),
        data: replayJSON
      });

      this.storeReplays();
    },
    onDeleteClicked(e) {
      e.preventDefault();
      this.storedReplays.splice(e.target.id, 1);
      this.storeReplays();
    },
    storeReplays() {
      localStorage.setItem('storedReplays', JSON.stringify(this.storedReplays));
    },
    loadReplay(e) {
      if (this.isLoading) {
        return;
      }

      try {
        if (!e.data) {
          throw new Error('Error loading stored replay data.');
        }

        this.replayJSON = e.data;
        this.replayDataReady();
      } catch (e) {
        this.setError(e);
        this.$store.commit('settings/setLoadingState', false);
      }
    },
    replayDataReady() {
      EventBus.$off('AnalyticsReady', this.onAnalyticsReady);
      EventBus.$emit('replayDataReady', this.replayJSON);
      this.$store.commit('settings/setLoadingState', true);
    },
    setError(e) {
      this.hasError = true;
      this.errorMessage = `${e.name}: ${e.message}`;
    },
  },
  mounted() {
    if (localStorage.getItem('storedReplays')) {
      try {
        this.storedReplays = JSON.parse(localStorage.getItem('storedReplays'));
      } catch (e) {
        localStorage.removeItem('storedReplays');
      }
    }

    EventBus.$on('AnalyticsReady', this.onAnalyticsReady);
  }
};
</script>

<style lang="scss">
.c-stored-replays {
  td {
    cursor: pointer;
  }

  &.is-loading {
    pointer-events: none;
  }

  &.is-loading td {
    cursor: default;
  }
}
</style>
