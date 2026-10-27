<script setup lang="ts">
import { ref } from 'vue'

import { Button } from './ui/button'
import { Tabs } from './ui/tabs'
import { ToggleGroup } from './ui/toggle-group'

const state = ref('Overview')
const view = ref('preview')
const saved = ref(false)
const principles = [
  {
    id: 'calm',
    title: 'Calm at rest.',
    icon: 'tabler:layout-dashboard',
    description: 'Neutral surfaces and compact controls keep your work easy to scan.',
  },
  {
    id: 'state',
    title: 'Expressive in state.',
    icon: 'tabler:focus-2',
    description: 'Recognize selection, keyboard focus, and feedback at a glance.',
  },
  {
    id: 'tactile',
    title: 'Tactile in control.',
    icon: 'tabler:hand-click',
    description: 'Primary actions have depth and respond when you press them.',
  },
  {
    id: 'motion',
    title: 'Fluid in motion.',
    icon: 'tabler:arrows-right-left',
    description: 'Short transitions connect states and keep changes easy to follow.',
  },
  {
    id: 'space',
    title: 'Focused in space.',
    icon: 'tabler:layout-align-center',
    description: 'Give data room to expand. Keep forms close to the task.',
  },
]
</script>

<template>
  <section class="pb-14 sm:pb-16" aria-labelledby="philosophy-title">
    <h2
      id="philosophy-title"
      class="text-xl leading-7 font-semibold tracking-tight text-highlighted"
    >
      Design philosophy
    </h2>
    <dl class="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <div
        v-for="principle in principles"
        :key="principle.id"
        class="group flex min-w-0 flex-col rounded-xl border border-border/60 bg-muted/20 p-5 sm:p-6"
        :class="principle.id === 'calm' && 'sm:col-span-2'"
      >
        <dt class="flex items-center gap-2 text-[15px] font-semibold text-highlighted">
          <Icon
            :name="principle.icon"
            class="size-[18px] shrink-0 text-muted-foreground"
            aria-hidden="true"
          />
          {{ principle.title }}
        </dt>
        <dd class="mt-2 flex flex-1 flex-col">
          <p class="max-w-lg text-sm leading-6 text-muted-foreground">
            {{ principle.description }}
          </p>
          <div
            data-ui
            class="mt-5 flex min-h-28 flex-1 items-center justify-center overflow-hidden rounded-lg bg-background p-4"
          >
            <div
              v-if="principle.id === 'calm'"
              role="img"
              aria-label="A neutral workspace with aligned navigation and project details"
              class="grid w-full max-w-md grid-cols-[7rem_1fr] gap-4 text-xs"
            >
              <div class="space-y-1 border-r border-border/50 pr-3">
                <p class="px-2 py-1 text-muted-foreground">Workspace</p>
                <p class="rounded-sm bg-secondary px-2 py-1.5 text-secondary-foreground">
                  Overview
                </p>
                <p class="px-2 py-1.5 text-muted-foreground">Projects</p>
              </div>
              <div class="flex flex-col justify-center gap-3">
                <p class="font-medium text-foreground">Project details</p>
                <div class="flex items-center justify-between gap-3">
                  <span class="text-muted-foreground">Name</span><span>IPEX</span>
                </div>
                <div class="flex items-center justify-between gap-3">
                  <span class="text-muted-foreground">Workspace</span><span>Igris Labs</span>
                </div>
              </div>
            </div>
            <div v-else-if="principle.id === 'state'" class="space-y-4">
              <ToggleGroup
                v-model="state"
                :options="[
                  { value: 'Overview', label: 'Overview' },
                  { value: 'Activity', label: 'Activity' },
                ]"
                size="sm"
                aria-label="Selection preview"
              />
              <p class="flex items-center justify-center gap-1.5 text-xs text-success">
                <Icon name="tabler:circle-check" class="size-3.5" aria-hidden="true" />Changes saved
              </p>
            </div>
            <div v-else-if="principle.id === 'tactile'" class="space-y-3 text-center">
              <Button size="md" @click="saved = true">Save changes</Button>
              <p role="status" class="min-h-4 text-xs text-muted-foreground">
                {{ saved ? 'Saved in this example.' : 'Try pressing the button.' }}
              </p>
            </div>
            <div v-else-if="principle.id === 'motion'" class="space-y-3 text-center">
              <Tabs
                v-model="view"
                :items="[
                  { value: 'preview', label: 'Preview' },
                  { value: 'code', label: 'Code' },
                ]"
                aria-label="Motion preview"
                size="sm"
                :ui="{ panels: 'hidden', root: 'w-fit' }"
              />
              <p class="text-xs text-muted-foreground">Switch views to see the indicator move.</p>
            </div>
            <div
              v-else
              role="img"
              aria-label="A focused form centered inside a wider workspace"
              class="flex w-full justify-center rounded-md bg-muted/40 px-6 py-3"
            >
              <div
                class="w-40 rounded-md border border-border/60 bg-background p-3 text-xs transition-transform duration-180 ease-interaction motion-safe:group-hover:scale-[1.02] motion-reduce:transition-none"
              >
                <p class="font-medium">Project name</p>
                <p class="mt-2 rounded-sm border border-input px-2 py-1.5 text-muted-foreground">
                  IPEX workspace
                </p>
              </div>
            </div>
          </div>
        </dd>
      </div>
    </dl>
    <div class="mt-8 rounded-xl bg-muted/40 p-5 sm:p-8">
      <div class="max-w-3xl">
        <h3 class="text-lg font-semibold tracking-tight text-highlighted">
          Built on
          <a
            href="https://akaza-ui.com"
            class="rounded-sm underline underline-offset-4 focus-visible:outline-1 focus-visible:outline-ring"
            >Akaza UI</a
          >
        </h3>
        <p class="mt-3 text-sm leading-6 text-muted-foreground">
          IPEX styles Akaza UI's unstyled Vue components. Akaza provides the interaction and
          accessibility logic; IPEX provides the visual design and component source you copy into
          your project.
        </p>
      </div>
      <div class="mt-6 grid gap-6 sm:grid-cols-2">
        <div>
          <p class="flex items-center gap-2 text-sm font-medium text-highlighted">
            <Icon name="tabler:keyboard" class="size-4" aria-hidden="true" />Akaza UI handles
            behavior
          </p>
          <p class="mt-2 text-sm leading-6 text-muted-foreground">
            Keyboard navigation, focus management, accessible roles, and interaction state.
          </p>
        </div>
        <div>
          <p class="flex items-center gap-2 text-sm font-medium text-highlighted">
            <Icon name="tabler:palette" class="size-4" aria-hidden="true" />IPEX provides styling
          </p>
          <p class="mt-2 text-sm leading-6 text-muted-foreground">
            Tailwind recipes, theme tokens, coordinated sizes, and shared component defaults.
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
