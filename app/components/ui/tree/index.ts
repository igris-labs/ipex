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
    row: 'group relative flex min-h-8 items-center gap-1 rounded-md hover:bg-muted data-akaza-focused:ring-2 data-akaza-focused:ring-ring data-akaza-selected:bg-info/10',
    indent: 'shrink-0',
    content: 'flex min-w-0 flex-1 items-center gap-2 py-1',
    selection: 'size-4 accent-primary',
    toggle:
      'inline-flex size-5 shrink-0 items-center justify-center gap-1.5 rounded-md text-muted-foreground transition-colors duration-150 ease-interaction outline-none hover:bg-muted hover:text-highlighted focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 data-akaza-disabled:pointer-events-none data-akaza-disabled:opacity-50 motion-reduce:transition-none [@media(pointer:coarse)]:min-h-11 [@media(pointer:coarse)]:min-w-11',
    leafSpacer: 'w-5 shrink-0',
    toggleIcon: 'size-3.5',
    indicator: 'size-4 shrink-0',
    icon: 'size-4 shrink-0 text-muted-foreground',
    text: 'min-w-0 flex-1',
    label: 'truncate',
    trailing: 'ml-auto text-xs text-muted-foreground',
    loading: 'p-3 text-xs text-muted-foreground',
    empty: 'p-4 text-sm text-muted-foreground',
  },
  variants: {
    size: {
      xs: {
        row: 'min-h-6 gap-1 rounded-[calc(var(--radius)*0.5)] px-2 py-1 text-xs leading-4',
        icon: 'size-3',
        toggleIcon: 'size-3',
        toggle: 'size-6',
        leafSpacer: 'w-6',
        selection: 'size-3',
      },
      sm: {
        row: 'min-h-7 gap-1 rounded-sm px-2.5 py-1 text-[13px] leading-4',
        icon: 'size-3.5',
        toggleIcon: 'size-3.5',
        toggle: 'size-7',
        leafSpacer: 'w-7',
        selection: 'size-3.5',
      },
      md: {
        row: 'min-h-8 gap-1.5 rounded-md px-3 py-1 text-sm leading-5',
        icon: 'size-4',
        toggleIcon: 'size-4',
        toggle: 'size-8',
        leafSpacer: 'w-8',
        selection: 'size-4',
      },
      lg: {
        row: 'min-h-9 gap-2 rounded-lg px-3.5 py-1 text-sm leading-5',
        icon: 'size-4.5',
        toggleIcon: 'size-4.5',
        toggle: 'size-9',
        leafSpacer: 'w-9',
        selection: 'size-4.5',
      },
      xl: {
        row: 'min-h-10 gap-2.5 rounded-[calc(var(--radius)*1.2)] px-4 py-1 text-base leading-6',
        icon: 'size-5',
        toggleIcon: 'size-5',
        toggle: 'size-10',
        leafSpacer: 'w-10',
        selection: 'size-5',
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
