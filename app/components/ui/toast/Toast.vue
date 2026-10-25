<script setup lang="ts">
import { Toast as Primitive } from 'akaza-ui'
import { computed, useAttrs } from 'vue'

import { cn } from '../../../utils/ui'
import uiConfig from '../ui.config'
import { toastVariants, resolveToastVariants, type ToastProps, type ToastSlots } from './index'

defineOptions({ inheritAttrs: false })
// Preserve Akaza defaults when optional props, including Boolean aliases, are omitted.
const props = withDefaults(defineProps<ToastProps>(), {
  position: undefined,
  limit: undefined,
  stack: undefined,
  gap: undefined,
  peek: undefined,
  scaleStep: undefined,
  hotkey: undefined,
  hotkeyLabel: undefined,
  closeLabel: undefined,
  swipeDirection: undefined,
  swipeThreshold: undefined,
  pauseOnHover: undefined,
  pauseOnFocus: undefined,
  pauseOnWindowBlur: undefined,
  teleport: undefined,
  manager: undefined,
  ui: undefined,
})
defineSlots<ToastSlots>()
const attrs = useAttrs()
const styles = computed(() => toastVariants(resolveToastVariants(props, uiConfig)))
const mergedUi = computed(() => {
  const overrides = props.ui as Record<string, string | undefined> | undefined
  return Object.fromEntries(
    Object.entries(styles.value).map(([part, style]) => [
      part,
      cn(style(), overrides?.[part], part === 'toast' ? props.class : undefined),
    ]),
  )
})
const primitiveProps = computed(() => {
  const { class: _class, ui: _ui, size: _size, ...native } = props
  return native
})
</script>
<template>
  <component :is="Primitive" v-bind="{ ...primitiveProps, ...attrs }" :ui="mergedUi">
    <template v-for="(_, name) in $slots" #[name]="scope"
      ><slot :name="name as keyof ToastSlots" v-bind="scope ?? {}"
    /></template>
  </component>
</template>
