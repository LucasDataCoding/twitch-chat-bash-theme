<template>
  <div class="wrapper-configs">
    <NavBarTop />

    <div class="flex space-x-5 w-screen">
      <Tabs value="0" class="w-full">
        <TabList>
          <Tab value="0">Temas</Tab>
          <Tab value="1">Configurações Base</Tab>
          <router-link to="/chat">
            <Tab value="2">Mensagens</Tab>
          </router-link>
        </TabList>

        <TabPanels class="wrapper-tab-content">
          <TabPanel value="0">
            <div class="grid grid-cols-4">
              <ThemeCard v-for="theme in themes" :key="theme.path" :theme="theme" />
            </div>
          </TabPanel>
          <TabPanel value="1">
            <form class="wrapper-form flex justify-center flex-col gap-4 max-w-[600px]">
              <div class="flex flex-col gap-1">
                <InputText name="username" type="text" placeholder="Username" />
              </div>
              <div class="flex flex-col gap-1">
                <InputText name="email" type="text" placeholder="Email" />
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
import { RouterLink } from 'vue-router'

const configsStore = useConfigStore()
</script>

<style lang="scss" scoped>
.wrapper-configs {
  & > :first-child {
    margin-bottom: 0 1rem 0 2rem;
  }
}

.highlight-theme {
  color: #6441a5;
  font-weight: bold;
}

.wrapper-tab-content {
  padding: 3rem 2rem;
}

.wrapper-form {
  & > :not(:last-child) {
    margin-bottom: 1rem;
  }
}
</style>
