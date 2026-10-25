<script setup lang="ts">
import { ContextMenu as Primitive } from 'akaza-ui'
import { computed, useAttrs, useTemplateRef } from 'vue'

import { cn } from '../../../utils/ui'
import uiConfig from '../ui.config'
import {
  contextMenuVariants,
  resolveContextMenuVariants,
  type ContextMenuProps,
  type ContextMenuSlots,
} from './index'

defineOptions({ inheritAttrs: false })
// Preserve Akaza defaults when optional props, including Boolean aliases, are omitted.
const props = withDefaults(defineProps<ContextMenuProps>(), {
  items: undefined,
  disabled: undefined,
  dir: undefined,
  closeOnSelect: undefined,
  radioValues: undefined,
  sideOffset: undefined,
  longPressDelay: undefined,
  restoreFocus: undefined,
  teleport: undefined,
  ui: undefined,
  modelValue: undefined,
})
defineSlots<ContextMenuSlots>()
const attrs = useAttrs()
const styles = computed(() => contextMenuVariants(resolveContextMenuVariants(props, uiConfig)))
const mergedUi = computed(() => {
  const overrides = props.ui as Record<string, string | undefined> | undefined
  return Object.fromEntries(
    Object.entries(styles.value).map(([part, style]) => [
      part,
      cn(style(), overrides?.[part], part === 'root' ? props.class : undefined),
    ]),
  )
})
const primitiveProps = computed(() => {
  const { class: _class, ui: _ui, size: _size, ...native } = props
  return native
})
const primitive = useTemplateRef<InstanceType<typeof Primitive>>('primitive')
defineExpose({
  get openAt() {
    return primitive.value!.openAt
  },
  get close() {
    return primitive.value!.close
  },
})
</script>
<template>
  <component
    :is="Primitive"
    ref="primitive"
    v-bind="{ ...primitiveProps, ...attrs }"
    :ui="mergedUi"
  >
    <template v-for="(_, name) in $slots" #[name]="scope"
      ><slot :name="name as keyof ContextMenuSlots" v-bind="scope ?? {}"
    /></template>
  </component>
</template>
