import type { CollapsibleProps as PrimitiveCollapsibleProps } from 'akaza-ui'
import type * as Akaza from 'akaza-ui'
import type { HTMLAttributes } from 'vue'

import { resolveVariants, tv, type VariantProps } from '../../../utils/ui'
import type { UiConfig } from '../ui.types'

export const collapsibleVariants = tv({
  slots: {
    root: 'w-full',
    trigger:
      'group flex w-full items-center justify-between gap-2 text-left font-medium text-highlighted transition-colors duration-150 ease-interaction outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 data-akaza-disabled:pointer-events-none data-akaza-disabled:opacity-50 motion-reduce:transition-none',
    icon: 'size-4 shrink-0 text-muted-foreground transition-transform group-data-[akaza-state=open]:rotate-180 motion-reduce:transition-none',
    contentWrapper: 'overflow-hidden',
    contentInner: 'min-h-0',
    content: 'pt-3 text-muted-foreground',
  },
  variants: {
    size: {
      xs: {
        trigger: 'rounded-[calc(var(--radius)*0.5)] py-2 text-xs leading-4',
        icon: 'size-3',
      },
      sm: {
        trigger: 'rounded-sm py-2.5 text-[13px] leading-4',
        icon: 'size-3.5',
      },
      md: {
        trigger: 'rounded-md py-3 text-sm leading-5',
        icon: 'size-4',
      },
      lg: {
        trigger: 'rounded-lg py-3.5 text-sm leading-5',
        icon: 'size-4.5',
      },
      xl: {
        trigger: 'rounded-[calc(var(--radius)*1.2)] py-4 text-base leading-6',
        icon: 'size-5',
      },
    },
  },
  defaultVariants: {
    size: 'sm',
  },
})
export type CollapsibleVariants = VariantProps<typeof collapsibleVariants>
export type CollapsibleConfig = Pick<CollapsibleVariants, 'size'>
export type CollapsibleSlots = InstanceType<typeof Akaza.Collapsible>['$slots']
export interface CollapsibleProps extends Omit<PrimitiveCollapsibleProps, 'ui' | 'class' | 'size'> {
  class?: HTMLAttributes['class']
  ui?: Akaza.CollapsibleUi
  size?: CollapsibleVariants['size']
  modelValue?: boolean
}
export function resolveCollapsibleVariants(
  props: CollapsibleVariants,
  config: UiConfig,
): CollapsibleVariants {
  return resolveVariants(
    props,
    config.components?.collapsible,
    config.defaults,
    collapsibleVariants.variants,
  )
}
export { default as Collapsible } from './Collapsible.vue'

declare module '../ui.types' {
  interface UiComponentConfig {
    collapsible?: CollapsibleConfig
  }
}
