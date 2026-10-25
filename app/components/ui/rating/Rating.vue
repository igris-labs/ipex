<script setup lang="ts">
import { Rating as Primitive } from 'akaza-ui'
import { computed, useAttrs, useTemplateRef } from 'vue'

import { cn } from '../../../utils/ui'
import uiConfig from '../ui.config'
import { ratingVariants, resolveRatingVariants, type RatingProps, type RatingSlots } from './index'

defineOptions({ inheritAttrs: false })
// Preserve Akaza defaults when optional props, including Boolean aliases, are omitted.
const props = withDefaults(defineProps<RatingProps>(), {
  length: undefined,
  step: undefined,
  clearable: undefined,
  hoverable: undefined,
  loop: undefined,
  orientation: undefined,
  dir: undefined,
  autoFocus: undefined,
  id: undefined,
  name: undefined,
  required: undefined,
  disabled: undefined,
  readOnly: undefined,
  invalid: undefined,
  ariaLabel: undefined,
  ariaLabelledby: undefined,
  ariaDescribedby: undefined,
  getValueLabel: undefined,
  ui: undefined,
  modelValue: undefined,
})
defineSlots<RatingSlots>()
const attrs = useAttrs()
const styles = computed(() => ratingVariants(resolveRatingVariants(props, uiConfig)))
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
  get clear() {
    return primitive.value!.clear
  },
  get focus() {
    return primitive.value!.focus
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
      ><slot :name="name as keyof RatingSlots" v-bind="scope ?? {}"
    /></template>
  </component>
</template>
