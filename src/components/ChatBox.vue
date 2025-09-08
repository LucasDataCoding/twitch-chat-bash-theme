<template>
  <div class="wrapper-chat-view h-full">
    <img :src="bgTop" alt="Imagem da barra superior do chat" class="w-full min-w-full" />

    <div
      class="wrapper-chat-content"
      :style="{
        background: `url(${bgChat})`,
      }"
    >
      <TopTitle class="top-title theme-mine" />

      <div class="wrapper-chat" ref="chatContainer">
        <ChatMessage
          v-for="(message, i) in messages"
          :key="i"
          :chatter-name="message.username"
          :message="message.message"
          :message-color="message.message_color"
          :channel="message.channel"
          prefix=""
        />

        <div style="margin-top: 8ch"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { IChatMessage } from '@/interfaces/messages'
import { defineProps, nextTick, onMounted, PropType, ref, watch } from 'vue'
import TopTitle from './TopTitle.vue'

const props = defineProps({
  messages: Object as PropType<IChatMessage[]>,
  bgTop: String,
  bgChat: String,
})

const chatContainer = ref<HTMLElement | null>(null)

const scrollToBottom = () => {
  if (chatContainer.value) {
    chatContainer.value.scrollTop = chatContainer.value.scrollHeight
  }
}

watch(
  () => props.messages?.length,
  () => {
    nextTick(() => {
      scrollToBottom()
    })
  }
)

onMounted(() => {
  // Scroll inicial para o bottom
  nextTick(() => {
    scrollToBottom()
  })
})
</script>


<style lang="scss" scoped>
.wrapper-chat-view {
  $padding-chat-size: 1rem;
  $p-right: $padding-chat-size;
  $p-bottom: calc($padding-chat-size * 2);
  $p-left: $padding-chat-size;

  aspect-ratio: 9/16;

  border: 3px solid #202020;
  border-radius: 0.5rem;

  display: flex;
  flex-direction: column;

  height: 100%;
  max-height: 100vh;
  overflow: hidden;

  img {
    height: 4rem;
    width: 100%;
  }

  .wrapper-chat-content {
    background-repeat: no-repeat !important;
    background-position: center center !important;

    padding-bottom: $p-bottom;
  }

  .wrapper-chat {
    background-color: rgba(0, 0, 0, 0);
    color: whitesmoke;

    margin-bottom: 10rem;

    display: flex;
    flex-direction: column;
    overflow-y: hidden;

    height: 100vh;

    padding-left: $p-left;
    padding-right: $p-right;
  }

  .top-title {
    padding: 0.5rem 1rem;
  }
}
</style>
