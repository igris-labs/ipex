import type { TagsInputProps as PrimitiveTagsInputProps } from 'akaza-ui'
import type * as Akaza from 'akaza-ui'
import type { HTMLAttributes } from 'vue'

import { resolveVariants, tv, type VariantProps } from '../../../utils/ui'
import type { UiConfig } from '../ui.types'

export const tagsInputVariants = tv({
  slots: {
    root: 'flex flex-wrap items-center gap-1.5 border border-input bg-background text-foreground shadow-none transition-colors duration-150 ease-interaction outline-none placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive data-akaza-disabled:pointer-events-none data-akaza-disabled:opacity-50 data-akaza-focused:ring-2 data-akaza-focused:ring-ring data-akaza-invalid:border-destructive motion-reduce:transition-none [@media(pointer:coarse)]:min-h-11',
    hiddenInput: 'sr-only',
    item: 'inline-flex items-center gap-1 rounded border border-border bg-muted px-1.5 py-0.5 text-xs',
    itemText: 'truncate',
    delete:
      'inline-flex size-4 shrink-0 items-center justify-center gap-1.5 rounded-md text-muted-foreground transition-colors duration-150 ease-interaction outline-none hover:bg-muted hover:text-highlighted focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 data-akaza-disabled:pointer-events-none data-akaza-disabled:opacity-50 motion-reduce:transition-none [@media(pointer:coarse)]:min-h-11 [@media(pointer:coarse)]:min-w-11',
    input: 'min-w-16 flex-1 bg-transparent outline-none placeholder:text-muted-foreground',
    clear:
      'inline-flex size-5 shrink-0 items-center justify-center gap-1.5 rounded-md text-muted-foreground transition-colors duration-150 ease-interaction outline-none hover:bg-muted hover:text-highlighted focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 data-akaza-disabled:pointer-events-none data-akaza-disabled:opacity-50 motion-reduce:transition-none [@media(pointer:coarse)]:min-h-11 [@media(pointer:coarse)]:min-w-11',
  },
  variants: {
    size: {
      xs: {
        root: 'min-h-6 gap-1 rounded-[calc(var(--radius)*0.5)] px-2 text-xs leading-4',
      },
      sm: {
        root: 'min-h-7 gap-1 rounded-sm px-2.5 text-[13px] leading-4',
      },
      md: {
        root: 'min-h-8 gap-1.5 rounded-md px-3 text-sm leading-5',
      },
      lg: {
        root: 'min-h-9 gap-2 rounded-lg px-3.5 text-sm leading-5',
      },
      xl: {
        root: 'min-h-10 gap-2.5 rounded-[calc(var(--radius)*1.2)] px-4 text-base leading-6',
      },
    },
    variant: {
      outline: {
        root: 'border-input bg-background',
      },
      soft: {
        root: 'border-transparent bg-muted',
      },
      bare: {
        root: 'border-transparent bg-transparent focus-visible:ring-0 data-akaza-focused:ring-0',
      },
    },
  },
  defaultVariants: {
    size: 'sm',
    variant: 'outline',
  },
})
export type TagsInputVariants = VariantProps<typeof tagsInputVariants>
export type TagsInputConfig = Pick<TagsInputVariants, 'size' | 'variant'>
export type TagsInputSlots = InstanceType<typeof Akaza.TagsInput>['$slots']
export interface TagsInputProps extends Omit<
  PrimitiveTagsInputProps,
  'ui' | 'class' | 'size' | 'variant'
> {
  class?: HTMLAttributes['class']
  ui?: Akaza.TagsInputUi
  size?: TagsInputVariants['size']
  variant?: TagsInputVariants['variant']
  modelValue?: Akaza.TagsInputValue[]
  input?: string
}
export function resolveTagsInputVariants(
  props: TagsInputVariants,
  config: UiConfig,
): TagsInputVariants {
  return resolveVariants(
    props,
    config.components?.tagsInput,
    config.defaults,
    tagsInputVariants.variants,
  )
}
export { default as TagsInput } from './TagsInput.vue'

declare module '../ui.types' {
  interface UiComponentConfig {
    tagsInput?: TagsInputConfig
  }
}
