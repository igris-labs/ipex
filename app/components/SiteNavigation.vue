<script setup lang="ts">
import type { ContentNavigationItem } from '@nuxt/content'
import { computed, ref, resolveComponent, watch } from 'vue'

import { NavigationMenu } from './ui/navigation-menu'

const props = defineProps<{ compact?: boolean }>()
const route = useRoute()
const link = resolveComponent('NuxtLink')
const { data: navigation } = await useDocsNavigation()
const open = ref<string | null>(null)
watch(
  () => route.path,
  () => {
    open.value = null
  },
)
function pages(nodes: ContentNavigationItem[]): ContentNavigationItem[] {
  return nodes.flatMap((node) => (node.page === false ? pages(node.children ?? []) : [node]))
}
const firstComponent = computed(
  () =>
    pages(navigation.value?.find((group) => group.path.endsWith('/components'))?.children ?? [])[0]
      ?.path ?? '/components/accordion',
)
const summaries: Record<string, string> = {
  introduction: 'Understand IPEX and its Vue components.',
  installation: 'Add the theme, packages, and shared files.',
  usage: 'Use components and set application defaults.',
  styling: 'Customize tokens and component styles.',
  principles: 'Follow the ideas behind the IPEX interface.',
  color: 'Use neutral structure and clear state colors.',
  'typography-and-density': 'Match type, spacing, and control sizes.',
  layout: 'Choose the right width for the task.',
}
function entry(page: ContentNavigationItem, featured = true) {
  return {
    value: page.path,
    label: page.title,
    description: featured
      ? (summaries[page.path.split('/').at(-1) ?? ''] ??
        (typeof page.description === 'string' ? page.description : undefined))
      : undefined,
    as: link,
    to: page.path,
  }
}
const groups = computed(() =>
  (navigation.value ?? []).map((group) => {
    if (group.path.includes('components'))
      return {
        value: group.path,
        label: 'Components',
        as: link,
        to: firstComponent.value,
        active: route.path.startsWith('/components/'),
      }
    const children = pages(group.children ?? [])
    const gettingStarted = group.path.includes('getting-started')
    const featured = gettingStarted
      ? ['introduction', 'installation', 'usage', 'styling'].flatMap((slug) =>
          children.filter((page) => page.path.endsWith(`/${slug}`)),
        )
      : children.slice(0, 4)
    const remaining = children
      .filter((page) => !featured.includes(page))
      .map((page) => entry(page, false))
    return {
      value: group.path,
      label: gettingStarted ? 'Documentation' : group.title,
      children: [
        ...featured.map((page) => entry(page)),
        ...remaining,
        ...(gettingStarted
          ? [
              { value: 'github', label: 'GitHub', href: 'https://github.com/igris-labs/ipex' },
              { value: 'akaza', label: 'Akaza UI', href: 'https://akaza-ui.com' },
              { value: 'igris', label: 'Igris Labs', href: 'https://igrislabs.com' },
            ]
          : [{ value: 'akaza', label: 'Akaza UI', href: 'https://akaza-ui.com' }]),
      ],
    }
  }),
)
const mobileItems = computed(() => [
  {
    value: 'browse',
    label: 'Menu',
    children: [
      ...pages(
        navigation.value?.find((group) => group.path.includes('getting-started'))?.children ?? [],
      ).map((page) => entry(page, false)),
      { value: 'design', label: 'Design system', as: link, to: '/design-system/principles' },
      { value: 'components', label: 'Components', as: link, to: firstComponent.value },
      { value: 'github', label: 'GitHub', href: 'https://github.com/igris-labs/ipex' },
      { value: 'akaza', label: 'Akaza UI', href: 'https://akaza-ui.com' },
    ],
  },
])
const ui = computed(() => ({
  trigger: props.compact ? 'text-xs leading-4' : 'text-[13px] leading-4',
  link: props.compact ? 'text-xs leading-4' : 'text-[13px] leading-4',
  content: 'rounded-xl border-border/70 bg-background p-2 shadow-lg',
  viewport: 'rounded-lg bg-muted/40',
  panel: 'w-[min(48rem,calc(100vw-3.125rem))] max-w-none p-0',
  contentList:
    'relative isolate grid max-h-[min(32rem,75dvh)] grid-cols-1 gap-1 overflow-y-auto p-2 sm:grid-flow-col sm:grid-cols-3 sm:grid-rows-4 sm:gap-x-6 sm:gap-y-1 sm:p-5 sm:before:pointer-events-none sm:before:absolute sm:before:inset-y-5 sm:before:left-1/3 sm:before:w-px sm:before:bg-border/50 sm:after:pointer-events-none sm:after:absolute sm:after:inset-y-5 sm:after:left-2/3 sm:after:w-px sm:after:bg-border/50',
  contentItem: 'relative z-10 sm:[&:nth-child(-n+4)]:row-span-2',
  contentLink: 'h-full justify-start gap-2 px-3 py-3 text-left text-[13px] leading-5',
  description: 'max-w-none text-[13px] leading-5 text-muted-foreground',
}))
const mobileUi = computed(() => ({
  ...ui.value,
  content: 'rounded-xl border-border/70 bg-background p-2 shadow-lg',
  panel: 'w-[min(22rem,calc(100vw-2rem))] max-w-none p-0',
  contentList: 'grid max-h-[min(32rem,75dvh)] grid-cols-1 gap-1 overflow-y-auto p-2',
  contentItem: '',
  contentLink: 'gap-1 px-3 py-2 text-[13px] leading-5',
}))
</script>

<template>
  <NavigationMenu
    v-model:open="open"
    :items="groups"
    content-mode="flyout"
    teleport="#teleports"
    size="md"
    :side-offset="2"
    :ui="ui"
    aria-label="Main navigation"
    class="hidden md:block"
  />
  <NavigationMenu
    v-model:open="open"
    :items="mobileItems"
    content-mode="flyout"
    teleport="#teleports"
    size="md"
    :side-offset="2"
    :ui="mobileUi"
    aria-label="Main navigation"
    class="md:hidden"
  />
</template>
