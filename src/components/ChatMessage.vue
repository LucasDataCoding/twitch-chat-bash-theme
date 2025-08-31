<template>
  <div>
    <span class="prefix">
      {{ prefix }}
    </span>

    <span :style="{ color: messageColor || 'white' }" class="chatter-name"> {{ chatterName }} </span
    >:

    {{ message }}
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const props = defineProps({
  prefix: String,
  chatterName: String,
  message: String,
  messageColor: String,
})
</script>


<style lang="scss" scoped>
.prefix {
  color: green;
}

.chatter-name {
  margin-left: 0.5ch;
}
</style>
