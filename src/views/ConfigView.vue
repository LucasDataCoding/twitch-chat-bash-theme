<template>
  <div class="flex space-x-5 w-screen">
    <Tabs value="0" class="w-full">
      <TabList>
        <Tab value="0">Temas</Tab>
        <Tab value="1">Configurações Base</Tab>
        <router-link to="/chat">
          <Tab value="2">Mensagens</Tab>
        </router-link>
      </TabList>
      <TabPanels>
        <TabPanel value="0">
          <div class="grid grid-cols-4">
            <ThemeCard v-for="theme in themes" :key="theme.path" :theme="theme" />
          </div>
        </TabPanel>
        <TabPanel value="1"> </TabPanel>
        <TabPanel value="2">
          <p class="m-0">
            At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium
            voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint
            occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt
            mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et
            expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque
            nihil impedit quo minus.
          </p>
        </TabPanel>
      </TabPanels>
    </Tabs>
  </div>
</template>

<script lang="ts" setup>
import ThemeCard from '@/components/ThemeCard.vue'
import { themes } from '@/constants/themes'
import { useConfigStore } from '@/stores/config'
import { RouterLink } from 'vue-router'
const configsStore = useConfigStore()
</script>

<style lang="scss" scoped>
.highlight-theme {
  color: #6441a5;
  font-weight: bold;
}
</style>
