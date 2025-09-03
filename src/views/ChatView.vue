<template>
  <div class="wrapper-chat-view">
    <img src="../../public/themes/mine/top-bar.png" alt="Imagem da barra superior do chat" />

    <div
      class="wrapper-chat-content"
      :style="{
        // background: 'black',
        background: 'url(../../public/themes/mine/bg-chat.png)',
      }"
    >
      <TopTitle class="top-title theme-mine" />

      <div class="wrapper-chat" ref="chatContainer">
        <ChatMessage
          v-for="(message, i) in messagesOrdered"
          :key="i"
          :chatter-name="message.username"
          :message="message.message"
          :message-color="message.message_color"
          :channel="message.channel"
          prefix="$"
        />

        <div style="margin-top: 8ch"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import ChatMessage from '@/components/ChatMessage.vue'
import TopTitle from '@/components/TopTitle.vue'
import { computed, nextTick, onMounted, onUnmounted, ref } from 'vue'

const chatContainer = ref<HTMLElement | null>(null)

interface ChatMessage {
  channel: string
  username: string
  message: string
  message_color: string
  timestamp?: string
  type?: string
}

const scrollToBottom = () => {
  if (chatContainer.value) {
    chatContainer.value.scrollTop = chatContainer.value.scrollHeight
  }
}

const messages = ref<ChatMessage[]>([])

const messagesOrdered = computed(() => messages.value.slice().reverse())

let ws: WebSocket | null = null
let reconnectTimer: number | null = null
let reconnectAttempts = 0
const maxReconnectAttempts = 10

const connectWebSocket = () => {
  if (ws) {
    ws.close()
  }

  // Conectando na porta 8765 (ajustada no Python)
  ws = new WebSocket('ws://localhost:8765')

  ws.onopen = () => {
    console.log('✅ Conectado ao servidor WebSocket')
    reconnectAttempts = 0
  }

  ws.onmessage = (event) => {
    try {
      const data: ChatMessage = JSON.parse(event.data)

      // Verificar se é uma mensagem de chat
      if (data.type === 'chat_message' || (data.username && data.message)) {
        messages.value.unshift(data) // Adiciona no início para ordem reversa

        // Limitar para as últimas 100 mensagens
        if (messages.value.length > 100) {
          messages.value = messages.value.slice(0, 100)
        }

        nextTick(() => {
          scrollToBottom()
        })
      }
    } catch (error) {
      console.error('❌ Erro ao processar mensagem:', error)
    }
  }

  ws.onerror = (error) => {
    console.error('❌ Erro WebSocket:', error)
    attemptReconnect()
  }

  ws.onclose = () => {
    console.log('🔌 Conexão WebSocket fechada')
    attemptReconnect()
  }
}

const attemptReconnect = () => {
  if (reconnectAttempts < maxReconnectAttempts) {
    reconnectAttempts++

    const delay = Math.min(1000 * Math.pow(1.5, reconnectAttempts), 10000)
    console.log(`🔄 Tentando reconectar em ${delay}ms... (tentativa ${reconnectAttempts})`)

    reconnectTimer = setTimeout(() => {
      connectWebSocket()
    }, delay)
  } else {
    console.log('⏹️ Limite de tentativas de reconexão atingido')
  }
}

onMounted(() => {
  connectWebSocket()
})

onUnmounted(() => {
  if (ws) {
    ws.close()
  }
  if (reconnectTimer) {
    clearTimeout(reconnectTimer)
  }
})
</script>

<style lang="scss" scoped>
.wrapper-chat-view {
  $padding-chat-size: 1rem;
  $p-right: $padding-chat-size;
  $p-bottom: calc($padding-chat-size * 2);
  $p-left: $padding-chat-size;

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
    &.theme-mine {
      & > * {
        font-weight: bold;
      }

      & :deep(.path) {
        color: #352d28;
      }

      & :deep(.distribution) {
        color: #5d3e27 !important;
      }
    }
  }
}
</style>
