import type { ToolbarProps as PrimitiveToolbarProps } from 'akaza-ui'
import type * as Akaza from 'akaza-ui'
import type { HTMLAttributes } from 'vue'

import { resolveVariants, tv, type VariantProps } from '../../../utils/ui'
import type { UiConfig } from '../ui.types'

export const toolbarVariants = tv({
  slots: {
    root: 'flex flex-wrap items-center gap-1 rounded-lg border border-border bg-background p-1',
    group: 'inline-flex items-center gap-1',
    button:
      'inline-flex shrink-0 items-center justify-center gap-1.5 rounded-md text-muted-foreground transition-colors duration-150 ease-interaction outline-none hover:bg-muted hover:text-highlighted focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 data-akaza-disabled:pointer-events-none data-akaza-disabled:opacity-50 motion-reduce:transition-none [@media(pointer:coarse)]:min-h-11 [@media(pointer:coarse)]:min-w-11',
    link: 'inline-flex shrink-0 items-center justify-center gap-1.5 rounded-md text-muted-foreground transition-colors duration-150 ease-interaction outline-none hover:bg-muted hover:text-highlighted focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 data-akaza-disabled:pointer-events-none data-akaza-disabled:opacity-50 motion-reduce:transition-none [@media(pointer:coarse)]:min-h-11 [@media(pointer:coarse)]:min-w-11',
    input:
      'border border-input bg-background text-foreground shadow-none transition-colors duration-150 ease-interaction outline-none placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive data-akaza-disabled:pointer-events-none data-akaza-disabled:opacity-50 data-akaza-focused:ring-2 data-akaza-focused:ring-ring data-akaza-invalid:border-destructive motion-reduce:transition-none [@media(pointer:coarse)]:min-h-11',
    separator: 'mx-1 h-5 w-px bg-border',
    label: 'px-2 text-xs font-medium text-muted-foreground',
  },
  variants: {
    size: {
      xs: {
        root: 'rounded-[calc(var(--radius)*0.5+4px)]',
        button:
          'min-h-6 gap-1 rounded-[calc(var(--radius)*0.5)] px-2 py-1 text-xs leading-4 [&_svg]:size-3',
        link: 'min-h-6 gap-1 rounded-[calc(var(--radius)*0.5)] px-2 py-1 text-xs leading-4 [&_svg]:size-3',
        input: 'min-h-6 gap-1 rounded-[calc(var(--radius)*0.5)] px-2 py-1 text-xs leading-4',
      },
      sm: {
        root: 'rounded-lg',
        button: 'min-h-7 gap-1 rounded-sm px-2.5 py-1 text-[13px] leading-4 [&_svg]:size-3.5',
        link: 'min-h-7 gap-1 rounded-sm px-2.5 py-1 text-[13px] leading-4 [&_svg]:size-3.5',
        input: 'min-h-7 gap-1 rounded-sm px-2.5 py-1 text-[13px] leading-4',
      },
      md: {
        root: 'rounded-[calc(var(--radius)*0.8+4px)]',
        button: 'min-h-8 gap-1.5 rounded-md px-3 py-1 text-sm leading-5 [&_svg]:size-4',
        link: 'min-h-8 gap-1.5 rounded-md px-3 py-1 text-sm leading-5 [&_svg]:size-4',
        input: 'min-h-8 gap-1.5 rounded-md px-3 py-1 text-sm leading-5',
      },
      lg: {
        root: 'rounded-xl',
        button: 'min-h-9 gap-2 rounded-lg px-3.5 py-1 text-sm leading-5 [&_svg]:size-4.5',
        link: 'min-h-9 gap-2 rounded-lg px-3.5 py-1 text-sm leading-5 [&_svg]:size-4.5',
        input: 'min-h-9 gap-2 rounded-lg px-3.5 py-1 text-sm leading-5',
      },
      xl: {
        root: 'rounded-[calc(var(--radius)*1.2+4px)]',
        button:
          'min-h-10 gap-2.5 rounded-[calc(var(--radius)*1.2)] px-4 py-1 text-base leading-6 [&_svg]:size-5',
        link: 'min-h-10 gap-2.5 rounded-[calc(var(--radius)*1.2)] px-4 py-1 text-base leading-6 [&_svg]:size-5',
        input: 'min-h-10 gap-2.5 rounded-[calc(var(--radius)*1.2)] px-4 py-1 text-base leading-6',
      },
    },
  },
  defaultVariants: {
    size: 'sm',
  },
})
export type ToolbarVariants = VariantProps<typeof toolbarVariants>
export type ToolbarConfig = Pick<ToolbarVariants, 'size'>
export type ToolbarSlots = InstanceType<typeof Akaza.Toolbar>['$slots']
export interface ToolbarProps extends Omit<PrimitiveToolbarProps, 'ui' | 'class' | 'size'> {
  class?: HTMLAttributes['class']
  ui?: Akaza.ToolbarUi
  size?: ToolbarVariants['size']
}
export function resolveToolbarVariants(props: ToolbarVariants, config: UiConfig): ToolbarVariants {
  return resolveVariants(
    props,
    config.components?.toolbar,
    config.defaults,
    toolbarVariants.variants,
  )
}
export { default as Toolbar } from './Toolbar.vue'

declare module '../ui.types' {
  interface UiComponentConfig {
    toolbar?: ToolbarConfig
  }
}
