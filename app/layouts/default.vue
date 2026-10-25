<script setup lang="ts">
import type { ContentNavigationItem } from '@nuxt/content'
import { findPageBreadcrumb } from '@nuxt/content/utils'
import type { NavigationMenuItem, SidebarController } from 'akaza-ui'
import { useSidebar } from 'akaza-ui'
import { computed, resolveComponent, useTemplateRef, watch } from 'vue'

import ColorModeButton from '../components/ColorModeButton.vue'
import { AppLayout } from '../components/ui/app-layout'
import { Button } from '../components/ui/button'
import { NavigationMenu } from '../components/ui/navigation-menu'
import { Sidebar } from '../components/ui/sidebar'

const navigationLinkClass =
  'flex min-h-7.5 w-full items-center gap-2.5 rounded-md border-0 px-2.5 py-0.5 text-[13px] text-muted-foreground outline-none transition-colors duration-150 hover:bg-foreground/7 hover:text-highlighted focus-visible:ring-2 focus-visible:ring-ring data-akaza-active:bg-foreground/10 data-akaza-active:font-medium data-akaza-active:text-highlighted motion-reduce:transition-none'

const route = useRoute()
const sidebar = useSidebar(useTemplateRef<SidebarController>('navigation'))
watch(
  () => route.path,
  () => sidebar.closeMobile(),
)
const { data: navigation } = await useAsyncData('docs-navigation', () =>
  queryCollectionNavigation('docs', ['navigation']),
)
const link = resolveComponent('NuxtLink')
function menuItems(nodes: ContentNavigationItem[]): NavigationMenuItem[] {
  return nodes.flatMap((node) => [
    node.page === false
      ? { value: node.path, label: node.title, type: 'label' as const }
      : {
          value: node.path,
          label: node.title,
          to: node.path,
          as: link,
          navigationIcon:
            node.navigation && typeof node.navigation === 'object' && 'icon' in node.navigation
              ? node.navigation.icon
              : undefined,
        },
    ...menuItems(node.children ?? []),
  ])
}
const items = computed(() => menuItems(navigation.value ?? []))
const breadcrumb = computed(() =>
  findPageBreadcrumb(navigation.value ?? [], route.path, { current: true }),
)
const currentTitle = computed(() => breadcrumb.value.at(-1)?.title ?? 'Documentation')
const currentCategory = computed(
  () => breadcrumb.value.find((node) => node.page === false)?.title ?? 'Documentation',
)
</script>

<template>
  <AppLayout
    scroll="page"
    sticky-header
    sticky-sides
    :ui="{
      root: 'min-h-dvh bg-background text-foreground',
      header: 'z-20 flex h-12 items-center border-b border-border/60 bg-background px-0',
      left: 'max-lg:w-0',
      main: 'min-w-0 outline-none',
      skipLink:
        'rounded-md bg-primary px-3 py-2 text-primary-foreground focus:outline-2 focus:outline-offset-2 focus:outline-ring',
    }"
  >
    <template #header>
      <div class="flex h-full w-full items-center gap-2 px-3 text-[13px] lg:w-60">
        <Button
          variant="ghost"
          size="sm"
          class="lg:hidden"
          aria-label="Open navigation"
          @click="sidebar.openMobile"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.75"
            aria-hidden="true"
          >
            <path d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </Button>
        <NuxtLink
          to="/"
          class="rounded-sm font-semibold tracking-tight focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
          >IPEX</NuxtLink
        >
        <NuxtLink
          to="/getting-started/introduction"
          class="border-l border-border pl-2 font-medium text-muted-foreground hover:text-foreground"
          >Docs</NuxtLink
        >
      </div>
      <div class="hidden min-w-0 items-center gap-2 px-6 text-xs text-muted-foreground lg:flex">
        <span>{{ currentCategory }}</span>
        <svg
          class="size-3 shrink-0"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.75"
          aria-hidden="true"
        >
          <path d="m9 5 7 7-7 7" /></svg
        ><span class="text-highlighted">{{ currentTitle }}</span>
      </div>
      <div class="mr-3 ml-auto flex items-center gap-1">
        <ColorModeButton />
      </div>
    </template>
    <template #left>
      <Sidebar
        ref="navigation"
        aria-label="Documentation navigation"
        breakpoint="(max-width: 1023px)"
        :default-size="240"
        :mobile-size="288"
        :ui="{
          root: 'h-[calc(100dvh-3rem)]',
          panel: 'border-r border-border/50 bg-background',
          header: 'flex items-center justify-between px-4 py-3 lg:hidden',
          body: 'px-4 py-8',
          footer: 'mx-4 border-t border-border/50 px-2 py-5 text-xs text-muted-foreground',
          mobileOverlay: 'bg-scrim',
          mobileContent: 'border-r border-border bg-background text-foreground shadow-xl',
        }"
      >
        <template #header="{ closeMobile }"
          ><span class="font-semibold">Documentation</span
          ><Button variant="ghost" size="xs" @click="closeMobile">Close</Button></template
        >
        <NavigationMenu
          :items="items"
          :model-value="route.path"
          orientation="vertical"
          content-mode="inline"
          aria-label="Documentation"
          :ui="{
            list: 'flex w-full flex-col items-stretch gap-0 [&>li:has(>.akaza-navigation-menu-group-label):not(:first-child)]:mt-7',
            item: 'w-full [&:has(>a)]:py-0.5',
            link: navigationLinkClass,
            inlineLink: navigationLinkClass,
            groupLabel: 'px-2.5 pb-2 text-xs font-medium text-highlighted',
            itemLeading: 'flex size-4 shrink-0 items-center justify-center text-muted-foreground',
          }"
        >
          <template #item-leading="{ item }">
            <Icon
              v-if="item.navigationIcon"
              :name="String(item.navigationIcon)"
              class="size-4"
              aria-hidden="true"
            />
          </template>
        </NavigationMenu>
        <template #footer>
          <NuxtLink to="/" class="inline-flex items-center gap-2 hover:text-highlighted">
            <Icon name="tabler:arrow-up-left" class="size-3.5" aria-hidden="true" /> Igris Labs ·
            IPEX
          </NuxtLink>
        </template>
      </Sidebar>
    </template>
    <slot />
  </AppLayout>
</template>
