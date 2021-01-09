<template>
  <div class="d-flex align-items-center justify-content-center min-vh-100 text-center">
    <HashDataResolver :hash="$route.params.hash" :source="$route.params.source" />
    <Submit :isButton="false" :defaultLabel="''" />
  </div>
</template>

<script>
import HashDataResolver from '../../components/HashDataResolver.vue';
import Submit from '../../components/Submit.vue';

export default {
  components: {
    Submit,
    HashDataResolver,
  },
};
</script>
