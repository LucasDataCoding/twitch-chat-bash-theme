<template>
  <div class="wrapper-top-title">
    <div class="path">
      {{ path }}
    </div>

    <div class="distribution">
      {{ distribution }}
    </div>

    <div class="sufix">
      {{ sufix }}
    </div>
  </div>
</template>


<script lang="ts" setup>
import { ref } from 'vue'

const path = ref('lucas@datacoding')
const distribution = ref('!chatcode')
const sufix = ref('~')
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
