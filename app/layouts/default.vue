<script setup lang="ts">
import type { ContentNavigationItem } from '@nuxt/content'
import { findPageBreadcrumb } from '@nuxt/content/utils'
import type { SidebarController } from 'akaza-ui'
import { useSidebar } from 'akaza-ui'
import { computed, ref, resolveComponent, useTemplateRef, watch } from 'vue'

import ColorModeButton from '../components/ColorModeButton.vue'
import DocsSearch from '../components/docs/DocsSearch.vue'
import { AppLayout } from '../components/ui/app-layout'
import { Button } from '../components/ui/button'
import { Sidebar, type SidebarItem } from '../components/ui/sidebar'

const route = useRoute()
const searchOpen = ref(false)
const sidebar = useSidebar(useTemplateRef<SidebarController>('navigation'))
watch(
  () => route.path,
  () => sidebar.closeMobile(),
)
const { data: navigation } = await useDocsNavigation()
const link = resolveComponent('NuxtLink')
function menuItems(nodes: ContentNavigationItem[]): SidebarItem[] {
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
        'rounded-md bg-primary px-3 py-2 text-primary-foreground focus:outline-1 focus:outline-offset-1 focus:outline-ring',
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
          class="rounded-sm font-semibold tracking-tight focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-ring"
          >IPEX</NuxtLink
        >
        <NuxtLink
          to="/getting-started/introduction"
          class="border-l border-border pl-2 font-medium text-muted-foreground hover:text-foreground"
          >Docs</NuxtLink
        >
        <Button
          variant="ghost"
          size="sm"
          class="ml-auto size-7 p-0"
          aria-label="Search documentation"
          aria-haspopup="dialog"
          aria-keyshortcuts="Control+K Meta+K"
          title="Search documentation (Ctrl/Cmd+K)"
          @click="searchOpen = true"
        >
          <Icon name="tabler:search" class="size-4" aria-hidden="true" />
        </Button>
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
        navigation-label="Documentation"
        variant="soft"
        :items="items"
        :model-value="route.path"
        breakpoint="(max-width: 1023px)"
        :default-size="240"
        :mobile-size="288"
        :ui="{ root: 'h-[calc(100dvh-3rem)]' }"
      >
        <template #header="{ closeMobile }"
          ><span class="font-semibold">Documentation</span
          ><Button variant="ghost" size="xs" @click="closeMobile">Close</Button></template
        >
        <template #item-leading="{ item }">
          <Icon
            v-if="item.navigationIcon"
            :name="String(item.navigationIcon)"
            class="size-4"
            aria-hidden="true"
          />
        </template>
        <template #footer>
          <NuxtLink to="/" class="inline-flex items-center gap-2 hover:text-highlighted">
            <Icon name="tabler:arrow-up-left" class="size-3.5" aria-hidden="true" /> Igris Labs ·
            IPEX
          </NuxtLink>
        </template>
      </Sidebar>
    </template>
    <slot />
    <DocsSearch v-model:open="searchOpen" />
  </AppLayout>
</template>
