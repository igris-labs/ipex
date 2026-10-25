<script setup lang="ts">
import { Sidebar as Primitive } from 'akaza-ui'
import { computed, useAttrs, useTemplateRef } from 'vue'

import { cn } from '../../../utils/ui'
import uiConfig from '../ui.config'
import {
  sidebarVariants,
  resolveSidebarVariants,
  type SidebarProps,
  type SidebarSlots,
} from './index'

defineOptions({ inheritAttrs: false })
// Preserve Akaza defaults when optional props, including Boolean aliases, are omitted.
const props = withDefaults(defineProps<SidebarProps>(), {
  as: undefined,
  side: undefined,
  collapsible: undefined,
  defaultOpen: undefined,
  defaultCollapsed: undefined,
  defaultSize: undefined,
  minSize: undefined,
  maxSize: undefined,
  collapsedSize: undefined,
  mobileSize: undefined,
  resizeStep: undefined,
  resizable: undefined,
  transition: undefined,
  mobile: undefined,
  breakpoint: undefined,
  closeOnBackdropClick: undefined,
  closeOnNavigate: undefined,
  swipeToClose: undefined,
  teleport: undefined,
  keyboardShortcut: undefined,
  ariaLabel: undefined,
  resizeAriaLabel: undefined,
  ui: undefined,
  open: undefined,
  collapsed: undefined,
  size: undefined,
})
defineSlots<SidebarSlots>()
const attrs = useAttrs()
const styles = computed(() => sidebarVariants(resolveSidebarVariants(props, uiConfig)))
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
  const { class: _class, ui: _ui, variant: _variant, ...native } = props
  return native
})
const primitive = useTemplateRef<InstanceType<typeof Primitive>>('primitive')
defineExpose({
  get openValue() {
    return primitive.value!.openValue
  },
  get collapsedValue() {
    return primitive.value!.collapsedValue
  },
  get sizeValue() {
    return primitive.value!.sizeValue
  },
  get open() {
    return primitive.value!.open
  },
  get close() {
    return primitive.value!.close
  },
  get openMobile() {
    return primitive.value!.openMobile
  },
  get closeMobile() {
    return primitive.value!.closeMobile
  },
  get toggleMobile() {
    return primitive.value!.toggleMobile
  },
  get toggle() {
    return primitive.value!.toggle
  },
  get expand() {
    return primitive.value!.expand
  },
  get collapse() {
    return primitive.value!.collapse
  },
  get toggleCollapsed() {
    return primitive.value!.toggleCollapsed
  },
  get resetSize() {
    return primitive.value!.resetSize
  },
  get isMobile() {
    return primitive.value!.isMobile
  },
  get state() {
    return primitive.value!.state
  },
})
</script>
<template>
  <component
    :is="Primitive"
    ref="primitive"
    v-bind="{ ...primitiveProps, ...attrs }"
    :ui="mergedUi"
  >
    <template v-for="(_, name) in $slots" #[name]="scope"
      ><slot :name="name as keyof SidebarSlots" v-bind="scope ?? {}"
    /></template>
  </component>
</template>
