<script setup lang="ts">
defineProps<{ compact?: boolean }>()

const links = [
  {
    title: 'Get started',
    items: [
      { label: 'Introduction', to: '/getting-started/introduction' },
      { label: 'Installation', to: '/getting-started/installation' },
      { label: 'Usage', to: '/getting-started/usage' },
      { label: 'Styling', to: '/getting-started/styling' },
    ],
  },
  {
    title: 'Design system',
    items: [
      { label: 'Principles', to: '/design-system/principles' },
      { label: 'Color', to: '/design-system/color' },
      { label: 'Typography and density', to: '/design-system/typography-and-density' },
      { label: 'Motion and accessibility', to: '/design-system/motion-and-accessibility' },
    ],
  },
  {
    title: 'Build with IPEX',
    items: [
      { label: 'Components', to: '/components/accordion' },
      { label: 'Layouts', to: '/components/app-layout' },
      { label: 'Contribution guidelines', to: '/getting-started/contribution' },
      { label: 'GitHub', to: 'https://github.com/igris-labs/ipex' },
      { label: 'Akaza UI', to: 'https://akaza-ui.com' },
    ],
  },
]
</script>

<template>
  <div
    v-if="compact"
    class="flex flex-wrap items-center justify-between gap-3 text-xs leading-5 text-muted-foreground"
  >
    <span
      >IPEX by
      <a
        href="https://igrislabs.com"
        class="rounded-sm underline underline-offset-4 hover:text-highlighted focus-visible:outline-1 focus-visible:outline-ring"
        >Igris Labs</a
      ></span
    >
    <a
      href="https://github.com/igris-labs/ipex"
      class="rounded-sm underline underline-offset-4 hover:text-highlighted focus-visible:outline-1 focus-visible:outline-ring"
      >GitHub</a
    >
  </div>
  <div
    v-else
    class="mx-auto grid w-full max-w-[90rem] gap-10 px-5 py-12 text-sm sm:px-8 lg:grid-cols-[1.3fr_2fr]"
  >
    <div data-reveal>
      <NuxtLink
        to="/"
        aria-label="IPEX home"
        class="text-[2rem] leading-10 font-semibold tracking-tight text-highlighted hover:text-foreground focus-visible:outline-1 focus-visible:outline-ring"
        >IPEX</NuxtLink
      >
      <p class="mt-3 text-sm leading-6">Igris Platform EXperience</p>
      <p class="mt-2 max-w-64 text-[13px] leading-5 text-muted-foreground">
        The shared design system for Igris Labs applications.
      </p>
      <p class="mt-6 text-[13px] leading-6 text-muted-foreground">
        Built by
        <a
          href="https://rahulv.dev"
          class="rounded-sm underline underline-offset-4 hover:text-highlighted focus-visible:outline-1 focus-visible:outline-ring"
          >Rahul Vashishtha</a
        >
        at
        <a
          href="https://igrislabs.com"
          class="rounded-sm underline underline-offset-4 hover:text-highlighted focus-visible:outline-1 focus-visible:outline-ring"
          >Igris Labs</a
        >.
      </p>
    </div>
    <nav class="grid grid-cols-2 gap-8 sm:grid-cols-3" aria-label="Footer navigation">
      <div v-for="group in links" :key="group.title" data-reveal>
        <p class="mb-3 font-medium text-highlighted">{{ group.title }}</p>
        <ul class="space-y-1">
          <li v-for="item in group.items" :key="item.to">
            <NuxtLink
              :to="item.to"
              class="inline-flex min-h-8 items-center rounded-sm text-[13px] leading-5 text-muted-foreground transition-colors duration-150 hover:text-highlighted focus-visible:outline-1 focus-visible:outline-ring motion-reduce:transition-none pointer-coarse:min-h-11"
              >{{ item.label }}</NuxtLink
            >
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>
