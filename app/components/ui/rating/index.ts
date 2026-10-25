import type { RatingProps as PrimitiveRatingProps } from 'akaza-ui'
import type * as Akaza from 'akaza-ui'
import type { HTMLAttributes } from 'vue'

import { resolveVariants, tv, type VariantProps } from '../../../utils/ui'
import type { UiConfig } from '../ui.types'

export const ratingVariants = tv({
  slots: {
    root: 'inline-flex gap-1',
    hiddenInput: 'sr-only',
    item: 'relative inline-flex text-dimmed outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 data-akaza-disabled:pointer-events-none data-akaza-disabled:opacity-50',
    base: 'text-muted-foreground/40',
    fill: 'text-warning',
    fillIcon: 'size-full',
    radio: 'sr-only',
  },
  variants: {
    size: {
      xs: {
        item: 'size-3',
        base: 'size-full',
        root: 'gap-1',
      },
      sm: {
        item: 'size-3.5',
        base: 'size-full',
        root: 'gap-1',
      },
      md: {
        item: 'size-4',
        base: 'size-full',
        root: 'gap-1.5',
      },
      lg: {
        item: 'size-4.5',
        base: 'size-full',
        root: 'gap-2',
      },
      xl: {
        item: 'size-5',
        base: 'size-full',
        root: 'gap-2.5',
      },
    },
  },
  defaultVariants: {
    size: 'sm',
  },
})
export type RatingVariants = VariantProps<typeof ratingVariants>
export type RatingConfig = Pick<RatingVariants, 'size'>
export type RatingSlots = InstanceType<typeof Akaza.Rating>['$slots']
export interface RatingProps extends Omit<PrimitiveRatingProps, 'ui' | 'class' | 'size'> {
  class?: HTMLAttributes['class']
  ui?: Akaza.RatingUi
  size?: RatingVariants['size']
  modelValue?: number
}
export function resolveRatingVariants(props: RatingVariants, config: UiConfig): RatingVariants {
  return resolveVariants(props, config.components?.rating, config.defaults, ratingVariants.variants)
}
export { default as Rating } from './Rating.vue'

declare module '../ui.types' {
  interface UiComponentConfig {
    rating?: RatingConfig
  }
}
