<template>
  <div class="wrapper-chat-view">
    <img src="../assets/themes/linux/top-bar.png" alt="Imagem da barra superior do chat" />

    <div class="wrapper-chat-content">
      <TopTitle />

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
  border: 3px solid #202020;
  border-radius: 0.5rem;

  background-color: black !important;

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
    $padding-chat-size: 1rem;
    padding: $padding-chat-size $padding-chat-size calc($padding-chat-size * 2) $padding-chat-size;
  }

  .wrapper-chat {
    background-color: rgba(0, 0, 0, 0);
    color: whitesmoke;

    display: flex;
    flex-direction: column;
    overflow-y: hidden;

    height: 100vh;

    $padding: 1rem;

    padding-left: $padding;
    padding-right: $padding;
  }
}
</style>
