<template>
  <div class="c-chat">
    <FilterChat />
    <ChatMessage v-for="(message, index) of chat" :key="index" :message="message" />
  </div>
</template>

<script>
import FilterChat from './FilterChat.vue';
import ChatMessage from './ChatMessage.vue';

export default {
  computed: {
    chat() {
      return this.$store.getters['replayData/chat'];
    },
  },
  components: {
    FilterChat,
    ChatMessage,
  },
};
</script>
