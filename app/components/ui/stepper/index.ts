import type { StepperProps as PrimitiveStepperProps } from 'akaza-ui'
import type * as Akaza from 'akaza-ui'
import type { HTMLAttributes } from 'vue'

import { resolveVariants, tv, type VariantProps } from '../../../utils/ui'
import type { UiConfig } from '../ui.types'

export const stepperVariants = tv({
  slots: {
    root: 'flex flex-col gap-4',
    list: 'flex items-start gap-3',
    item: 'flex min-w-0 flex-1 items-center gap-2',
    trigger:
      'flex items-center gap-2 rounded-md text-left outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 data-akaza-disabled:pointer-events-none data-akaza-disabled:opacity-50',
    indicator:
      'inline-flex shrink-0 items-center justify-center rounded-full border border-border bg-muted font-medium data-[akaza-state=active]:border-primary data-[akaza-state=active]:bg-primary data-[akaza-state=active]:text-primary-foreground',
    text: 'flex min-w-0 flex-col gap-0.5',
    title: 'text-sm font-medium text-foreground',
    description: 'text-xs leading-5 text-muted-foreground',
    optional: 'text-xs text-dimmed',
    separator: 'h-px min-w-3 flex-1 bg-border',
    panels: '',
    panel: 'py-2',
    controls: 'flex items-center justify-between gap-2',
    previous:
      'inline-flex shrink-0 items-center justify-center gap-1.5 rounded-md text-muted-foreground transition-colors duration-150 ease-interaction outline-none hover:bg-muted hover:text-highlighted focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 data-akaza-disabled:pointer-events-none data-akaza-disabled:opacity-50 motion-reduce:transition-none [@media(pointer:coarse)]:min-h-11 [@media(pointer:coarse)]:min-w-11',
    next: 'inline-flex shrink-0 items-center justify-center gap-1.5 rounded-md bg-primary text-muted-foreground text-primary-foreground transition-colors duration-150 ease-interaction outline-none hover:bg-muted hover:text-highlighted focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 data-akaza-disabled:pointer-events-none data-akaza-disabled:opacity-50 motion-reduce:transition-none [@media(pointer:coarse)]:min-h-11 [@media(pointer:coarse)]:min-w-11',
  },
  variants: {
    size: {
      xs: {
        previous: 'min-h-6 gap-1 rounded-[calc(var(--radius)*0.5)] px-2 py-1 text-xs leading-4',
        next: 'min-h-6 gap-1 rounded-[calc(var(--radius)*0.5)] px-2 py-1 text-xs leading-4',
        trigger: 'min-h-6 gap-1 rounded-[calc(var(--radius)*0.5)] px-2 py-1 text-xs leading-4',
        indicator: 'size-6 text-xs leading-4',
        title: 'text-xs leading-4',
        list: 'gap-1',
        item: 'gap-1',
      },
      sm: {
        previous: 'min-h-7 gap-1 rounded-sm px-2.5 py-1 text-[13px] leading-4',
        next: 'min-h-7 gap-1 rounded-sm px-2.5 py-1 text-[13px] leading-4',
        trigger: 'min-h-7 gap-1 gap-1.5 rounded-sm px-2.5 py-1 text-[13px] leading-4',
        indicator: 'size-7 text-[13px] leading-4',
        title: 'text-[13px] leading-4',
        list: 'gap-1.5',
        item: 'gap-1.5',
      },
      md: {
        previous: 'min-h-8 gap-1.5 rounded-md px-3 py-1 text-sm leading-5',
        next: 'min-h-8 gap-1.5 rounded-md px-3 py-1 text-sm leading-5',
        trigger: 'min-h-8 gap-1.5 gap-2 rounded-md px-3 py-1 text-sm leading-5',
        indicator: 'size-8 text-sm leading-5',
        title: 'text-sm leading-5',
        list: 'gap-2',
        item: 'gap-2',
      },
      lg: {
        previous: 'min-h-9 gap-2 rounded-lg px-3.5 py-1 text-sm leading-5',
        next: 'min-h-9 gap-2 rounded-lg px-3.5 py-1 text-sm leading-5',
        trigger: 'min-h-9 gap-2 gap-2.5 rounded-lg px-3.5 py-1 text-sm leading-5',
        indicator: 'size-9 text-sm leading-5',
        title: 'text-sm leading-5',
        list: 'gap-2.5',
        item: 'gap-2.5',
      },
      xl: {
        previous:
          'min-h-10 gap-2.5 rounded-[calc(var(--radius)*1.2)] px-4 py-1 text-base leading-6',
        next: 'min-h-10 gap-2.5 rounded-[calc(var(--radius)*1.2)] px-4 py-1 text-base leading-6',
        trigger:
          'min-h-10 gap-2.5 gap-3 rounded-[calc(var(--radius)*1.2)] px-4 py-1 text-base leading-6',
        indicator: 'size-10 text-base leading-6',
        title: 'text-base leading-6',
        list: 'gap-3',
        item: 'gap-3',
      },
    },
  },
  defaultVariants: {
    size: 'sm',
  },
})
export type StepperVariants = VariantProps<typeof stepperVariants>
export type StepperConfig = Pick<StepperVariants, 'size'>
export type StepperSlots = InstanceType<typeof Akaza.Stepper>['$slots']
export interface StepperProps extends Omit<PrimitiveStepperProps, 'ui' | 'class' | 'size'> {
  class?: HTMLAttributes['class']
  ui?: Akaza.StepperUi
  size?: StepperVariants['size']
  modelValue?: Akaza.StepperValue
}
export function resolveStepperVariants(props: StepperVariants, config: UiConfig): StepperVariants {
  return resolveVariants(
    props,
    config.components?.stepper,
    config.defaults,
    stepperVariants.variants,
  )
}
export { default as Stepper } from './Stepper.vue'

declare module '../ui.types' {
  interface UiComponentConfig {
    stepper?: StepperConfig
  }
}
