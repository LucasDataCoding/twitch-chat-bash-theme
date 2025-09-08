<template>
  <div class="h-screen">
    <ChatBox
      v-if="!configsStore.isLoading"
      :bg-chat="configsStore.themeFolderPath.bgChat"
      :bg-top="configsStore.themeFolderPath.bgTop"
      :messages="configsStore.messagesOrdered"
    />
  </div>
</template>

<script lang="ts" setup>
import ChatMessage from '@/components/ChatMessage.vue'
import TopTitle from '@/components/TopTitle.vue'
import { useConfigStore } from '@/stores/config'
import ChatBox from '@/components/ChatBox.vue'

const configsStore = useConfigStore()
</script>
