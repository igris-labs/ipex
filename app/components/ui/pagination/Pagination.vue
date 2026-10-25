<script setup lang="ts">
import { Pagination as Primitive } from 'akaza-ui'
import { computed, useAttrs, useTemplateRef } from 'vue'

import { cn } from '../../../utils/ui'
import uiConfig from '../ui.config'
import {
  paginationVariants,
  resolvePaginationVariants,
  type PaginationProps,
  type PaginationSlots,
} from './index'

defineOptions({ inheritAttrs: false })
// Preserve Akaza defaults when optional props, including Boolean aliases, are omitted.
const props = withDefaults(defineProps<PaginationProps>(), {
  total: undefined,
  itemsPerPage: undefined,
  siblingCount: undefined,
  showEdges: undefined,
  showFirstLast: undefined,
  showPreviousNext: undefined,
  disabled: undefined,
  ariaLabel: undefined,
  getPageHref: undefined,
  ui: undefined,
  modelValue: undefined,
})
defineSlots<PaginationSlots>()
const attrs = useAttrs()
const styles = computed(() => paginationVariants(resolvePaginationVariants(props, uiConfig)))
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
  get firstPage() {
    return primitive.value!.firstPage
  },
  get goToPage() {
    return primitive.value!.goToPage
  },
  get lastPage() {
    return primitive.value!.lastPage
  },
  get nextPage() {
    return primitive.value!.nextPage
  },
  get pageCount() {
    return primitive.value!.pageCount
  },
  get previousPage() {
    return primitive.value!.previousPage
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
      ><slot :name="name as keyof PaginationSlots" v-bind="scope ?? {}"
    /></template>
  </component>
</template>
