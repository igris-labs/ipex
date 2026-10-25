import type { SidebarProps as PrimitiveSidebarProps } from 'akaza-ui'
import type * as Akaza from 'akaza-ui'
import type { HTMLAttributes } from 'vue'

import { resolveVariants, tv, type VariantProps } from '../../../utils/ui'
import type { UiConfig } from '../ui.types'

export const sidebarVariants = tv({
  slots: {
    root: 'bg-background text-foreground',
    panel: 'border-r border-border bg-background',
    header: 'flex min-h-12 items-center gap-2 border-b border-border px-3',
    body: 'p-3',
    footer: 'border-t border-border px-3 py-3 text-xs text-muted-foreground',
    resizeHandle: 'w-1 cursor-col-resize hover:bg-info/20 focus-visible:bg-info/20',
    mobileOverlay: 'bg-scrim',
    mobileContent: 'border-r border-border bg-background text-foreground shadow-xl',
    mobileWrapper: '',
  },
  variants: {
    variant: {
      default: {},
      muted: {
        panel: 'bg-muted/40',
      },
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})
export type SidebarVariants = VariantProps<typeof sidebarVariants>
export type SidebarConfig = Pick<SidebarVariants, 'variant'>
export type SidebarSlots = Akaza.SidebarSlots
export interface SidebarProps extends Omit<PrimitiveSidebarProps, 'ui' | 'class' | 'variant'> {
  class?: HTMLAttributes['class']
  ui?: Akaza.SidebarUi
  variant?: SidebarVariants['variant']
  open?: boolean | undefined
  collapsed?: boolean | undefined
  size?: number
}
export function resolveSidebarVariants(props: SidebarVariants, config: UiConfig): SidebarVariants {
  return resolveVariants(
    props,
    config.components?.sidebar,
    config.defaults,
    sidebarVariants.variants,
  )
}
export { default as Sidebar } from './Sidebar.vue'

declare module '../ui.types' {
  interface UiComponentConfig {
    sidebar?: SidebarConfig
  }
}
