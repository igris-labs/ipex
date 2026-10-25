import type { PopoverProps as PrimitivePopoverProps } from 'akaza-ui'
import type * as Akaza from 'akaza-ui'
import type { HTMLAttributes } from 'vue'

import { resolveVariants, tv, type VariantProps } from '../../../utils/ui'
import type { UiConfig } from '../ui.types'

export const popoverVariants = tv({
  slots: {
    root: 'inline-flex',
    content:
      'z-50 max-w-[calc(100vw-2rem)] min-w-40 overflow-hidden rounded-lg border border-border bg-popover p-4 text-popover-foreground shadow-lg motion-reduce:transition-none',
  },
  variants: {
    width: {
      xs: {
        content: 'w-[min(20rem,calc(100vw-2rem))] max-w-none',
      },
      sm: {
        content: 'w-[min(24rem,calc(100vw-2rem))] max-w-none',
      },
      md: {
        content: 'w-[min(32rem,calc(100vw-2rem))] max-w-none',
      },
      lg: {
        content: 'w-[min(40rem,calc(100vw-2rem))] max-w-none',
      },
      xl: {
        content: 'w-[min(48rem,calc(100vw-2rem))] max-w-none',
      },
    },
  },
  defaultVariants: {
    width: 'md',
  },
})
export type PopoverVariants = VariantProps<typeof popoverVariants>
export type PopoverConfig = Pick<PopoverVariants, 'width'>
export type PopoverSlots = InstanceType<typeof Akaza.Popover>['$slots']
export interface PopoverProps extends Omit<PrimitivePopoverProps, 'ui' | 'class' | 'width'> {
  class?: HTMLAttributes['class']
  ui?: Akaza.PopoverUi
  width?: PopoverVariants['width']
  modelValue?: boolean
}
export function resolvePopoverVariants(props: PopoverVariants, config: UiConfig): PopoverVariants {
  return resolveVariants(
    props,
    config.components?.popover,
    config.defaults,
    popoverVariants.variants,
  )
}
export { default as Popover } from './Popover.vue'

declare module '../ui.types' {
  interface UiComponentConfig {
    popover?: PopoverConfig
  }
}
