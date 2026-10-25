import type { ProgressProps as PrimitiveProgressProps } from 'akaza-ui'
import type * as Akaza from 'akaza-ui'
import type { HTMLAttributes } from 'vue'

import { resolveVariants, tv, type VariantProps } from '../../../utils/ui'
import type { UiConfig } from '../ui.types'

export const progressVariants = tv({
  slots: {
    root: 'w-full overflow-hidden rounded-full bg-muted',
    indicator:
      'h-full w-(--akaza-progress-percentage) rounded-full bg-primary data-[akaza-state=indeterminate]:w-full motion-safe:data-[akaza-state=indeterminate]:animate-pulse motion-reduce:transition-none',
  },
  variants: {
    size: {
      xs: {
        root: 'h-1',
      },
      sm: {
        root: 'h-1.5',
      },
      md: {
        root: 'h-2',
      },
      lg: {
        root: 'h-2.5',
      },
      xl: {
        root: 'h-3',
      },
    },
  },
  defaultVariants: {
    size: 'sm',
  },
})
export type ProgressVariants = VariantProps<typeof progressVariants>
export type ProgressConfig = Pick<ProgressVariants, 'size'>
export type ProgressSlots = InstanceType<typeof Akaza.Progress>['$slots']
export interface ProgressProps extends Omit<PrimitiveProgressProps, 'ui' | 'class' | 'size'> {
  class?: HTMLAttributes['class']
  ui?: Akaza.ProgressUi
  size?: ProgressVariants['size']
  modelValue?: number | null
}
export function resolveProgressVariants(
  props: ProgressVariants,
  config: UiConfig,
): ProgressVariants {
  return resolveVariants(
    props,
    config.components?.progress,
    config.defaults,
    progressVariants.variants,
  )
}
export { default as Progress } from './Progress.vue'

declare module '../ui.types' {
  interface UiComponentConfig {
    progress?: ProgressConfig
  }
}
