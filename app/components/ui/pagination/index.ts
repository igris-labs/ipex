import type { PaginationProps as PrimitivePaginationProps } from 'akaza-ui'
import type * as Akaza from 'akaza-ui'
import type { HTMLAttributes } from 'vue'

import { resolveVariants, tv, type VariantProps } from '../../../utils/ui'
import type { UiConfig } from '../ui.types'

export const paginationVariants = tv({
  slots: {
    root: '',
    list: 'flex items-center gap-1',
    item: '',
    first:
      'inline-flex shrink-0 items-center justify-center gap-1.5 rounded-md text-muted-foreground transition-colors duration-150 ease-interaction outline-none hover:bg-muted hover:text-highlighted focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 data-akaza-disabled:pointer-events-none data-akaza-disabled:opacity-50 motion-reduce:transition-none [@media(pointer:coarse)]:min-h-11 [@media(pointer:coarse)]:min-w-11',
    previous:
      'inline-flex shrink-0 items-center justify-center gap-1.5 rounded-md text-muted-foreground transition-colors duration-150 ease-interaction outline-none hover:bg-muted hover:text-highlighted focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 data-akaza-disabled:pointer-events-none data-akaza-disabled:opacity-50 motion-reduce:transition-none [@media(pointer:coarse)]:min-h-11 [@media(pointer:coarse)]:min-w-11',
    page: 'inline-flex shrink-0 items-center justify-center gap-1.5 rounded-md text-muted-foreground transition-colors duration-150 ease-interaction outline-none hover:bg-muted hover:text-highlighted focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 data-akaza-disabled:pointer-events-none data-akaza-disabled:opacity-50 data-[akaza-state=active]:bg-primary data-[akaza-state=active]:text-primary-foreground motion-reduce:transition-none [@media(pointer:coarse)]:min-h-11 [@media(pointer:coarse)]:min-w-11',
    ellipsis: 'inline-flex items-center justify-center text-muted-foreground',
    next: 'inline-flex shrink-0 items-center justify-center gap-1.5 rounded-md text-muted-foreground transition-colors duration-150 ease-interaction outline-none hover:bg-muted hover:text-highlighted focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 data-akaza-disabled:pointer-events-none data-akaza-disabled:opacity-50 motion-reduce:transition-none [@media(pointer:coarse)]:min-h-11 [@media(pointer:coarse)]:min-w-11',
    last: 'inline-flex shrink-0 items-center justify-center gap-1.5 rounded-md text-muted-foreground transition-colors duration-150 ease-interaction outline-none hover:bg-muted hover:text-highlighted focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 data-akaza-disabled:pointer-events-none data-akaza-disabled:opacity-50 motion-reduce:transition-none [@media(pointer:coarse)]:min-h-11 [@media(pointer:coarse)]:min-w-11',
  },
  variants: {
    size: {
      xs: {
        first: 'min-h-6 gap-1 rounded-[calc(var(--radius)*0.5)] px-2 py-1 text-xs leading-4',
        previous: 'min-h-6 gap-1 rounded-[calc(var(--radius)*0.5)] px-2 py-1 text-xs leading-4',
        page: 'min-h-6 gap-1 rounded-[calc(var(--radius)*0.5)] px-2 py-1 text-xs leading-4',
        next: 'min-h-6 gap-1 rounded-[calc(var(--radius)*0.5)] px-2 py-1 text-xs leading-4',
        last: 'min-h-6 gap-1 rounded-[calc(var(--radius)*0.5)] px-2 py-1 text-xs leading-4',
        ellipsis: 'min-h-6 gap-1 rounded-[calc(var(--radius)*0.5)] px-2 py-1 text-xs leading-4',
      },
      sm: {
        first: 'min-h-7 gap-1 rounded-sm px-2.5 py-1 text-[13px] leading-4',
        previous: 'min-h-7 gap-1 rounded-sm px-2.5 py-1 text-[13px] leading-4',
        page: 'min-h-7 gap-1 rounded-sm px-2.5 py-1 text-[13px] leading-4',
        next: 'min-h-7 gap-1 rounded-sm px-2.5 py-1 text-[13px] leading-4',
        last: 'min-h-7 gap-1 rounded-sm px-2.5 py-1 text-[13px] leading-4',
        ellipsis: 'min-h-7 gap-1 rounded-sm px-2.5 py-1 text-[13px] leading-4',
      },
      md: {
        first: 'min-h-8 gap-1.5 rounded-md px-3 py-1 text-sm leading-5',
        previous: 'min-h-8 gap-1.5 rounded-md px-3 py-1 text-sm leading-5',
        page: 'min-h-8 gap-1.5 rounded-md px-3 py-1 text-sm leading-5',
        next: 'min-h-8 gap-1.5 rounded-md px-3 py-1 text-sm leading-5',
        last: 'min-h-8 gap-1.5 rounded-md px-3 py-1 text-sm leading-5',
        ellipsis: 'min-h-8 gap-1.5 rounded-md px-3 py-1 text-sm leading-5',
      },
      lg: {
        first: 'min-h-9 gap-2 rounded-lg px-3.5 py-1 text-sm leading-5',
        previous: 'min-h-9 gap-2 rounded-lg px-3.5 py-1 text-sm leading-5',
        page: 'min-h-9 gap-2 rounded-lg px-3.5 py-1 text-sm leading-5',
        next: 'min-h-9 gap-2 rounded-lg px-3.5 py-1 text-sm leading-5',
        last: 'min-h-9 gap-2 rounded-lg px-3.5 py-1 text-sm leading-5',
        ellipsis: 'min-h-9 gap-2 rounded-lg px-3.5 py-1 text-sm leading-5',
      },
      xl: {
        first: 'min-h-10 gap-2.5 rounded-[calc(var(--radius)*1.2)] px-4 py-1 text-base leading-6',
        previous:
          'min-h-10 gap-2.5 rounded-[calc(var(--radius)*1.2)] px-4 py-1 text-base leading-6',
        page: 'min-h-10 gap-2.5 rounded-[calc(var(--radius)*1.2)] px-4 py-1 text-base leading-6',
        next: 'min-h-10 gap-2.5 rounded-[calc(var(--radius)*1.2)] px-4 py-1 text-base leading-6',
        last: 'min-h-10 gap-2.5 rounded-[calc(var(--radius)*1.2)] px-4 py-1 text-base leading-6',
        ellipsis:
          'min-h-10 gap-2.5 rounded-[calc(var(--radius)*1.2)] px-4 py-1 text-base leading-6',
      },
    },
  },
  defaultVariants: {
    size: 'sm',
  },
})
export type PaginationVariants = VariantProps<typeof paginationVariants>
export type PaginationConfig = Pick<PaginationVariants, 'size'>
export type PaginationSlots = InstanceType<typeof Akaza.Pagination>['$slots']
export interface PaginationProps extends Omit<PrimitivePaginationProps, 'ui' | 'class' | 'size'> {
  class?: HTMLAttributes['class']
  ui?: Akaza.PaginationUi
  size?: PaginationVariants['size']
  modelValue?: number
}
export function resolvePaginationVariants(
  props: PaginationVariants,
  config: UiConfig,
): PaginationVariants {
  return resolveVariants(
    props,
    config.components?.pagination,
    config.defaults,
    paginationVariants.variants,
  )
}
export { default as Pagination } from './Pagination.vue'

declare module '../ui.types' {
  interface UiComponentConfig {
    pagination?: PaginationConfig
  }
}
