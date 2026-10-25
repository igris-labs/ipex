<script setup lang="ts">
import { NavigationMenu as Primitive } from 'akaza-ui'
import type { AkazaChangeEventDetails } from 'akaza-ui'
import {
  computed,
  nextTick,
  onBeforeUnmount,
  onMounted,
  ref,
  useAttrs,
  useTemplateRef,
  watch,
} from 'vue'

import { cn } from '../../../utils/ui'
import uiConfig from '../ui.config'
import {
  navigationMenuVariants,
  resolveNavigationMenuVariants,
  type NavigationMenuProps,
  type NavigationMenuSlots,
} from './index'

defineOptions({ inheritAttrs: false })
// Preserve Akaza defaults when optional props, including Boolean aliases, are omitted.
const props = withDefaults(defineProps<NavigationMenuProps>(), {
  defaultValue: undefined,
  orientation: undefined,
  contentMode: undefined,
  collapsed: undefined,
  tooltip: undefined,
  defaultExpanded: undefined,
  loop: undefined,
  dir: undefined,
  disabled: undefined,
  openDelay: undefined,
  closeDelay: undefined,
  sideOffset: 2,
  teleport: undefined,
  ariaLabel: undefined,
  ui: undefined,
  open: undefined,
  expanded: undefined,
  modelValue: undefined,
})
defineSlots<NavigationMenuSlots>()
const emit = defineEmits<{
  'update:open': [value: string | null]
  'open-change': [value: string | null, details: AkazaChangeEventDetails]
}>()
const localOpen = ref(props.open ?? null)
const openValue = computed(() => (props.open === undefined ? localOpen.value : props.open))
function updateOpen(value: string | null) {
  localOpen.value = value
  emit('update:open', value)
  void nextTick(restoreHighlight)
}
const primitive = useTemplateRef<InstanceType<typeof Primitive>>('primitive')
let hovered: HTMLElement | null = null
function navigationList(): HTMLElement | null {
  return primitive.value?.$el?.querySelector(':scope > .akaza-navigation-menu-list') ?? null
}
function highlight(target: HTMLElement | null) {
  const list = navigationList()
  if (!list) return
  if (!target) {
    list.style.setProperty('--nav-opacity', '0')
    return
  }
  const bounds = list.getBoundingClientRect()
  const box = target.getBoundingClientRect()
  const radius = getComputedStyle(target).borderRadius
  list.dataset.ipexHighlightActive = String(target.hasAttribute('data-akaza-active'))
  list.style.setProperty('--nav-x', `${box.left - bounds.left + list.scrollLeft}px`)
  list.style.setProperty('--nav-y', `${box.top - bounds.top + list.scrollTop}px`)
  list.style.setProperty('--nav-width', `${box.width}px`)
  list.style.setProperty('--nav-height', `${box.height}px`)
  list.style.setProperty('--nav-radius', radius)
  list.style.setProperty('--nav-opacity', '1')
}
function restoreHighlight() {
  const list = navigationList()
  highlight(
    hovered?.isConnected
      ? hovered
      : (list?.querySelector<HTMLElement>('[aria-expanded="true"]') ??
          list?.querySelector<HTMLElement>('.akaza-navigation-menu-link[data-akaza-active]') ??
          null),
  )
}
function onControlHover(event: PointerEvent | FocusEvent) {
  const target =
    event.target instanceof Element
      ? event.target.closest<HTMLElement>(
          '.akaza-navigation-menu-trigger, .akaza-navigation-menu-link',
        )
      : null
  if (!target || !navigationList()?.contains(target) || target.hasAttribute('data-akaza-disabled'))
    return
  hovered = target
  highlight(target)
  if (
    target.classList.contains('akaza-navigation-menu-link') &&
    openValue.value &&
    !props.collapsed
  ) {
    let canceled = false
    emit('open-change', null, {
      reason: 'hover',
      event,
      cancel: () => {
        canceled = true
      },
    })
    if (!canceled) updateOpen(null)
  }
}
function onNativeOpenChange(value: string | null, details: AkazaChangeEventDetails) {
  // Akaza leaves a pending hover-open timer running when the next item has no children.
  if (
    value &&
    details.reason === 'hover' &&
    hovered?.classList.contains('akaza-navigation-menu-link') &&
    !props.collapsed
  ) {
    details.cancel()
    return
  }
  emit('open-change', value, details)
}
function onControlLeave() {
  hovered = null
  restoreHighlight()
}
let observer: ResizeObserver | undefined
onBeforeUnmount(() => observer?.disconnect())
watch(
  () => [props.size, props.orientation, props.items, props.open, props.modelValue],
  () => {
    void nextTick(restoreHighlight)
  },
  { flush: 'post' },
)
onMounted(() => {
  restoreHighlight()
  observer = new ResizeObserver(restoreHighlight)
  if (primitive.value?.$el instanceof HTMLElement) observer.observe(primitive.value.$el)
})
const attrs = useAttrs()
const styles = computed(() =>
  navigationMenuVariants(resolveNavigationMenuVariants(props, uiConfig)),
)
const mergedUi = computed(() => {
  const overrides = props.ui as Record<string, string | undefined> | undefined
  return Object.fromEntries(
    Object.entries(styles.value).map(([part, style]) => [
      part,
      cn(style(), overrides?.[part], part === 'root' ? props.class : undefined),
    ]),
  )
})
const primitiveProps = computed(() => {
  const { class: _class, ui: _ui, size: _size, ...native } = props
  return native
})
</script>
<template>
  <component
    :is="Primitive"
    ref="primitive"
    v-bind="{ ...primitiveProps, ...attrs }"
    :ui="mergedUi"
    :open="openValue"
    @update:open="updateOpen"
    @open-change="onNativeOpenChange"
    @pointerover="onControlHover"
    @focusin="onControlHover"
    @pointerleave="onControlLeave"
  >
    <template v-if="!$slots['child-indicator']" #child-indicator>
      <svg
        class="size-full"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        aria-hidden="true"
      >
        <path d="m6 9 6 6 6-6" />
      </svg>
    </template>
    <template v-for="(_, name) in $slots" #[name]="scope"
      ><slot :name="name as keyof NavigationMenuSlots" v-bind="scope ?? {}"
    /></template>
  </component>
</template>
