<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{ filename: string }>()
const extension = computed(() => props.filename.split('.').at(-1)?.toLowerCase() ?? '')
const icon = computed(() => {
  const types: Record<string, { name: string; color: string }> = {
    vue: { name: 'brand-vue', color: 'text-success' },
    ts: { name: 'brand-typescript', color: 'text-info' },
    tsx: { name: 'file-type-tsx', color: 'text-info' },
    js: { name: 'brand-javascript', color: 'text-warning' },
    mjs: { name: 'brand-javascript', color: 'text-warning' },
    jsx: { name: 'file-type-jsx', color: 'text-warning' },
    css: { name: 'brand-css3', color: 'text-info' },
    html: { name: 'brand-html5', color: 'text-warning' },
    json: { name: 'json', color: 'text-warning' },
    md: { name: 'markdown', color: 'text-muted-foreground' },
    svg: { name: 'file-type-svg', color: 'text-warning' },
    sh: { name: 'terminal-2', color: 'text-muted-foreground' },
  }
  return types[extension.value] ?? { name: 'file-code', color: 'text-muted-foreground' }
})
</script>

<template>
  <Icon
    :name="`tabler:${icon.name}`"
    class="size-4 shrink-0"
    :class="icon.color"
    :data-file-extension="extension"
    aria-hidden="true"
  />
</template>
