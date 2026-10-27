<script setup lang="ts">
import type {
  TreeController,
  TreeExpandedChangeEventDetails,
  TreeKey,
  TreeSelection,
} from 'akaza-ui'
import { computed, onBeforeUnmount, ref, useTemplateRef, watch } from 'vue'

import { Button } from '../ui/button'
import { Select } from '../ui/select'
import { Tree, type TreeProps } from '../ui/tree'
import CodeFileIcon from './CodeFileIcon.vue'
import ExampleFrame from './ExampleFrame.vue'

type Item = Record<string, unknown>
const props = withDefaults(
  defineProps<
    Partial<TreeProps<Item>> & {
      example?: 'playground' | 'multiple' | 'lazy' | 'virtual' | 'empty'
    }
  >(),
  {
    example: 'playground',
    selectOnFocus: undefined,
    expandOnClick: undefined,
    disabled: undefined,
    readOnly: undefined,
    typeahead: undefined,
    transition: undefined,
    virtualize: undefined,
  },
)
const files: Item[] = [
  {
    id: 'components',
    label: 'Components',
    children: [
      { id: 'button', label: 'Button.vue' },
      { id: 'input', label: 'Input.vue' },
      {
        id: 'forms',
        label: 'Forms',
        children: [
          { id: 'field', label: 'Field.vue' },
          { id: 'checkbox', label: 'Checkbox.vue' },
        ],
      },
    ],
  },
  {
    id: 'guides',
    label: 'Guides',
    children: [
      { id: 'intro', label: 'Introduction.md' },
      { id: 'styling', label: 'Styling.md' },
    ],
  },
  { id: 'tokens', label: 'tokens.css' },
  { id: 'legacy', label: 'Legacy.vue', disabled: true },
]
const remote = ref<Item[]>([{ id: 'remote', label: 'Remote components', lazy: true }])
const loading = ref<TreeKey[]>([])
const large = Array.from({ length: 1000 }, (_, index) => ({
  id: `file-${index + 1}`,
  label: `component-${String(index + 1).padStart(4, '0')}.vue`,
}))
const virtualSize = ref<TreeProps['size']>('sm')
const sizeOptions = ['xs', 'sm', 'md', 'lg', 'xl'].map((value) => ({ value, label: value }))
const selected = ref<TreeSelection>(
  props.example === 'multiple' ? ['button'] : props.example === 'playground' ? 'button' : null,
)
const controller = useTemplateRef<{
  expandAll: TreeController<Item>['expandAll']
  collapseAll: TreeController<Item>['collapseAll']
}>('controller')
const mode = computed(() =>
  props.example === 'multiple' ? 'multiple' : (props.selectionMode ?? 'single'),
)
watch(
  mode,
  (value) => {
    selected.value =
      value === 'none'
        ? null
        : value === 'multiple'
          ? Array.isArray(selected.value)
            ? selected.value
            : selected.value === null
              ? []
              : [selected.value]
          : Array.isArray(selected.value)
            ? (selected.value[0] ?? null)
            : selected.value
  },
  { immediate: true },
)
const options = computed(() => {
  const { example: _example, ...native } = props
  return {
    ...native,
    items:
      props.example === 'lazy'
        ? remote.value
        : props.example === 'virtual'
          ? large
          : props.example === 'empty'
            ? []
            : (props.items ?? files),
    itemKey: props.itemKey ?? 'id',
    defaultExpanded: props.defaultExpanded ?? ['components', 'forms'],
    selectionMode: mode.value,
    selectionPropagation: props.example === 'multiple' ? 'both' : props.selectionPropagation,
    expandOnClick: props.example === 'multiple' ? false : props.expandOnClick,
    ariaLabel:
      props.ariaLabel ??
      {
        playground: 'Project files',
        multiple: 'Select project files',
        lazy: 'Remote project files',
        virtual: 'Repository files',
        empty: 'Empty project',
      }[props.example],
    loadingKeys: props.example === 'lazy' ? loading.value : props.loadingKeys,
    hasChildren: props.example === 'lazy' ? (item: Item) => item.lazy === true : props.hasChildren,
    virtualize: props.example === 'virtual' ? { height: 240 } : props.virtualize,
    size: props.example === 'virtual' ? virtualSize.value : props.size,
    ui: {
      ...props.ui,
      viewport: ['playground', 'multiple'].includes(props.example)
        ? `h-80 ${props.ui?.viewport ?? ''}`
        : props.ui?.viewport,
    },
  }
})
const selectedKeys = computed(() =>
  selected.value === null ? [] : Array.isArray(selected.value) ? selected.value : [selected.value],
)
const selectionLabel = computed(() => {
  if (!selectedKeys.value.length) return 'No item selected'
  if (mode.value === 'multiple') return `${selectedKeys.value.length} selected`
  const find = (items: readonly Item[]): string | undefined => {
    for (const item of items) {
      if (item.id === selectedKeys.value[0]) return String(item.label)
      if (Array.isArray(item.children)) {
        const label = find(item.children)
        if (label) return label
      }
    }
  }
  return `${find(options.value.items) ?? selectedKeys.value[0]} selected`
})
let loadTimer: number | undefined
function onExpand(_keys: TreeKey[], details: TreeExpandedChangeEventDetails<Item>) {
  if (
    props.example !== 'lazy' ||
    !details.expanded ||
    !details.item.lazy ||
    details.item.children ||
    loading.value.length
  )
    return
  loading.value = [details.key]
  loadTimer = window.setTimeout(() => {
    remote.value = remote.value.map((item) =>
      item.id === details.key
        ? {
            ...item,
            children: [
              { id: 'remote-dialog', label: 'Dialog.vue' },
              { id: 'remote-popover', label: 'Popover.vue' },
            ],
          }
        : item,
    )
    loading.value = []
  }, 750)
}
onBeforeUnmount(() => window.clearTimeout(loadTimer))
</script>

