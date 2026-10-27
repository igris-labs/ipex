<script setup lang="ts">
import { ref } from 'vue'

import LandingDashboard from './LandingDashboard.vue'
import LandingEmail from './LandingEmail.vue'
import LandingShowcase from './LandingShowcase.vue'
import { Tabs } from './ui/tabs'
const example = ref('components')
</script>

<template>
  <section aria-labelledby="examples-title" data-testid="landing-examples" class="mt-14" data-ui>
    <div class="mb-6">
      <h2 id="examples-title" class="text-2xl font-semibold tracking-tight">
        See what you can build.
      </h2>
      <p class="mt-2 text-sm leading-6 text-muted-foreground">
        Explore the components on their own, or together in an application.
      </p>
    </div>
    <Tabs
      :items="[
        { value: 'components', label: 'Components' },
        { value: 'dashboard', label: 'Dashboard' },
        { value: 'email', label: 'Email app' },
      ]"
      v-model="example"
      :unmount-on-hide="false"
      size="md"
      aria-label="Application examples"
      :ui="{ root: 'gap-6', panels: 'block', panel: 'hidden! data-[akaza-state=active]:block!' }"
    >
      <template #panel-components><LandingShowcase /></template>
      <template #panel-dashboard><LandingDashboard /></template>
      <template #panel-email><LandingEmail /></template>
    </Tabs>
  </section>
</template>
