<script setup lang="ts">
import utils from '../../utils/ui.ts?raw'
import config from '../ui/ui.config.ts?raw'
import types from '../ui/ui.types.ts?raw'
import DocsCode from './DocsCode.vue'

import css from '../../assets/main.css?raw'

defineProps<{ file: 'config' | 'types' | 'utils' | 'css' }>()
const files = {
  config: { filename: 'app/components/ui/ui.config.ts', code: config },
  types: { filename: 'app/components/ui/ui.types.ts', code: types },
  utils: { filename: 'app/utils/ui.ts', code: utils },
  css: { filename: 'app/assets/main.css', code: css },
}
</script>

<template><DocsCode :filename="files[file].filename" :code="files[file].code" /></template>
