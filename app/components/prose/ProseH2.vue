<script setup lang="ts">
import ProseHeading from './ProseHeading.vue'
defineProps<{ id?: string }>()
</script>
<template>
  <ProseHeading :level="2" :id="id"><slot /></ProseHeading>
</template>
