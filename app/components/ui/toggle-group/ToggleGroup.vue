<script setup lang="ts">
import { ToggleGroup as Primitive } from 'akaza-ui'
import { computed, useAttrs } from 'vue'

import { cn } from '../../../utils/ui'
import uiConfig from '../ui.config'
import {
  toggleGroupVariants,
  resolveToggleGroupVariants,
  type ToggleGroupProps,
  type ToggleGroupSlots,
} from './index'

defineOptions({ inheritAttrs: false })
// Preserve Akaza defaults when optional props, including Boolean aliases, are omitted.
const props = withDefaults(defineProps<ToggleGroupProps>(), {
  type: undefined,
  valueKey: undefined,
  labelKey: undefined,
  descriptionKey: undefined,
  disabledKey: undefined,
  disabled: undefined,
  required: undefined,
  name: undefined,
  orientation: undefined,
  loop: undefined,
  rovingFocus: undefined,
  allowEmpty: undefined,
  ariaLabel: undefined,
  ariaLabelledby: undefined,
  ui: undefined,
  modelValue: undefined,
})
defineSlots<ToggleGroupSlots>()
const attrs = useAttrs()
const styles = computed(() => toggleGroupVariants(resolveToggleGroupVariants(props, uiConfig)))
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
      ><slot :name="name as keyof ToggleGroupSlots" v-bind="scope ?? {}"
    /></template>
  </component>
</template>
