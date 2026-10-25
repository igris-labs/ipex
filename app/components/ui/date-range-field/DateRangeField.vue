<script setup lang="ts">
import { DateRangeField as Primitive } from 'akaza-ui'
import { computed, useAttrs, useTemplateRef } from 'vue'

import { cn, mergeRecipeSlots } from '../../../utils/ui'
import { calendarVariants } from '../calendar'
import { dateFieldVariants } from '../date-field'
import uiConfig from '../ui.config'
import {
  dateRangeFieldVariants,
  resolveDateRangeFieldVariants,
  type DateRangeFieldProps,
  type DateRangeFieldSlots,
} from './index'

defineOptions({ inheritAttrs: false })
// Preserve Akaza defaults when optional props, including Boolean aliases, are omitted.
const props = withDefaults(defineProps<DateRangeFieldProps>(), {
  id: undefined,
  name: undefined,
  startName: undefined,
  endName: undefined,
  locale: undefined,
  dir: undefined,
  placeholder: undefined,
  minValue: undefined,
  maxValue: undefined,
  isDateUnavailable: undefined,
  allowNonContiguousRanges: undefined,
  maximumDays: undefined,
  fixedDate: undefined,
  required: undefined,
  disabled: undefined,
  readOnly: undefined,
  invalid: undefined,
  selectOnFocus: undefined,
  autoAdvance: undefined,
  startLabel: undefined,
  endLabel: undefined,
  ariaLabel: undefined,
  ariaLabelledby: undefined,
  ariaDescribedby: undefined,
  ui: undefined,
  modelValue: undefined,
})
defineSlots<DateRangeFieldSlots>()
const attrs = useAttrs()
const resolved = computed(() => resolveDateRangeFieldVariants(props, uiConfig))
const styles = computed(() => dateRangeFieldVariants(resolved.value))
const mergedUi = computed(() => {
  const overrides = props.ui as Record<string, string | undefined> | undefined
  const flat = Object.fromEntries(
    Object.entries(styles.value)
      .filter(([part]) => !['startField', 'endField'].includes(part))
      .map(([part, style]) => [
        part,
        cn(style(), overrides?.[part], part === 'root' ? props.class : undefined),
      ]),
  )
  return {
    ...flat,
    startField: {
      ...mergeRecipeSlots(dateFieldVariants({ size: resolved.value.size }), props.ui?.startField),
      calendar: mergeRecipeSlots(
        calendarVariants({ size: resolved.value.size }),
        props.ui?.startField?.calendar,
      ),
    },
    endField: {
      ...mergeRecipeSlots(dateFieldVariants({ size: resolved.value.size }), props.ui?.endField),
      calendar: mergeRecipeSlots(
        calendarVariants({ size: resolved.value.size }),
        props.ui?.endField?.calendar,
      ),
    },
  }
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
  get focusEnd() {
    return primitive.value!.focusEnd
  },
  get focusStart() {
    return primitive.value!.focusStart
  },
  get setValue() {
    return primitive.value!.setValue
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
      ><slot :name="name as keyof DateRangeFieldSlots" v-bind="scope ?? {}"
    /></template>
  </component>
</template>
