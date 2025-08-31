<template>
  <div class="wrapper-top-title">
    <div class="path">
      {{ topTexts.left }}
    </div>

    <div class="distribution">
      {{ topTexts.middle }}
    </div>

    <div class="sufix">
      {{ topTexts.right }}
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
    color: #5fa951;
  }

  .distribution {
    color: #a951a9;
  }

  .sufix {
    color: #a8b34e;
  }
}
</style>
