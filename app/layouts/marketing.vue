<script setup lang="ts">
import ColorModeButton from '../components/ColorModeButton.vue'
import { AppLayout } from '../components/ui/app-layout'
</script>

<template>
  <AppLayout
    scroll="page"
    sticky-header
    :ui="{
      root: 'min-h-dvh bg-background text-foreground',
      header: 'z-30 h-auto border-b border-border bg-background px-0',
      main: 'min-w-0',
      footer: 'border-t border-border bg-muted p-0',
      skipLink:
        'rounded-md bg-primary px-3 py-2 text-primary-foreground focus:outline-2 focus:outline-ring',
    }"
  >
    <template #header>
      <div
        class="mx-auto flex min-h-18 w-full max-w-[82rem] items-center justify-between gap-6 px-4 sm:px-6"
      >
        <NuxtLink
          to="/"
          aria-label="IPEX home"
          class="text-[1.18rem] font-bold tracking-[-0.055em] text-highlighted focus-visible:outline-2 focus-visible:outline-ring"
          >IPEX</NuxtLink
        >
        <nav
          class="ml-auto flex items-center gap-5 text-xs font-medium text-muted-foreground sm:gap-8"
          aria-label="Main navigation"
        >
          <NuxtLink
            to="/getting-started/introduction"
            class="hover:text-highlighted focus-visible:outline-2 focus-visible:outline-ring"
            >Documentation</NuxtLink
          >
          <NuxtLink
            to="/components/button"
            class="hover:text-highlighted focus-visible:outline-2 focus-visible:outline-ring"
            >Components</NuxtLink
          >
        </nav>
        <ColorModeButton />
      </div>
    </template>
    <slot />
    <template #footer
      ><div
        class="mx-auto flex w-full max-w-[82rem] items-center justify-between gap-4 px-4 py-6 text-xs text-muted-foreground sm:px-6"
      >
        <span>IPEX · Igris Labs</span
        ><NuxtLink
          to="/getting-started/contribution"
          class="underline underline-offset-4 hover:text-highlighted"
          >Contribute</NuxtLink
        >
      </div></template
    >
  </AppLayout>
</template>
