<template>
  <Card
    class="wrapper-card overflow-hidden w-full"
    :style="`background: url(${configStore.loadThemeImagesPath(theme.path).bgChat})`"
  >
    <template #header>
      <img alt="imagem tema" :src="configStore.loadThemeImagesPath(theme.path).bgTop" />
    </template>

    <template #title>{{ theme.name }}</template>

    <template #footer>
      <div class="flex gap-4 mt-1">
        <Button
          class="w-full"
          @click="isCurrentTheme ? '' : configStore.addSingleConfig({ theme })"
          :disabled="isCurrentTheme"
        >
          <span style="font-weight: bold">
            {{ isCurrentTheme ? 'Tema Atual' : 'Usar Tema' }}
          </span>
        </Button>
      </div>
    </template>
  </Card>
</template>

<script lang="ts" setup>
import type { ITheme } from '@/interfaces/themes'
import { useConfigStore } from '@/stores/config'
import { computed, defineProps } from 'vue'
import type { PropType } from 'vue'

const props = defineProps({
  theme: {
    required: true,
    type: Object as PropType<ITheme>,
  },
})

const configStore = useConfigStore()

const isCurrentTheme = computed(() => configStore.configs?.theme.path === props.theme.path)
</script>

<style lang="scss" scoped>
.wrapper-card {
  border: 1px solid var(--p-primary-300);
}
</style>