<template>
  <component :is="example === 'playground' ? 'div' : ExampleFrame" class="w-full">
    <div class="mx-auto w-full max-w-sm space-y-3" :data-tree-example="example">
      <div
        v-if="['playground', 'multiple'].includes(example)"
        class="flex flex-wrap items-center gap-1 border-b border-border/50 pb-2"
      >
        <Button size="xs" variant="ghost" :disabled="disabled" @click="controller?.expandAll()"
          >Expand all</Button
        >
        <Button size="xs" variant="ghost" :disabled="disabled" @click="controller?.collapseAll()"
          >Collapse all</Button
        >
        <Button
          size="xs"
          variant="ghost"
          class="ml-auto"
          :disabled="disabled || readOnly || !selectedKeys.length"
          @click="selected = mode === 'multiple' ? [] : null"
          >Clear selection</Button
        >
      </div>
      <div
        v-if="example === 'virtual'"
        class="flex items-center justify-between gap-3 text-xs text-muted-foreground"
      >
        <span>1,000 files</span>
        <Select
          v-model="virtualSize"
          :options="sizeOptions"
          size="xs"
          aria-label="Virtual tree size"
        />
      </div>
      <Tree ref="controller" v-bind="options" v-model="selected" @expanded-change="onExpand">
        <template #icon="{ node }">
          <svg
            v-if="node.isBranch"
            class="size-full"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
          >
            <path
              :d="
                node.isExpanded
                  ? 'M3 7V5a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v2M3 7h6l2 2h10l-2 10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2L1 9h20'
                  : 'M3 7V5a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7Zm0 0h18'
              "
            />
          </svg>
          <CodeFileIcon v-else :filename="node.label" />
        </template>
      </Tree>
      <p
        v-if="example !== 'empty'"
        role="status"
        class="min-h-4 text-xs text-muted-foreground"
        data-testid="tree-selection"
      >
        {{ selectionLabel }}
      </p>
    </div>
  </component>
</template>
