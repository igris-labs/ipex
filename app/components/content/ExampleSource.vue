<script setup lang="ts">
import { Collapsible } from '../ui/collapsible'
import DocsCode from './DocsCode.vue'

const props = defineProps<{ file: string }>()
const sources = import.meta.glob('./*Examples.vue', { query: '?raw', import: 'default' })
const { data: code } = await useAsyncData(`example-source:${props.file}`, async () => {
  const source = sources[`./${props.file}`]
  return source ? ((await source()) as string) : ''
})
</script>

<template>
  <Collapsible v-if="code" class="my-4" :unmount-on-hide="true" data-example-source>
    <template #trigger>Example source</template>
    <template #content
      ><DocsCode class="my-0!" :code="code" :filename="`examples/${file}`"
    /></template>
  </Collapsible>
</template>
