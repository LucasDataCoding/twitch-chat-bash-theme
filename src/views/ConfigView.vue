<template>
  <div class="wrapper-configs">
    <NavBarTop />

    <div class="flex space-x-5 w-screen px-5 lg:px-20">
      <Tabs value="0" class="w-full">
        <TabList>
          <Tab value="0">Temas</Tab>
          <Tab value="1">Configurações Base</Tab>
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
            <form class="wrapper-form flex justify-center flex-col gap-4 max-w-[600px]">
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

const name = computed({
  get: () => configsStore.configs?.name,
  set: (val: string) => {
    if (timeoutName.value) {
      clearTimeout(timeoutName.value)
    }

    timeoutName.value = setTimeout(() => configsStore.setName(val), 1000)
  },
})

const highlightText = computed({
  get: () => configsStore.configs?.highlightText,
  set: (val: string) => {
    if (timeoutHighlightText.value) {
      clearTimeout(timeoutHighlightText.value)
    }

    timeoutHighlightText.value = setTimeout(() => configsStore.setHighlightText(val), 1000)
  },
})

highlightText
</script>

<style lang="scss" scoped>
.highlight-theme {
  color: #6441a5;
  font-weight: bold;
}

.wrapper-form {
  & > * {
    & > :first-child {
      color: var(--p-primary-color);
    }
  }
}

.mb-1 {
  margin-bottom: 1rem;
}
</style>
