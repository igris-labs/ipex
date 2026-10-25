<script setup lang="ts">
import { Stepper as Primitive } from 'akaza-ui'
import { computed, useAttrs, useTemplateRef } from 'vue'

import { cn } from '../../../utils/ui'
import uiConfig from '../ui.config'
import {
  stepperVariants,
  resolveStepperVariants,
  type StepperProps,
  type StepperSlots,
} from './index'

defineOptions({ inheritAttrs: false })
// Preserve Akaza defaults when optional props, including Boolean aliases, are omitted.
const props = withDefaults(defineProps<StepperProps>(), {
  valueKey: undefined,
  titleKey: undefined,
  descriptionKey: undefined,
  disabledKey: undefined,
  completedKey: undefined,
  linear: undefined,
  disabled: undefined,
  loop: undefined,
  orientation: undefined,
  activationMode: undefined,
  showControls: undefined,
  unmountOnHide: undefined,
  dir: undefined,
  ariaLabel: undefined,
  ui: undefined,
  modelValue: undefined,
})
defineSlots<StepperSlots>()
const attrs = useAttrs()
const styles = computed(() => stepperVariants(resolveStepperVariants(props, uiConfig)))
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
  get goToStep() {
    return primitive.value!.goToStep
  },
  get hasNext() {
    return primitive.value!.hasNext
  },
  get hasPrev() {
    return primitive.value!.hasPrev
  },
  get nextStep() {
    return primitive.value!.nextStep
  },
  get prevStep() {
    return primitive.value!.prevStep
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
      ><slot :name="name as keyof StepperSlots" v-bind="scope ?? {}"
    /></template>
  </component>
</template>
