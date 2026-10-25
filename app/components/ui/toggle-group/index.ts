import type { ToggleGroupProps as PrimitiveToggleGroupProps } from 'akaza-ui'
import type * as Akaza from 'akaza-ui'
import type { HTMLAttributes } from 'vue'

import { resolveVariants, tv, type VariantProps } from '../../../utils/ui'
import type { UiConfig } from '../ui.types'

export const toggleGroupVariants = tv({
  slots: {
    root: 'inline-flex flex-wrap gap-1 rounded-lg bg-muted p-1',
    input: 'sr-only',
    item: 'inline-flex shrink-0 items-center justify-center gap-1.5 rounded-md border border-transparent text-muted-foreground transition-colors duration-150 ease-interaction outline-none hover:bg-muted hover:text-highlighted focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 data-akaza-disabled:pointer-events-none data-akaza-disabled:opacity-50 data-[akaza-state=on]:border-primary data-[akaza-state=on]:bg-linear-to-b data-[akaza-state=on]:from-primary/85 data-[akaza-state=on]:to-primary data-[akaza-state=on]:text-primary-foreground data-[akaza-state=on]:shadow-[0_1px_2px_oklch(0_0_0/0.14),inset_0_1px_0_oklch(1_0_0/0.14)] motion-reduce:transition-none [@media(pointer:coarse)]:min-h-11 [@media(pointer:coarse)]:min-w-11',
    label: 'font-medium',
    description: 'text-xs text-muted-foreground',
  },
  variants: {
    size: {
      xs: {
        root: 'rounded-[calc(var(--radius)*0.5+4px)]',
        item: 'min-h-6 gap-1 rounded-[calc(var(--radius)*0.5)] px-2 py-1 text-xs leading-4',
      },
      sm: {
        root: 'rounded-lg',
        item: 'min-h-7 gap-1 rounded-sm px-2.5 py-1 text-[13px] leading-4',
      },
      md: {
        root: 'rounded-[calc(var(--radius)*0.8+4px)]',
        item: 'min-h-8 gap-1.5 rounded-md px-3 py-1 text-sm leading-5',
      },
      lg: {
        root: 'rounded-xl',
        item: 'min-h-9 gap-2 rounded-lg px-3.5 py-1 text-sm leading-5',
      },
      xl: {
        root: 'rounded-[calc(var(--radius)*1.2+4px)]',
        item: 'min-h-10 gap-2.5 rounded-[calc(var(--radius)*1.2)] px-4 py-1 text-base leading-6',
      },
    },
    variant: {
      soft: {},
      outline: {
        item: 'border border-input',
      },
    },
  },
  defaultVariants: {
    size: 'sm',
    variant: 'soft',
  },
})
export type ToggleGroupVariants = VariantProps<typeof toggleGroupVariants>
export type ToggleGroupConfig = Pick<ToggleGroupVariants, 'size' | 'variant'>
export type ToggleGroupSlots = InstanceType<typeof Akaza.ToggleGroup>['$slots']
export interface ToggleGroupProps extends Omit<
  PrimitiveToggleGroupProps,
  'ui' | 'class' | 'size' | 'variant'
> {
  class?: HTMLAttributes['class']
  ui?: Akaza.ToggleGroupUi
  size?: ToggleGroupVariants['size']
  variant?: ToggleGroupVariants['variant']
  modelValue?: Akaza.ToggleGroupModel
}
export function resolveToggleGroupVariants(
  props: ToggleGroupVariants,
  config: UiConfig,
): ToggleGroupVariants {
  return resolveVariants(
    props,
    config.components?.toggleGroup,
    config.defaults,
    toggleGroupVariants.variants,
  )
}
export { default as ToggleGroup } from './ToggleGroup.vue'

declare module '../ui.types' {
  interface UiComponentConfig {
    toggleGroup?: ToggleGroupConfig
  }
}
