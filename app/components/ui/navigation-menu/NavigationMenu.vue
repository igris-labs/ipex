<script setup lang="ts">
import { NavigationMenu as Primitive } from 'akaza-ui'
import { computed, useAttrs } from 'vue'

import { cn } from '../../../utils/ui'
import uiConfig from '../ui.config'
import {
  navigationMenuVariants,
  resolveNavigationMenuVariants,
  type NavigationMenuProps,
  type NavigationMenuSlots,
} from './index'

defineOptions({ inheritAttrs: false })
// Preserve Akaza defaults when optional props, including Boolean aliases, are omitted.
const props = withDefaults(defineProps<NavigationMenuProps>(), {
  defaultValue: undefined,
  orientation: undefined,
  contentMode: undefined,
  collapsed: undefined,
  tooltip: undefined,
  defaultExpanded: undefined,
  loop: undefined,
  dir: undefined,
  disabled: undefined,
  openDelay: undefined,
  closeDelay: undefined,
  sideOffset: undefined,
  teleport: undefined,
  ariaLabel: undefined,
  ui: undefined,
  open: undefined,
  expanded: undefined,
  modelValue: undefined,
})
defineSlots<NavigationMenuSlots>()
const attrs = useAttrs()
const styles = computed(() =>
  navigationMenuVariants(resolveNavigationMenuVariants(props, uiConfig)),
)
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
</script>
<template>
  <component :is="Primitive" v-bind="{ ...primitiveProps, ...attrs }" :ui="mergedUi">
    <template v-for="(_, name) in $slots" #[name]="scope"
      ><slot :name="name as keyof NavigationMenuSlots" v-bind="scope ?? {}"
    /></template>
  </component>
</template>
