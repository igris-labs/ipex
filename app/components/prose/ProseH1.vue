<script setup lang="ts">
import ProseHeading from './ProseHeading.vue'
defineProps<{ id?: string }>()
</script>
<template>
  <ProseHeading :level="1" :id="id"><slot /></ProseHeading>
</template>
