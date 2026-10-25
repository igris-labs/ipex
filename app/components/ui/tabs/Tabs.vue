<script setup lang="ts">
import { Tabs as Primitive } from 'akaza-ui'
import { computed, useAttrs } from 'vue'

import { cn } from '../../../utils/ui'
import uiConfig from '../ui.config'
import { tabsVariants, resolveTabsVariants, type TabsProps, type TabsSlots } from './index'

defineOptions({ inheritAttrs: false })
// Preserve Akaza defaults when optional props, including Boolean aliases, are omitted.
const props = withDefaults(defineProps<TabsProps>(), {
  orientation: undefined,
  activationMode: undefined,
  unmountOnHide: undefined,
  ariaLabel: undefined,
  labelKey: undefined,
  ui: undefined,
  modelValue: undefined,
})
defineSlots<TabsSlots>()
const attrs = useAttrs()
const styles = computed(() => tabsVariants(resolveTabsVariants(props, uiConfig)))
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
  const { class: _class, ui: _ui, size: _size, variant: _variant, ...native } = props
  return native
})
</script>
<template>
  <component :is="Primitive" v-bind="{ ...primitiveProps, ...attrs }" :ui="mergedUi">
    <template v-for="(_, name) in $slots" #[name]="scope"
      ><slot :name="name as keyof TabsSlots" v-bind="scope ?? {}"
    /></template>
  </component>
</template>
