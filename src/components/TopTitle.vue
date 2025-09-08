<template>
  <div class="wrapper-top-title">
    <div class="path">
      {{ configs.configs?.name }}
    </div>

    <div class="distribution">
      {{ configs.configs?.highlightText }}
    </div>
  </div>
</template>


<script lang="ts" setup>
import { topTexts } from '@/contants'
import { useConfigStore } from '@/stores/config'
import { ref } from 'vue'

const configs = useConfigStore()
</script>


<style lang="scss" scoped>
.wrapper-top-title {
  display: flex;
  align-items: center;

  & > :not(:last-child) {
    margin-right: 0.5rem;
  }

  .path {
    color: #fcfefe !important;
  }

  .distribution {
    color: #977dff !important;
    font-weight: bold;
  }

  .sufix {
    color: #a8b34e;
  }
}
</style>
