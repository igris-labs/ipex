import type { TreeProps as PrimitiveTreeProps } from 'akaza-ui'
import type * as Akaza from 'akaza-ui'
import type { HTMLAttributes } from 'vue'

import { resolveVariants, tv, type VariantProps } from '../../../utils/ui'
import type { UiConfig } from '../ui.types'

export const treeVariants = tv({
  slots: {
    root: 'w-full text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
    viewport: 'max-h-96 overflow-auto',
    virtualWrapper: '',
    item: '',
    row: 'group relative flex cursor-pointer items-center gap-0 rounded-md transition-colors duration-150 ease-interaction select-none hover:bg-muted/50 data-akaza-disabled:opacity-50 motion-reduce:transition-none pointer-coarse:min-h-11 pointer-coarse:[--tree-toggle-size:2.75rem]',
    indent: 'shrink-0',
    content: 'flex min-w-0 flex-1 items-center gap-(--tree-gap) self-stretch rounded-[inherit]',
    selection:
      'data-akaza-focused:ring-2 data-akaza-focused:ring-ring data-akaza-selected:bg-info/10',
    toggle:
      'inline-flex size-(--tree-toggle-size) shrink-0 cursor-pointer items-center justify-center rounded-sm text-muted-foreground transition-colors duration-150 ease-interaction outline-none select-none hover:bg-foreground/5 hover:text-highlighted focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 motion-reduce:transition-none',
    leafSpacer: 'h-0 min-h-0 w-[calc(var(--tree-toggle-size)+var(--tree-gap))] shrink-0',
    toggleIcon:
      'size-(--tree-icon-size) shrink-0 rotate-0 transform-none transition-transform duration-150 ease-interaction data-[akaza-state=expanded]:rotate-90 motion-reduce:transition-none rtl:rotate-180 rtl:data-[akaza-state=expanded]:rotate-90',
    indicator: 'size-(--tree-icon-size) shrink-0',
    icon: 'size-(--tree-icon-size) shrink-0 text-muted-foreground',
    text: 'min-w-0 flex-1',
    label: 'truncate',
    trailing: 'ml-auto text-xs text-muted-foreground',
    loading: 'p-3 text-xs text-muted-foreground',
    empty: 'p-4 text-sm text-muted-foreground',
  },
  variants: {
    size: {
      xs: {
        row: 'min-h-6 rounded-[calc(var(--radius)*0.5)] px-2 text-xs leading-4 [--tree-gap:.25rem] [--tree-icon-size:.75rem] [--tree-toggle-size:.75rem]',
      },
      sm: {
        row: 'min-h-7 rounded-sm px-2.5 text-[13px] leading-4 [--tree-gap:.25rem] [--tree-icon-size:.875rem] [--tree-toggle-size:.875rem]',
      },
      md: {
        row: 'min-h-8 rounded-md px-3 text-sm leading-5 [--tree-gap:.375rem] [--tree-icon-size:1rem] [--tree-toggle-size:1rem]',
      },
      lg: {
        row: 'min-h-9 rounded-lg px-3.5 text-sm leading-5 [--tree-gap:.5rem] [--tree-icon-size:1.125rem] [--tree-toggle-size:1.125rem]',
      },
      xl: {
        row: 'min-h-10 rounded-[calc(var(--radius)*1.2)] px-4 text-base leading-6 [--tree-gap:.625rem] [--tree-icon-size:1.25rem] [--tree-toggle-size:1.25rem]',
      },
    },
  },
  defaultVariants: {
    size: 'sm',
  },
})
export type TreeVariants = VariantProps<typeof treeVariants>
export type TreeConfig = Pick<TreeVariants, 'size'>
export type TreeSlots<T extends object = Record<string, unknown>> = Akaza.TreeSlots<T>
export interface TreeProps<T extends object = Record<string, unknown>> extends Omit<
  PrimitiveTreeProps<T>,
  'ui' | 'class' | 'size'
> {
  class?: HTMLAttributes['class']
  ui?: Akaza.TreeUi
  size?: TreeVariants['size']
  modelValue?: Akaza.TreeSelection
  expanded?: Akaza.TreeKey[]
  'onUpdate:modelValue'?: (value: Akaza.TreeSelection) => void
  onActivate?: (item: T, details: Akaza.TreeChangeEventDetails<T>) => void
  'onUpdate:expanded'?: (value: Akaza.TreeKey[]) => void
  'onSelection-change'?: (
    value: Akaza.TreeSelection,
    details: Akaza.TreeChangeEventDetails<T>,
  ) => void
  'onExpanded-change'?: (
    value: Akaza.TreeKey[],
    details: Akaza.TreeExpandedChangeEventDetails<T>,
  ) => void
  'onFocus-change'?: (value: Akaza.TreeKey, details: Akaza.TreeChangeEventDetails<T>) => void
}
export function resolveTreeVariants(props: TreeVariants, config: UiConfig): TreeVariants {
  return resolveVariants(props, config.components?.tree, config.defaults, treeVariants.variants)
}
export { default as Tree } from './Tree.vue'

declare module '../ui.types' {
  interface UiComponentConfig {
    tree?: TreeConfig
  }
}
