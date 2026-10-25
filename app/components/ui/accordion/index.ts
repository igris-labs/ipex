import type { AccordionProps as PrimitiveAccordionProps } from 'akaza-ui'
import type * as Akaza from 'akaza-ui'
import type { HTMLAttributes } from 'vue'

import { resolveVariants, tv, type VariantProps } from '../../../utils/ui'
import type { UiConfig } from '../ui.types'

export const accordionVariants = tv({
  slots: {
    root: 'w-full divide-y divide-border',
    item: 'group',
    trigger:
      'flex w-full items-center justify-between gap-3 text-left font-medium text-highlighted transition-colors duration-150 ease-interaction outline-none hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 data-akaza-disabled:pointer-events-none data-akaza-disabled:opacity-50 motion-reduce:transition-none',
    icon: 'size-4 shrink-0 text-muted-foreground transition-transform duration-150 group-data-[akaza-state=open]:rotate-180 motion-reduce:transition-none',
    contentWrapper: 'overflow-hidden',
    contentInner: 'min-h-0',
    content: 'pb-4 leading-6 text-muted-foreground',
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
export type AccordionVariants = VariantProps<typeof accordionVariants>
export type AccordionConfig = Pick<AccordionVariants, 'size'>
export type AccordionSlots = InstanceType<typeof Akaza.Accordion>['$slots']
export interface AccordionProps extends Omit<PrimitiveAccordionProps, 'ui' | 'class' | 'size'> {
  class?: HTMLAttributes['class']
  ui?: Akaza.AccordionUi
  size?: AccordionVariants['size']
  modelValue?: string | string[]
}
export function resolveAccordionVariants(
  props: AccordionVariants,
  config: UiConfig,
): AccordionVariants {
  return resolveVariants(
    props,
    config.components?.accordion,
    config.defaults,
    accordionVariants.variants,
  )
}
export { default as Accordion } from './Accordion.vue'

declare module '../ui.types' {
  interface UiComponentConfig {
    accordion?: AccordionConfig
  }
}
