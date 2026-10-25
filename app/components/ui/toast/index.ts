import type { ToastProps as PrimitiveToastProps } from 'akaza-ui'
import type * as Akaza from 'akaza-ui'
import type { HTMLAttributes } from 'vue'

import { resolveVariants, tv, type VariantProps } from '../../../utils/ui'
import type { UiConfig } from '../ui.types'

export const toastVariants = tv({
  slots: {
    viewport: 'fixed right-4 bottom-4 z-50 flex w-[min(24rem,calc(100vw-2rem))] flex-col gap-2',
    toast:
      'relative grid gap-1 rounded-lg border border-border bg-popover p-3 text-popover-foreground shadow-lg data-[akaza-type=error]:border-destructive/40 data-[akaza-type=info]:border-info/40 data-[akaza-type=success]:border-success/40 data-[akaza-type=warning]:border-warning/40',
    title: 'pr-6 text-sm font-semibold text-highlighted',
    description: 'text-sm leading-6 text-muted-foreground',
    close:
      'absolute top-2 right-2 inline-flex size-6 shrink-0 items-center justify-center gap-1.5 rounded-md text-muted-foreground transition-colors duration-150 ease-interaction outline-none hover:bg-muted hover:text-highlighted focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 data-akaza-disabled:pointer-events-none data-akaza-disabled:opacity-50 motion-reduce:transition-none [@media(pointer:coarse)]:min-h-11 [@media(pointer:coarse)]:min-w-11',
    action:
      'mt-2 inline-flex shrink-0 items-center justify-center gap-1.5 justify-self-start rounded-md border border-border px-2 py-1 text-xs text-muted-foreground transition-colors duration-150 ease-interaction outline-none hover:bg-muted hover:text-highlighted focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 data-akaza-disabled:pointer-events-none data-akaza-disabled:opacity-50 motion-reduce:transition-none [@media(pointer:coarse)]:min-h-11 [@media(pointer:coarse)]:min-w-11',
  },
  variants: {
    size: {
      xs: {
        toast: 'gap-1 rounded-[calc(var(--radius)*0.5+4px)] p-2 text-xs leading-4',
        title: 'text-xs leading-4',
        description: 'text-xs leading-4',
      },
      sm: {
        toast: 'gap-1 rounded-lg p-2.5 text-[13px] leading-4',
        title: 'text-[13px] leading-5',
        description: 'text-[13px] leading-5',
      },
      md: {
        toast: 'gap-1.5 rounded-[calc(var(--radius)*0.8+4px)] p-3 text-sm leading-5',
        title: 'text-sm leading-5',
        description: 'text-sm leading-5',
      },
      lg: {
        toast: 'gap-2 rounded-xl p-3.5 text-sm leading-5',
        title: 'text-sm leading-6',
        description: 'text-sm leading-6',
      },
      xl: {
        toast: 'gap-2.5 rounded-[calc(var(--radius)*1.2+4px)] p-4 text-base leading-6',
        title: 'text-base leading-6',
        description: 'text-base leading-6',
      },
    },
  },
  defaultVariants: {
    size: 'sm',
  },
})
export type ToastVariants = VariantProps<typeof toastVariants>
export type ToastConfig = Pick<ToastVariants, 'size'>
export type ToastSlots = InstanceType<typeof Akaza.Toast>['$slots']
export interface ToastProps extends Omit<PrimitiveToastProps, 'ui' | 'class' | 'size'> {
  class?: HTMLAttributes['class']
  ui?: Akaza.ToastUi
  size?: ToastVariants['size']
}
export function resolveToastVariants(props: ToastVariants, config: UiConfig): ToastVariants {
  return resolveVariants(props, config.components?.toast, config.defaults, toastVariants.variants)
}
export { default as Toast } from './Toast.vue'

declare module '../ui.types' {
  interface UiComponentConfig {
    toast?: ToastConfig
  }
}
