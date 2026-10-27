<script setup lang="ts">
import { ref } from 'vue'

import BrandLogo from '../components/BrandLogo.vue'
import DocsSearch from '../components/docs/DocsSearch.vue'
import HeaderActions from '../components/HeaderActions.vue'
import SiteFooter from '../components/SiteFooter.vue'
import SiteNavigation from '../components/SiteNavigation.vue'
import { AppLayout } from '../components/ui/app-layout'
import { Button } from '../components/ui/button'
const searchOpen = ref(false)
</script>

<template>
  <AppLayout
    scroll="page"
    sticky-header
    :ui="{
      root: 'min-h-dvh bg-background text-foreground',
      header: 'z-30 h-14 border-0 bg-background px-0',
      main: 'min-w-0',
      footer: 'border-0 bg-muted p-0',
      skipLink:
        'rounded-md bg-primary px-3 py-2 text-primary-foreground focus:outline-1 focus:outline-ring',
    }"
  >
    <template #header>
      <div
        class="mx-auto flex h-full w-full max-w-[90rem] items-center gap-2 px-4 sm:gap-3 sm:px-8"
      >
        <NuxtLink
          to="/"
          aria-label="IPEX home"
          class="mr-auto rounded-sm text-xl font-semibold tracking-tight text-highlighted focus-visible:outline-1 focus-visible:outline-ring md:mr-4"
          ><BrandLogo wordmark class="[&>span]:max-[380px]:hidden"
        /></NuxtLink>
        <SiteNavigation />
        <Button
          variant="soft"
          color="secondary"
          size="md"
          class="ml-auto gap-2 max-lg:size-8 max-lg:p-0 lg:w-56 lg:justify-start"
          :ui="{ content: 'min-w-0 w-full' }"
          aria-label="Search documentation"
          aria-haspopup="dialog"
          aria-keyshortcuts="Control+K Meta+K"
          title="Search documentation (Ctrl/Cmd+K)"
          @click="searchOpen = true"
        >
          <Icon name="tabler:search" class="size-4" aria-hidden="true" />
          <span
            class="hidden min-w-0 truncate text-left text-[13px] text-muted-foreground lg:inline"
            >Search documentation…</span
          >
        </Button>
        <HeaderActions />
      </div>
    </template>
    <slot />
    <DocsSearch v-model:open="searchOpen" />
    <template #footer><SiteFooter /></template>
  </AppLayout>
</template>
