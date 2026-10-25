<script setup lang="ts" generic="T extends object">
import { Tree as Primitive } from 'akaza-ui'
import type * as Akaza from 'akaza-ui'
import { computed, useAttrs, useTemplateRef } from 'vue'

import { cn } from '../../../utils/ui'
import uiConfig from '../ui.config'
import { treeVariants, resolveTreeVariants, type TreeProps, type TreeSlots } from './index'

defineOptions({ inheritAttrs: false })
// Preserve Akaza defaults when optional props, including Boolean aliases, are omitted.
const props = withDefaults(defineProps<TreeProps<T>>(), {
  labelKey: undefined,
  childrenKey: undefined,
  disabledKey: undefined,
  selectableKey: undefined,
  defaultExpandedKey: undefined,
  slotKey: undefined,
  textValue: undefined,
  hasChildren: undefined,
  defaultValue: undefined,
  defaultExpanded: undefined,
  loadingKeys: undefined,
  selectionMode: undefined,
  selectionBehavior: undefined,
  selectionPropagation: undefined,
  selectionHighlight: undefined,
  selectOnFocus: undefined,
  expandOnClick: undefined,
  disabled: undefined,
  readOnly: undefined,
  typeahead: undefined,
  transition: undefined,
  indent: undefined,
  orientation: undefined,
  dir: undefined,
  virtualize: undefined,
  ariaLabel: undefined,
  ariaLabelledby: undefined,
  ariaDescribedby: undefined,
  labels: undefined,
  as: undefined,
  ui: undefined,
  modelValue: undefined,
  expanded: undefined,
})
defineSlots<TreeSlots<T>>()
const attrs = useAttrs()
const styles = computed(() => treeVariants(resolveTreeVariants(props, uiConfig)))
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
  { tree: Akaza.TreeController<T> } & Pick<
    Akaza.TreeController<T>,
    | 'getNode'
    | 'getItem'
    | 'focus'
    | 'select'
    | 'toggleSelection'
    | 'expand'
    | 'collapse'
    | 'toggleExpanded'
    | 'expandAll'
    | 'collapseAll'
    | 'activate'
  >
>('primitive')
defineExpose({
  get tree() {
    return primitive.value!.tree
  },
  get getNode() {
    return primitive.value!.getNode
  },
  get getItem() {
    return primitive.value!.getItem
  },
  get focus() {
    return primitive.value!.focus
  },
  get select() {
    return primitive.value!.select
  },
  get toggleSelection() {
    return primitive.value!.toggleSelection
  },
  get expand() {
    return primitive.value!.expand
  },
  get collapse() {
    return primitive.value!.collapse
  },
  get toggleExpanded() {
    return primitive.value!.toggleExpanded
  },
  get expandAll() {
    return primitive.value!.expandAll
  },
  get collapseAll() {
    return primitive.value!.collapseAll
  },
  get activate() {
    return primitive.value!.activate
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
    <template v-if="!$slots.toggle" #toggle="{ node }">
      <svg
        :class="mergedUi.toggleIcon"
        :data-akaza-state="node.isExpanded ? 'expanded' : 'collapsed'"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1.75"
        aria-hidden="true"
      >
        <path d="m9 5 7 7-7 7" />
      </svg>
    </template>
    <template v-for="(_, name) in $slots" #[name]="scope"
      ><slot :name="name as keyof TreeSlots<T>" v-bind="scope ?? {}"
    /></template>
  </component>
</template>
