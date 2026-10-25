<script setup lang="ts">
import { DateRangePicker as Primitive } from 'akaza-ui'
import { computed, useAttrs, useTemplateRef } from 'vue'

import { cn, mergeRecipeSlots } from '../../../utils/ui'
import { calendarVariants } from '../calendar'
import { dateFieldVariants } from '../date-field'
import { dateRangeFieldVariants } from '../date-range-field'
import uiConfig from '../ui.config'
import {
  dateRangePickerVariants,
  resolveDateRangePickerVariants,
  type DateRangePickerProps,
  type DateRangePickerSlots,
} from './index'

defineOptions({ inheritAttrs: false })
// Preserve Akaza defaults when optional props, including Boolean aliases, are omitted.
const props = withDefaults(defineProps<DateRangePickerProps>(), {
  id: undefined,
  name: undefined,
  startName: undefined,
  endName: undefined,
  locale: undefined,
  dir: undefined,
  minValue: undefined,
  maxValue: undefined,
  isDateDisabled: undefined,
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
  calendarLabel: undefined,
  closeLabel: undefined,
  closeOnSelect: undefined,
  weekStartsOn: undefined,
  weekdayFormat: undefined,
  fixedWeeks: undefined,
  numberOfMonths: undefined,
  pagedNavigation: undefined,
  disableDaysOutsideCurrentView: undefined,
  nextPage: undefined,
  prevPage: undefined,
  side: undefined,
  align: undefined,
  sideOffset: undefined,
  teleport: undefined,
  ui: undefined,
  modelValue: undefined,
  open: undefined,
  placeholder: undefined,
})
defineSlots<DateRangePickerSlots>()
const attrs = useAttrs()
const resolved = computed(() => resolveDateRangePickerVariants(props, uiConfig))
const styles = computed(() => dateRangePickerVariants(resolved.value))
const mergedUi = computed(() => {
  const overrides = props.ui as Record<string, string | undefined> | undefined
  const flat = Object.fromEntries(
    Object.entries(styles.value)
      .filter(([part]) => !['field', 'calendar'].includes(part))
      .map(([part, style]) => [
        part,
        cn(style(), overrides?.[part], part === 'root' ? props.class : undefined),
      ]),
  )
  return {
    ...flat,
    field: {
      ...mergeRecipeSlots(dateRangeFieldVariants({ size: resolved.value.size }), props.ui?.field),
      startField: {
        ...mergeRecipeSlots(
          dateFieldVariants({ size: resolved.value.size }),
          props.ui?.field?.startField,
        ),
        calendar: mergeRecipeSlots(
          calendarVariants({ size: resolved.value.size }),
          props.ui?.field?.startField?.calendar,
        ),
      },
      endField: {
        ...mergeRecipeSlots(
          dateFieldVariants({ size: resolved.value.size }),
          props.ui?.field?.endField,
        ),
        calendar: mergeRecipeSlots(
          calendarVariants({ size: resolved.value.size }),
          props.ui?.field?.endField?.calendar,
        ),
      },
    },
    calendar: mergeRecipeSlots(calendarVariants({ size: resolved.value.size }), props.ui?.calendar),
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
  get close() {
    return primitive.value!.close
  },
  get focusEnd() {
    return primitive.value!.focusEnd
  },
  get focusStart() {
    return primitive.value!.focusStart
  },
  get open() {
    return primitive.value!.open
  },
  get toggle() {
    return primitive.value!.toggle
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
      ><slot :name="name as keyof DateRangePickerSlots" v-bind="scope ?? {}"
    /></template>
    <template v-if="!$slots['trigger']" #trigger
      ><svg
        class="size-4 shrink-0"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1.75"
        aria-hidden="true"
      >
        <path
          d="M8 2v4m8-4v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z"
        /></svg
    ></template>
  </component>
</template>
