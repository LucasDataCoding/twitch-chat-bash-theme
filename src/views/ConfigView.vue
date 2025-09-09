<template>
  <div class="wrapper-configs">
    <NavBarTop />

    <div class="flex space-x-5 w-screen px-5 lg:px-20">
      <Tabs value="0" class="w-full">
        <TabList>
          <Tab value="0">Temas</Tab>
          <Tab value="1">Configurações</Tab>
          <router-link to="/chat">
            <Tab value="2">Mensagens</Tab>
          </router-link>
        </TabList>

        <TabPanels class="wrapper-tab-content mt-3 lg:mt-5 lg:px-3">
          <TabPanel value="0">
            <div class="grid grid-cols-1 lg:grid-cols-4 gap-5 lg:gap-10">
              <ThemeCard v-for="theme in themes" :key="theme.path" :theme="theme" />
            </div>
          </TabPanel>

          <TabPanel value="1">
            <form class="wrapper-form">
              <div class="my-10">
                <Divider align="start" type="dotted">
                  <b class="text-purple-400 my-5">Twitch</b>
                </Divider>
              </div>
              <div class="grid grid-cols-1 lg:grid-cols-4 gap-5 lg:gap-10">
                <div class="flex flex-col gap-1">
                  <span>Nome</span>
                  <InputText v-model.trim="name" name="Nome" type="text" placeholder="Nome" />
                </div>

                <div class="flex flex-col gap-1">
                  <span>Texto Destacado</span>
                  <InputText
                    v-model="highlightText"
                    name="Mensagem Destacada"
                    type="text"
                    placeholder="Mensagem Destacada"
                  />
                </div>

                <div class="flex flex-col gap-1">
                  <span>Chat Token</span>
                  <InputText
                    v-model="chatToken"
                    name="Chat Token oauth:"
                    type="password"
                    placeholder="Chat Token oauth:"
                  />
                </div>

                <div class="flex flex-col gap-1">
                  <span>Canal</span>
                  <InputText v-model="channel" name="Canal" type="text" placeholder="Canal" />
                </div>

                <div class="flex flex-col gap-1">
                  <span>Nome do Bot</span>
                  <InputText
                    v-model="botName"
                    name="Nome do Bot"
                    type="text"
                    placeholder="Nome do Bot"
                  />
                </div>
              </div>

              <div class="my-10">
                <Divider align="start" type="dotted">
                  <b class="text-red-400 my-5">Comandos par Exibir Redes Sociais</b>
                </Divider>
              </div>

              <div class="grid grid-cols-1 lg:grid-cols-4 gap-5 lg:gap-10">
                <div class="flex flex-col gap-1">
                  <span>!Comandos</span>
                  <InputText
                    v-model.trim="commands"
                    name="Comandos"
                    type="text"
                    placeholder="Comandos"
                  />
                </div>

                <div class="flex flex-col gap-1">
                  <span>!Youtube</span>
                  <InputText
                    v-model="linkYoutube"
                    name="Link Youtube"
                    type="text"
                    placeholder="Link Youtube"
                  />
                </div>

                <div class="flex flex-col gap-1">
                  <span>!Discord</span>
                  <InputText
                    v-model="linkDiscord"
                    name="Link Discord"
                    type="text"
                    placeholder="Link Discord"
                  />
                </div>
              </div>
            </form>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  </div>
</template>

<script lang="ts" setup>
import NavBarTop from '@/components/NavBarTop.vue'
import ThemeCard from '@/components/ThemeCard.vue'
import { themes } from '@/constants/themes'
import { useConfigStore } from '@/stores/config'
import { computed, ref } from 'vue'
import { RouterLink } from 'vue-router'

const configsStore = useConfigStore()

const timeoutName = ref()
const timeoutHighlightText = ref()
const timeoutBotName = ref()
const timeoutChannel = ref()
const timeoutChatToken = ref()
const timeoutCommands = ref()
const timeoutLinkYoutube = ref()
const timeoutLinkDiscord = ref()

const name = computed({
  get: () => configsStore.configs?.name,
  set: (val: string) => {
    if (timeoutName.value) {
      clearTimeout(timeoutName.value)
    }

    timeoutName.value = setTimeout(() => configsStore.addSingleConfig({ name: val }), 1000)
  },
})

const highlightText = computed({
  get: () => configsStore.configs?.highlightText,
  set: (val: string) => {
    if (timeoutHighlightText.value) {
      clearTimeout(timeoutHighlightText.value)
    }

    timeoutHighlightText.value = setTimeout(
      () => configsStore.addSingleConfig({ highlightText: val }),
      1000
    )
  },
})

const channel = computed({
  get: () => configsStore.configs?.CHAT?.CHANNEL,
  set: (val: string) => {
    if (timeoutChannel.value) {
      clearTimeout(timeoutChannel.value)
    }

    timeoutChannel.value = setTimeout(
      () => configsStore.addChatConfig({ CHANNEL: val.trim().toLowerCase() }),
      1000
    )
  },
})

const chatToken = computed({
  get: () => configsStore.configs?.CHAT?.CHAT_TOKEN,
  set: (val: string) => {
    if (timeoutChatToken.value) {
      clearTimeout(timeoutChatToken.value)
    }

    timeoutHighlightText.value = setTimeout(
      () => configsStore.addChatConfig({ CHAT_TOKEN: val }),
      1000
    )
  },
})

const botName = computed({
  get: () => configsStore.configs?.CHAT?.BOT_USERNAME,
  set: (val: string) => {
    if (timeoutBotName.value) {
      clearTimeout(timeoutBotName.value)
    }

    timeoutBotName.value = setTimeout(
      () => configsStore.addChatConfig({ BOT_USERNAME: val.trim().toLowerCase() }),
      1000
    )
  },
})

const commands = computed({
  get: () => configsStore.configs?.commands,
  set: (val: string) => {
    if (timeoutCommands.value) {
      clearTimeout(timeoutCommands.value)
    }

    timeoutCommands.value = setTimeout(
      () => configsStore.addSingleConfig({ commands: val.trim().toLowerCase() }),
      1000
    )
  },
})

const linkYoutube = computed({
  get: () => configsStore.configs?.linkYoutube,
  set: (val: string) => {
    if (timeoutLinkYoutube.value) {
      clearTimeout(timeoutLinkYoutube.value)
    }

    timeoutLinkYoutube.value = setTimeout(
      () => configsStore.addSingleConfig({ linkYoutube: val.trim().toLowerCase() }),
      1000
    )
  },
})

const linkDiscord = computed({
  get: () => configsStore.configs?.linkDiscord,
  set: (val: string) => {
    if (timeoutLinkDiscord.value) {
      clearTimeout(timeoutLinkDiscord.value)
    }

    timeoutLinkDiscord.value = setTimeout(
      () => configsStore.addSingleConfig({ linkDiscord: val.trim().toLowerCase() }),
      1000
    )
  },
})
</script>

<style lang="scss" scoped>
.highlight-theme {
  color: #6441a5;
  font-weight: bold;
}

.mb-1 {
  margin-bottom: 1rem;
}

.text-red {
  color: var(--p-primary-200);
}
</style>
