<script setup lang="ts">
import DocsCode from '../content/DocsCode.vue'

defineOptions({ inheritAttrs: false })
defineProps<{
  code?: string
  language?: string
  filename?: string
  highlights?: number[]
  meta?: string
  class?: string
}>()
</script>

<template>
  <DocsCode
    :code="code ?? ''"
    :filename="filename"
    :language="language"
    :pre-class="$props.class"
    :pre-attrs="$attrs"
  />
</template>
