<script setup lang="ts">
import { ref } from 'vue'

import { AppLayout } from '../ui/app-layout'
import { NavigationMenu } from '../ui/navigation-menu'
import ExampleFrame from './ExampleFrame.vue'

defineProps<{ example: 'workspace' | 'inspector' }>()
const section = ref('projects')
</script>

<template>
  <ExampleFrame>
    <AppLayout
      :viewport="false"
      scroll="page"
      :layout="{ header: 'full', footer: 'content' }"
      :ui="{
        root: 'h-64 w-full overflow-hidden rounded-lg border border-border',
        header: 'h-9 text-xs font-medium',
        left: 'w-20 border-r border-border bg-muted/30 sm:w-28',
        right: 'w-24 bg-muted/30 sm:w-32',
      }"
    >
      <template #header>IPEX workspace</template>
      <template #left>
        <NavigationMenu
          orientation="vertical"
          size="xs"
          v-model="section"
          :items="[
            { value: 'projects', label: 'Projects' },
            { value: 'activity', label: 'Activity' },
          ]"
          aria-label="Example workspace"
          class="p-1"
        />
      </template>
      <div class="space-y-3 p-4">
        <h3 class="text-sm font-semibold">
          {{ section === 'projects' ? 'Projects' : 'Activity' }}
        </h3>
        <div class="h-8 rounded-md bg-muted/60" />
        <div class="h-8 rounded-md bg-muted/40" />
      </div>
      <template v-if="example === 'inspector'" #right>
        <aside class="space-y-2 p-3 text-xs">
          <p class="font-medium">Details</p>
          <p class="text-muted-foreground">Project owner</p>
          <p>Igris Labs</p>
        </aside>
      </template>
      <template #footer>2 projects</template>
    </AppLayout>
  </ExampleFrame>
</template>
