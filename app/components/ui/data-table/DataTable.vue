<script setup lang="ts" generic="T extends object">
import { DataTable as Primitive } from 'akaza-ui'
import type * as Akaza from 'akaza-ui'
import { computed, useAttrs, useTemplateRef } from 'vue'

import { cn } from '../../../utils/ui'
import uiConfig from '../ui.config'
import {
  dataTableVariants,
  resolveDataTableVariants,
  type DataTableProps,
  type DataTableSlots,
} from './index'

defineOptions({ inheritAttrs: false })
// Preserve Akaza defaults when optional props, including Boolean aliases, are omitted.
const props = withDefaults(defineProps<DataTableProps<T>>(), {
  caption: undefined,
  ariaLabel: undefined,
  ariaLabelledby: undefined,
  ariaDescribedby: undefined,
  loading: undefined,
  error: undefined,
  emptyLabel: undefined,
  errorLabel: undefined,
  sortingMode: undefined,
  manualSorting: undefined,
  manualFiltering: undefined,
  paginate: undefined,
  manualPagination: undefined,
  rowCount: undefined,
  showPagination: undefined,
  selectionMode: undefined,
  selectionBehavior: undefined,
  selectAllScope: undefined,
  isRowSelectable: undefined,
  isRowExpandable: undefined,
  getSubRows: undefined,
  columnResize: undefined,
  columnReorder: undefined,
  rowReorder: undefined,
  stickyHeader: undefined,
  dir: undefined,
  labels: undefined,
  rowAttrs: undefined,
  ui: undefined,
  selection: undefined,
  sorting: undefined,
  filters: undefined,
  globalFilter: undefined,
  pagination: undefined,
  expanded: undefined,
  columnVisibility: undefined,
  columnOrder: undefined,
  columnSizing: undefined,
  columnPinning: undefined,
  rowOrder: undefined,
})
defineSlots<DataTableSlots<T>>()
const attrs = useAttrs()
const styles = computed(() => dataTableVariants(resolveDataTableVariants(props, uiConfig)))
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
const primitive = useTemplateRef<
  { table: Akaza.DataTableController<T> } & Pick<
    Akaza.DataTableController<T>,
    | 'getColumn'
    | 'getRow'
    | 'reset'
    | 'clearFilter'
    | 'setFilter'
    | 'setGlobalFilter'
    | 'setPage'
    | 'setPageSize'
  >
>('primitive')
defineExpose({
  get table() {
    return primitive.value!.table
  },
  get getColumn() {
    return primitive.value!.getColumn
  },
  get getRow() {
    return primitive.value!.getRow
  },
  get reset() {
    return primitive.value!.reset
  },
  get clearFilter() {
    return primitive.value!.clearFilter
  },
  get setFilter() {
    return primitive.value!.setFilter
  },
  get setGlobalFilter() {
    return primitive.value!.setGlobalFilter
  },
  get setPage() {
    return primitive.value!.setPage
  },
  get setPageSize() {
    return primitive.value!.setPageSize
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
      ><slot :name="name as keyof DataTableSlots<T>" v-bind="scope ?? {}"
    /></template>
  </component>
</template>
