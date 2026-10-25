import type { HoverPreviewCardProps as PrimitiveHoverPreviewCardProps } from 'akaza-ui'
import type * as Akaza from 'akaza-ui'
import type { HTMLAttributes } from 'vue'

import { resolveVariants, tv, type VariantProps } from '../../../utils/ui'
import type { UiConfig } from '../ui.types'

export const hoverPreviewCardVariants = tv({
  slots: {
    root: 'inline-flex',
    trigger:
      'rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
    content:
      'z-50 max-w-[calc(100vw-2rem)] min-w-40 overflow-hidden rounded-lg border border-border bg-popover p-4 text-sm leading-6 text-popover-foreground shadow-lg motion-reduce:transition-none',
    arrow: 'fill-popover stroke-border',
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
export type HoverPreviewCardVariants = VariantProps<typeof hoverPreviewCardVariants>
export type HoverPreviewCardConfig = Pick<HoverPreviewCardVariants, 'width'>
export type HoverPreviewCardSlots = InstanceType<typeof Akaza.HoverPreviewCard>['$slots']
export interface HoverPreviewCardProps extends Omit<
  PrimitiveHoverPreviewCardProps,
  'ui' | 'class' | 'width'
> {
  class?: HTMLAttributes['class']
  ui?: Akaza.HoverPreviewCardUi
  width?: HoverPreviewCardVariants['width']
  modelValue?: boolean
}
export function resolveHoverPreviewCardVariants(
  props: HoverPreviewCardVariants,
  config: UiConfig,
): HoverPreviewCardVariants {
  return resolveVariants(
    props,
    config.components?.hoverPreviewCard,
    config.defaults,
    hoverPreviewCardVariants.variants,
  )
}
export { default as HoverPreviewCard } from './HoverPreviewCard.vue'

declare module '../ui.types' {
  interface UiComponentConfig {
    hoverPreviewCard?: HoverPreviewCardConfig
  }
}
