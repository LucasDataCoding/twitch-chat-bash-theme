<template>
  <div>$ {{ chatterName }} : {{ message }}</div>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const props = defineProps({
  chatterName: String,
  message: String,
})
</script>
