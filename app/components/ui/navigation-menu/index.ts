import type { NavigationMenuProps as PrimitiveNavigationMenuProps } from 'akaza-ui'
import type * as Akaza from 'akaza-ui'
import type { HTMLAttributes } from 'vue'

import { resolveVariants, tv, type VariantProps } from '../../../utils/ui'
import type { UiConfig } from '../ui.types'

export const navigationMenuVariants = tv({
  slots: {
    root: '',
    list: 'flex gap-1',
    item: '',
    trigger:
      'inline-flex shrink-0 items-center justify-center gap-1.5 rounded-md text-muted-foreground transition-colors duration-150 ease-interaction outline-none hover:bg-muted hover:text-highlighted focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 data-akaza-disabled:pointer-events-none data-akaza-disabled:opacity-50 motion-reduce:transition-none [@media(pointer:coarse)]:min-h-11 [@media(pointer:coarse)]:min-w-11',
    link: 'inline-flex shrink-0 items-center justify-center gap-1.5 rounded-md text-muted-foreground transition-colors duration-150 ease-interaction outline-none hover:bg-muted hover:text-highlighted focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 data-akaza-disabled:pointer-events-none data-akaza-disabled:opacity-50 motion-reduce:transition-none [@media(pointer:coarse)]:min-h-11 [@media(pointer:coarse)]:min-w-11',
    indicator: 'bg-foreground',
    content:
      'z-50 max-w-[calc(100vw-2rem)] min-w-40 overflow-hidden rounded-lg border border-border bg-popover p-1 text-popover-foreground shadow-lg motion-reduce:transition-none',
    viewport: 'overflow-hidden',
    panel: 'p-1',
    contentList: 'grid gap-1',
    contentItem: '',
    contentLink:
      'flex items-center gap-2 rounded-md text-left text-foreground transition-colors duration-150 ease-interaction outline-none hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 data-akaza-disabled:pointer-events-none data-akaza-disabled:opacity-50 data-akaza-highlighted:bg-muted data-[akaza-state=checked]:bg-muted data-[akaza-state=checked]:text-foreground motion-reduce:transition-none',
    label: 'font-medium',
    description: 'text-xs leading-5 text-muted-foreground',
    itemLeading: 'flex size-4 shrink-0 items-center justify-center',
    itemLabel: 'min-w-0 flex-1 truncate',
    itemTrailing: 'ml-auto text-xs text-muted-foreground',
    badge: 'rounded bg-muted px-1.5 py-0.5 text-xs',
    childIndicator: 'size-3.5',
    inlineList: 'flex flex-col gap-0.5 border-l border-border pl-3',
    inlineItem: '',
    inlineTrigger:
      'inline-flex w-full shrink-0 items-center justify-center justify-start gap-1.5 rounded-md text-muted-foreground transition-colors duration-150 ease-interaction outline-none hover:bg-muted hover:text-highlighted focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 data-akaza-disabled:pointer-events-none data-akaza-disabled:opacity-50 motion-reduce:transition-none [@media(pointer:coarse)]:min-h-11 [@media(pointer:coarse)]:min-w-11',
    inlineLink:
      'inline-flex w-full shrink-0 items-center justify-center justify-start gap-1.5 rounded-md text-muted-foreground transition-colors duration-150 ease-interaction outline-none hover:bg-muted hover:text-highlighted focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 data-akaza-disabled:pointer-events-none data-akaza-disabled:opacity-50 motion-reduce:transition-none [@media(pointer:coarse)]:min-h-11 [@media(pointer:coarse)]:min-w-11',
    inlineContent: 'overflow-hidden',
    inlineContentInner: 'min-h-0',
    groupLabel: 'px-2 py-2 text-xs font-medium text-muted-foreground',
    separator: 'my-1 h-px bg-border',
    tooltip:
      'z-50 min-w-40 overflow-hidden rounded-lg border border-border bg-popover p-1 px-2 py-1 text-xs text-popover-foreground shadow-lg motion-reduce:transition-none',
  },
  variants: {
    size: {
      xs: {
        trigger:
          'min-h-6 gap-1 rounded-[calc(var(--radius)*0.5)] px-2 py-1 text-xs leading-4 [&_svg]:size-3',
        link: 'min-h-6 gap-1 rounded-[calc(var(--radius)*0.5)] px-2 py-1 text-xs leading-4 [&_svg]:size-3',
        inlineTrigger:
          'min-h-6 gap-1 rounded-[calc(var(--radius)*0.5)] px-2 py-1 text-xs leading-4',
        inlineLink: 'min-h-6 gap-1 rounded-[calc(var(--radius)*0.5)] px-2 py-1 text-xs leading-4',
        contentLink: 'min-h-6 gap-1 rounded-[calc(var(--radius)*0.5)] px-2 py-1 text-xs leading-4',
        childIndicator: 'size-3',
        itemLeading: 'size-3',
      },
      sm: {
        trigger: 'min-h-7 gap-1 rounded-sm px-2.5 py-1 text-[13px] leading-4 [&_svg]:size-3.5',
        link: 'min-h-7 gap-1 rounded-sm px-2.5 py-1 text-[13px] leading-4 [&_svg]:size-3.5',
        inlineTrigger: 'min-h-7 gap-1 rounded-sm px-2.5 py-1 text-[13px] leading-4',
        inlineLink: 'min-h-7 gap-1 rounded-sm px-2.5 py-1 text-[13px] leading-4',
        contentLink: 'min-h-7 gap-1 rounded-sm px-2.5 py-1 text-[13px] leading-4',
        childIndicator: 'size-3.5',
        itemLeading: 'size-3.5',
      },
      md: {
        trigger: 'min-h-8 gap-1.5 rounded-md px-3 py-1 text-sm leading-5 [&_svg]:size-4',
        link: 'min-h-8 gap-1.5 rounded-md px-3 py-1 text-sm leading-5 [&_svg]:size-4',
        inlineTrigger: 'min-h-8 gap-1.5 rounded-md px-3 py-1 text-sm leading-5',
        inlineLink: 'min-h-8 gap-1.5 rounded-md px-3 py-1 text-sm leading-5',
        contentLink: 'min-h-8 gap-1.5 rounded-md px-3 py-1 text-sm leading-5',
        childIndicator: 'size-4',
        itemLeading: 'size-4',
      },
      lg: {
        trigger: 'min-h-9 gap-2 rounded-lg px-3.5 py-1 text-sm leading-5 [&_svg]:size-4.5',
        link: 'min-h-9 gap-2 rounded-lg px-3.5 py-1 text-sm leading-5 [&_svg]:size-4.5',
        inlineTrigger: 'min-h-9 gap-2 rounded-lg px-3.5 py-1 text-sm leading-5',
        inlineLink: 'min-h-9 gap-2 rounded-lg px-3.5 py-1 text-sm leading-5',
        contentLink: 'min-h-9 gap-2 rounded-lg px-3.5 py-1 text-sm leading-5',
        childIndicator: 'size-4.5',
        itemLeading: 'size-4.5',
      },
      xl: {
        trigger:
          'min-h-10 gap-2.5 rounded-[calc(var(--radius)*1.2)] px-4 py-1 text-base leading-6 [&_svg]:size-5',
        link: 'min-h-10 gap-2.5 rounded-[calc(var(--radius)*1.2)] px-4 py-1 text-base leading-6 [&_svg]:size-5',
        inlineTrigger:
          'min-h-10 gap-2.5 rounded-[calc(var(--radius)*1.2)] px-4 py-1 text-base leading-6',
        inlineLink:
          'min-h-10 gap-2.5 rounded-[calc(var(--radius)*1.2)] px-4 py-1 text-base leading-6',
        contentLink:
          'min-h-10 gap-2.5 rounded-[calc(var(--radius)*1.2)] px-4 py-1 text-base leading-6',
        childIndicator: 'size-5',
        itemLeading: 'size-5',
      },
    },
  },
  defaultVariants: {
    size: 'sm',
  },
})
export type NavigationMenuVariants = VariantProps<typeof navigationMenuVariants>
export type NavigationMenuConfig = Pick<NavigationMenuVariants, 'size'>
export type NavigationMenuSlots = Akaza.NavigationMenuSlots
export interface NavigationMenuProps extends Omit<
  PrimitiveNavigationMenuProps,
  'ui' | 'class' | 'size'
> {
  class?: HTMLAttributes['class']
  ui?: Akaza.NavigationMenuUi
  size?: NavigationMenuVariants['size']
  open?: string | null
  expanded?: string[] | undefined
  modelValue?: string | null | undefined
}
export function resolveNavigationMenuVariants(
  props: NavigationMenuVariants,
  config: UiConfig,
): NavigationMenuVariants {
  return resolveVariants(
    props,
    config.components?.navigationMenu,
    config.defaults,
    navigationMenuVariants.variants,
  )
}
export { default as NavigationMenu } from './NavigationMenu.vue'

declare module '../ui.types' {
  interface UiComponentConfig {
    navigationMenu?: NavigationMenuConfig
  }
}
