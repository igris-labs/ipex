<script setup lang="ts">
import { ref } from 'vue'

import component from '../ui/button/Button.vue?raw'
import index from '../ui/button/index.ts?raw'
import { Tabs } from '../ui/tabs'
import DocsCode from './DocsCode.vue'

const files = [
  {
    value: 'component',
    label: 'Button.vue',
    filename: 'app/components/ui/button/Button.vue',
    code: component,
  },
  { value: 'index', label: 'index.ts', filename: 'app/components/ui/button/index.ts', code: index },
]
const active = ref('component')
</script>

<template>
  <Tabs v-model="active" :items="files" aria-label="Component source files">
    <template v-for="file in files" :key="file.value" #[`panel-${file.value}`]
      ><DocsCode :code="file.code" :filename="file.filename"
    /></template>
  </Tabs>
</template>
