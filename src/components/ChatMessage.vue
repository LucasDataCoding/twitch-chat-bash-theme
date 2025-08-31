<template>
  <div>
    <span class="prefix">
      {{ prefix }}
    </span>

    {{ chatterName }} : {{ message }}
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const props = defineProps({
  prefix: String,
  chatterName: String,
  message: String,
})
</script>


<style lang="scss" scoped>
.prefix {
  color: green;
}
</style>
