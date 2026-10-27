<script setup lang="ts">
import { resolveComponent } from 'vue'

import LandingPhilosophy from '../components/LandingPhilosophy.vue'
import LandingShowcase from '../components/LandingShowcase.vue'
import { Button } from '../components/ui/button'

definePageMeta({ layout: 'marketing' })
useSeoMeta({
  title: 'IPEX · Igris Platform EXperience',
  description:
    'The Igris Labs design system. Accessible Vue components built with Akaza UI and Tailwind CSS, with source code you can customize.',
})
const link = resolveComponent('NuxtLink')
</script>

<template>
  <div class="mx-auto w-full max-w-[90rem] px-5 pb-16 sm:px-8">
    <section
      class="mx-auto flex max-w-4xl flex-col items-center pt-14 pb-14 text-center sm:pt-20 sm:pb-20"
      aria-labelledby="hero-title"
    >
      <h1
        id="hero-title"
        class="text-[clamp(2rem,3.5vw,3rem)] leading-[1.08] font-semibold tracking-[-0.045em] text-balance text-highlighted"
      >
        Build your app with IPEX
      </h1>
      <p class="mt-5 max-w-2xl text-base leading-7 text-pretty text-foreground sm:text-lg">
        A Vue design system from Igris Labs. Accessible components built with Akaza UI and Tailwind
        CSS, with source you can customize.
      </p>
      <div class="mt-7 flex flex-wrap justify-center gap-3" data-ui>
        <Button :as="link" to="/getting-started/installation" size="md">Get started</Button>
        <Button :as="link" to="/components/accordion" color="secondary" variant="soft" size="md"
          >View components</Button
        >
      </div>
    </section>
    <LandingPhilosophy />
    <LandingShowcase />
  </div>
</template>
