import { ref, computed, type Ref } from 'vue'
import { defineStore } from 'pinia'
import type { ITheme } from '@/interfaces/themes'
import { themes } from '@/constants/themes'
import type { IConfigs } from '@/interfaces/configs'
import type { IChatMessage } from '@/interfaces/messages'

export const useConfigStore = defineStore('configs', () => {
  const configs: Ref<IConfigs | null> = ref(null)
  const isLoading = ref(true)
  const error = ref<string | null>(null)
  const chatMessages = ref<IChatMessage[]>([])
  const wsConnected = ref(false)

  let websocket: WebSocket | null = null

  // Carregar configurações iniciais via API HTTP
  async function loadInitialConfigs() {
    try {
      isLoading.value = true
      error.value = null

      const response = await fetch('http://localhost:5000/api/configs')

      if (response.ok) {
        const data = await response.json()
        configs.value = data
        console.log('📥 Configurações carregadas via API:', data)
      } else {
        throw new Error('Erro ao carregar configurações')
      }
    } catch (err) {
      console.error('❌ Erro ao carregar configurações iniciais:', err)
      error.value = 'Não foi possível carregar as configurações'

      // Configuração padrão de fallback
      configs.value = null
    } finally {
      isLoading.value = false
    }
  }

  // Conectar WebSocket
  function connectWebSocket() {
    console.log('🔄 Tentando conectar WebSocket...')

    if (websocket) {
      websocket.close()
    }

    websocket = new WebSocket('ws://localhost:8765')

    websocket.onopen = () => {
      console.log('✅ Conectado ao WebSocket da Store')
      wsConnected.value = true
      reconnectAttempts = 0
    }

    websocket.onmessage = (event) => {
      console.log('📨 Mensagem WebSocket recebida:', event.data)

      try {
        const data = JSON.parse(event.data)
        console.log('📦 Dados parseados:', data)

        if (data.type === 'config_update') {
          console.log('🔄 Atualizando configurações via WebSocket')
          configs.value = data.configs
        } else if (data.type === 'chat_message' || (data.username && data.message)) {
          console.log('💬 Nova mensagem de chat recebida')
          chatMessages.value.unshift(data)

          if (chatMessages.value.length > 100) {
            chatMessages.value = chatMessages.value.slice(0, 100)
          }
        } else {
          console.log('📦 Tipo de mensagem desconhecido:', data.type)
        }
      } catch (error) {
        console.error('❌ Erro ao processar mensagem WebSocket:', error)
      }
    }

    websocket.onerror = (error) => {
      console.error('❌ Erro no WebSocket da Store:', error)
      wsConnected.value = false
    }

    websocket.onclose = (event) => {
      console.log('🔌 Conexão WebSocket fechada:', event.code, event.reason)
      wsConnected.value = false
      attemptReconnect()
    }
  }

  let reconnectAttempts = 0
  const maxReconnectAttempts = 10
  let reconnectTimer: number | null = null

  function attemptReconnect() {
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

  // Salvar configurações via API
  async function saveConfigs(newConfigs: IConfigs) {
    try {
      const response = await fetch('http://localhost:5000/api/configs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newConfigs),
      })

      if (response.ok) {
        configs.value = newConfigs
        console.log('✅ Configurações salvas com sucesso')
        return true
      } else {
        console.error('❌ Erro ao salvar configurações')
        return false
      }
    } catch (error) {
      console.error('❌ Erro de rede:', error)
      return false
    }
  }

  function setTheme(themePayload: ITheme) {
    if (!configs.value) {
      console.error('❌ Configurações não carregadas ainda')
      return
    }

    const updatedConfigs = {
      ...configs.value,
      theme: themePayload,
    }

    saveConfigs(updatedConfigs)
  }

  const generalPathThemes = '/themes/'

  function loadThemeImagesPath(path: string) {
    const base = `${generalPathThemes}${path}/`
    return {
      bgTop: `${base}top-bar.png`,
      bgChat: `${base}bg-chat.png`,
    }
  }

  const themeFolderPath = computed(() => {
    if (!configs.value) return loadThemeImagesPath('default')

    return loadThemeImagesPath(configs.value.theme.path)
  })

  // Ordenar mensagens (mais recentes primeiro)
  const messagesOrdered = computed(() => {
    return [...chatMessages.value].reverse()
  })

  // Carregar configurações e conectar WebSocket ao iniciar
  loadInitialConfigs().then(() => {
    console.log('🚀 Iniciando conexão WebSocket da Store')
    connectWebSocket()
  })

  return {
    configs,
    isLoading,
    error,
    chatMessages,
    messagesOrdered,
    setTheme,
    saveConfigs,
    themeFolderPath,
    loadInitialConfigs,
    connectWebSocket,
    loadThemeImagesPath,
  }
})
