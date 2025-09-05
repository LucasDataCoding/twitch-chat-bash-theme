<template>
  <div class="wrapper-top-title">
    <div class="path">
      {{ topTexts.left }}
    </div>

    <div class="distribution">
      {{ topTexts.middle }}
    </div>
  </div>
</template>


<script lang="ts" setup>
import { topTexts } from '@/contants'
import { ref } from 'vue'
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
