import type { DateRangeFieldProps as PrimitiveDateRangeFieldProps } from 'akaza-ui'
import type * as Akaza from 'akaza-ui'
import type { HTMLAttributes } from 'vue'

import { resolveVariants, tv, type VariantProps } from '../../../utils/ui'
import type { UiConfig } from '../ui.types'

export const dateRangeFieldVariants = tv({
  slots: {
    root: 'flex flex-wrap items-center gap-2',
    start: 'min-w-0',
    startField: '',
    separator: 'text-muted-foreground',
    end: 'min-w-0',
    endField: '',
    hiddenInput: 'sr-only',
  },
  variants: {
    size: {
      xs: {
        root: 'gap-1 text-xs leading-4',
      },
      sm: {
        root: 'gap-1 text-[13px] leading-4',
      },
      md: {
        root: 'gap-1.5 text-sm leading-5',
      },
      lg: {
        root: 'gap-2 text-sm leading-5',
      },
      xl: {
        root: 'gap-2.5 text-base leading-6',
      },
    },
  },
  defaultVariants: {
    size: 'sm',
  },
})
export type DateRangeFieldVariants = VariantProps<typeof dateRangeFieldVariants>
export type DateRangeFieldConfig = Pick<DateRangeFieldVariants, 'size'>
export type DateRangeFieldSlots = InstanceType<typeof Akaza.DateRangeField>['$slots']
export interface DateRangeFieldProps extends Omit<
  PrimitiveDateRangeFieldProps,
  'ui' | 'class' | 'size'
> {
  class?: HTMLAttributes['class']
  ui?: Akaza.DateRangeFieldUi
  size?: DateRangeFieldVariants['size']
  modelValue?: Akaza.CalendarDateRange
}
export function resolveDateRangeFieldVariants(
  props: DateRangeFieldVariants,
  config: UiConfig,
): DateRangeFieldVariants {
  return resolveVariants(
    props,
    config.components?.dateRangeField,
    config.defaults,
    dateRangeFieldVariants.variants,
  )
}
export { default as DateRangeField } from './DateRangeField.vue'

declare module '../ui.types' {
  interface UiComponentConfig {
    dateRangeField?: DateRangeFieldConfig
  }
}
