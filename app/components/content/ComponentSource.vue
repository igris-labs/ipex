<script setup lang="ts">
import { computed, ref, watch } from 'vue'

import { Tabs } from '../ui/tabs'
import CodeFileIcon from './CodeFileIcon.vue'
import DocsCode from './DocsCode.vue'

const props = defineProps<{ name: string }>()
const modules = import.meta.glob('../ui/*/*', { query: '?raw', import: 'default' })
const name = computed(() =>
  props.name
    .split('-')
    .map((s) => s[0]!.toUpperCase() + s.slice(1))
    .join(''),
)
const { data: files } = await useAsyncData(
  () => `source:${props.name}`,
  async () => {
    const entries = [
      { value: 'component', label: `${name.value}.vue` },
      { value: 'index', label: 'index.ts' },
    ]
    return Promise.all(
      entries.map(async (entry) => ({
        ...entry,
        filename: `app/components/ui/${props.name}/${entry.label}`,
        code: (await modules[`../ui/${props.name}/${entry.label}`]!()) as string,
      })),
    )
  },
)
const active = ref('component')
watch(
  () => props.name,
  () => {
    active.value = 'component'
  },
)
</script>
<template>
  <Tabs
    :unmount-on-hide="false"
    v-model="active"
    :items="files ?? []"
    aria-label="Component source files"
    :ui="{ root: 'gap-2' }"
  >
    <template #tab="{ item }">
      <CodeFileIcon :filename="item.label ?? item.value" />
      {{ item.label }}
    </template>
    <template v-for="file in files" :key="file.value" #[`panel-${file.value}`]
      ><DocsCode class="my-0!" :code="file.code" :filename="file.filename"
    /></template>
  </Tabs>
</template>
