<template>
  <div class="c-map-info" v-if="map">
    <div class="c-map-info__minimap">
      <a :href="'https://resource.openra.net/maps/' + map.id" title="View on Resource Center" target="_blank">
        <img class="c-map-info__minimap" :src="'data:image/png;base64,' + map.minimap" alt="minimap" />
      </a>
    </div>
    <small class="text-muted">Created by {{ map.author }}</small>
  </div>
</template>

<script>
export default {
  props: {
    hash: String,
  },
  data() {
    return {
      map: null
    };
  },
  created() {
    fetch(process.env.VUE_APP_OPENRA_RC_ENDPOINT + this.hash)
      .then(response => {
        if (response.ok) {
          return response.clone().json();
        }

        throw new Error(`Failed to fetch map data.`);
      })
      .then(json => {
        this.map = json[0];
      })
      .catch(e => {
        console.log(e);
      });
  }
};
</script>
