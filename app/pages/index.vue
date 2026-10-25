<script setup lang="ts">
import { resolveComponent } from 'vue'

import DocsCode from '../components/content/DocsCode.vue'
import LandingWorkbench from '../components/LandingWorkbench.vue'
import { Button } from '../components/ui/button'

definePageMeta({ layout: 'marketing' })
useSeoMeta({
  title: 'IPEX · Igris Platform EXperience',
  description:
    'The Igris Labs design system for focused product interfaces. Compact structure, tactile controls, clear state, and Vue component source you own.',
})
const nuxtLink = resolveComponent('NuxtLink')
const example = `<Field label="Project name" name="project">
  <Input v-model="name" />
</Field>
<Button @click="createProject">Create project</Button>`
</script>
<template>
  <div class="mx-auto w-full max-w-[82rem] px-4 sm:px-6">
    <section
      class="grid items-center gap-12 py-16 lg:min-h-[38rem] lg:grid-cols-[1.1fr_1fr] lg:gap-20 lg:py-24"
      aria-labelledby="hero-title"
    >
      <div>
        <p class="mb-5 text-sm font-medium text-muted-foreground">Igris Platform EXperience</p>
        <h1
          id="hero-title"
          class="max-w-2xl text-[clamp(2.25rem,5vw,4rem)] leading-[1.08] font-semibold tracking-[-0.055em] text-balance text-highlighted"
        >
          One system for Igris Labs.
        </h1>
        <p class="mt-6 max-w-lg text-base leading-7 text-muted-foreground">
          IPEX defines how Igris Labs applications look and behave, from the width of a workspace to
          the feedback of a control.
        </p>
        <p class="mt-4 max-w-lg text-[15px] leading-7 text-muted-foreground">
          Build focused product interfaces with compact structure, tactile actions, clear states,
          and motion that keeps work continuous.
        </p>
        <div class="mt-8 flex flex-wrap gap-3">
          <Button :as="nuxtLink" to="/getting-started/installation" size="lg">Get started</Button>
          <Button :as="nuxtLink" to="/design-system/principles" variant="outline" size="lg"
            >Explore the system</Button
          >
        </div>
      </div>
      <LandingWorkbench />
    </section>
    <section
      class="grid gap-8 border-t border-border py-12 md:grid-cols-[1fr_2fr] md:gap-16"
      aria-labelledby="experience-title"
    >
      <div>
        <h2 id="experience-title" class="text-xl font-semibold tracking-tight text-highlighted">
          Built around the work
        </h2>
        <p class="mt-4 max-w-xs text-sm leading-6 text-muted-foreground">
          Use the same visual language across operational tools, builders, administration, settings,
          and focused setup.
        </p>
      </div>
      <dl class="divide-y divide-border">
        <div class="grid gap-3 pb-6 sm:grid-cols-[10rem_1fr]">
          <dt class="text-sm font-medium text-highlighted">Quiet structure</dt>
          <dd class="text-[15px] leading-7 text-muted-foreground">
            Keep tables, panels, and fields neutral. Spend visual emphasis on the action or state
            someone needs to recognize.
          </dd>
        </div>
        <div class="grid gap-3 py-6 sm:grid-cols-[10rem_1fr]">
          <dt class="text-sm font-medium text-highlighted">Clear engagement</dt>
          <dd class="text-[15px] leading-7 text-muted-foreground">
            Give execution actions a tactile finish, selected modes a persistent treatment, and
            outcomes an explicit message.
            <NuxtLink
              to="/design-system/materials-and-states"
              class="decoration-border-accent text-foreground underline underline-offset-4 hover:decoration-foreground"
              >Read about material and state.</NuxtLink
            >
          </dd>
        </div>
        <div class="grid gap-3 pt-6 sm:grid-cols-[10rem_1fr]">
          <dt class="text-sm font-medium text-highlighted">Task-shaped space</dt>
          <dd class="text-[15px] leading-7 text-muted-foreground">
            Let record lists use available width. Bring editors and previews together. Keep short
            forms within a controlled reading width.
            <NuxtLink
              to="/design-system/layout"
              class="decoration-border-accent text-foreground underline underline-offset-4 hover:decoration-foreground"
              >Choose a layout.</NuxtLink
            >
          </dd>
        </div>
      </dl>
    </section>
    <section
      class="grid items-start gap-8 border-t border-border py-12 md:grid-cols-[1fr_1.2fr] md:gap-16"
      aria-labelledby="source-title"
    >
      <div>
        <h2 id="source-title" class="text-xl font-semibold tracking-tight text-highlighted">
          Vue components you own
        </h2>
        <p class="mt-4 max-w-lg text-[15px] leading-7 text-muted-foreground">
          Copy the components you need into your application. Akaza UI supplies behavior; IPEX
          supplies Tailwind styling and typed variant recipes. Keep your theme in shared CSS tokens
          and component defaults in
          <code class="font-mono text-[13px] text-foreground">ui.config.ts</code>.
        </p>
        <NuxtLink
          to="/getting-started/introduction"
          class="decoration-border-accent mt-5 inline-flex items-center gap-2 text-sm font-medium text-highlighted underline underline-offset-4 hover:decoration-foreground"
          >Read the introduction<Icon
            name="tabler:arrow-up-right"
            class="size-4"
            aria-hidden="true"
        /></NuxtLink>
      </div>
      <DocsCode :code="example" filename="project-form.vue" class="my-0!" />
    </section>
  </div>
</template>
