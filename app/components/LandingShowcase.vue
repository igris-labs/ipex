<script setup lang="ts">
import type { CalendarModelValue } from 'akaza-ui'
import { computed, ref } from 'vue'

import LandingWorkbench from './LandingWorkbench.vue'
import { Accordion } from './ui/accordion'
import { Button } from './ui/button'
import { Calendar } from './ui/calendar'
import { Checkbox } from './ui/checkbox'
import { Dialog } from './ui/dialog'
import { Input } from './ui/input'
import { NavigationMenu } from './ui/navigation-menu'
import { Progress } from './ui/progress'
import { Rating } from './ui/rating'
import { Switch } from './ui/switch'
import { TagsInput } from './ui/tags-input'
import { Tree } from './ui/tree'

const search = ref('')
const dialogOpen = ref(false)
const navigation = ref('projects')
const notices = ref({ activity: true, security: true, updates: false })
const preferencesSaved = ref(false)
const selectedDate = ref<CalendarModelValue>()
const rating = ref(4)
const tags = ref(['Design', 'Vue'])
const tasks = ref([
  { label: 'Add the theme', done: true },
  { label: 'Copy the shared utilities', done: true },
  { label: 'Install a component', done: false },
])
const complete = computed(() => tasks.value.filter((task) => task.done).length)
const files = [
  {
    id: 'components',
    label: 'components',
    children: [
      { id: 'button', label: 'Button.vue' },
      { id: 'input', label: 'Input.vue' },
      { id: 'sidebar', label: 'Sidebar.vue' },
    ],
  },
  { id: 'assets', label: 'assets', children: [{ id: 'css', label: 'main.css' }] },
]
const navItems = [
  { type: 'label' as const, label: 'Workspace' },
  { value: 'overview', label: 'Overview', iconName: 'tabler:layout-dashboard' },
  { value: 'projects', label: 'Projects', iconName: 'tabler:folder' },
  { value: 'activity', label: 'Activity', iconName: 'tabler:activity' },
  { type: 'label' as const, label: 'Settings' },
  { value: 'members', label: 'Members', iconName: 'tabler:users' },
  { value: 'preferences', label: 'Preferences', iconName: 'tabler:adjustments' },
]
const card = 'rounded-lg border border-border/60 bg-card p-5 text-card-foreground'
</script>

<template>
  <section
    aria-label="Component examples"
    class="grid items-start gap-5 md:grid-cols-2 xl:grid-cols-4"
    data-testid="landing-showcase"
  >
    <div class="min-w-0 space-y-5">
      <section data-ui :class="card" aria-label="Controls example">
        <div class="flex flex-wrap gap-2">
          <Button size="md" @click="dialogOpen = true">Continue</Button>
          <Button size="md" color="secondary" @click="search = ''">Reset</Button>
          <Button size="md" variant="outline" @click="dialogOpen = true">Preview</Button>
        </div>
        <Input
          v-model="search"
          class="mt-5"
          placeholder="Search components…"
          aria-label="Search example components"
          type="search"
          size="md"
        />
        <p v-if="search" class="mt-3 text-[13px] text-muted-foreground" role="status">
          Searching for {{ search }}
        </p>
        <div class="mt-5 flex items-center justify-between gap-3">
          <span class="text-sm">Receive updates</span>
          <Switch v-model="notices.updates" size="md" aria-label="Receive updates" />
        </div>
      </section>
      <section data-ui :class="card" aria-label="Navigation example">
        <NavigationMenu
          v-model="navigation"
          :items="navItems"
          orientation="vertical"
          content-mode="inline"
          teleport="#teleports"
          highlight-mode="selection-hover"
          size="md"
          aria-label="Example workspace navigation"
          :ui="{
            list: 'flex-col gap-1',
            link: 'w-full justify-start',
            itemLeading: 'size-4',
            inlineLink: 'w-full justify-start',
            inlineList: 'gap-1 border-l-0 pl-0',
            itemLabel: 'text-left',
            groupLabel: 'px-3 pt-4 pb-2 text-xs',
          }"
        >
          <template #item-leading="{ item }"
            ><Icon
              v-if="item.iconName"
              :name="String(item.iconName)"
              class="size-4"
              aria-hidden="true"
          /></template>
        </NavigationMenu>
      </section>
      <section data-ui :class="card">
        <h2 class="text-sm font-semibold">Your experience</h2>
        <p class="mt-1 text-[13px] leading-5 text-muted-foreground">How does the interface feel?</p>
        <Rating v-model="rating" aria-label="Rate this interface" size="md" class="mt-5" />
      </section>
    </div>
    <div class="min-w-0 space-y-5">
      <LandingWorkbench />
      <section data-ui :class="card">
        <h2 class="text-sm font-semibold">Labels</h2>
        <p class="mt-1 text-[13px] leading-5 text-muted-foreground">
          Organize a project with a few labels.
        </p>
        <TagsInput
          v-model="tags"
          placeholder="Add a label…"
          aria-label="Project labels"
          size="md"
          class="mt-5"
        />
      </section>
      <section data-ui :class="card">
        <h2 class="text-sm font-semibold">Questions</h2>
        <Accordion
          class="mt-4"
          size="md"
          :items="[
            {
              value: 'source',
              label: 'Do I own the source?',
              content: 'Yes. Copy the component files into your project and edit them there.',
            },
            {
              value: 'theme',
              label: 'Can I change the theme?',
              content: 'Yes. Set the shared CSS tokens for light and dark themes.',
            },
          ]"
        />
      </section>
    </div>
    <div class="min-w-0 space-y-5">
      <section data-ui :class="card">
        <h2 class="text-sm font-semibold">Notifications</h2>
        <p class="mt-1 text-[13px] leading-5 text-muted-foreground">
          Choose the updates you want to receive.
        </p>
        <div class="mt-5 space-y-5">
          <Switch
            v-model="notices.activity"
            label="Project activity"
            description="Changes to projects you follow."
            size="md"
          />
          <Switch
            v-model="notices.security"
            label="Security alerts"
            description="Sign-ins and account changes."
            size="md"
          />
          <Switch
            v-model="notices.updates"
            label="Product updates"
            description="New components and improvements."
            size="md"
          />
        </div>
        <Button
          class="mt-6 w-full"
          color="secondary"
          variant="soft"
          size="md"
          @click="preferencesSaved = true"
          >Save preferences</Button
        >
        <p v-if="preferencesSaved" role="status" class="mt-3 text-[13px] text-muted-foreground">
          Preferences saved in this example.
        </p>
      </section>
      <section data-ui :class="card">
        <h2 class="text-sm font-semibold">Setup checklist</h2>
        <p class="mt-1 text-[13px] leading-5 text-muted-foreground">
          Prepare your project for IPEX.
        </p>
        <div class="mt-5 space-y-4">
          <Checkbox
            v-for="task in tasks"
            :key="task.label"
            v-model="task.done"
            class="flex w-full"
            :label="task.label"
            size="md"
          />
        </div>
        <div class="mt-6 flex justify-between text-[13px] text-muted-foreground">
          <span>Completed</span><span>{{ complete }} of {{ tasks.length }}</span>
        </div>
        <Progress
          :model-value="(complete / tasks.length) * 100"
          aria-label="Setup progress"
          size="xs"
          class="mt-2"
        />
      </section>
    </div>
    <div class="min-w-0 space-y-5">
      <section data-ui :class="[card, 'flex flex-col']">
        <Calendar
          class="self-center"
          v-model="selectedDate"
          size="md"
          calendar-label="Choose a project date"
          :ui="{ root: 'border-0 p-0 [@media(pointer:coarse)]:p-0' }"
        />
        <p class="mt-4 text-[13px] text-muted-foreground">
          {{ selectedDate ? String(selectedDate) : 'Choose a date for your next project.' }}
        </p>
      </section>
      <section data-ui :class="card">
        <h2 class="text-sm font-semibold">Project files</h2>
        <Tree
          class="mt-4"
          :items="files"
          item-key="id"
          :default-expanded="['components', 'assets']"
          default-value="button"
          size="md"
          aria-label="Example component files"
        />
      </section>
    </div>
  </section>
  <Dialog
    v-model="dialogOpen"
    title="Project preview"
    description="This dialog uses the same IPEX theme as the components on this page."
    width="sm"
  >
    <p class="text-sm leading-6">
      Your component styles, keyboard controls, and focus behavior work together.
    </p>
    <template #footer><Button size="md" @click="dialogOpen = false">Done</Button></template>
  </Dialog>
</template>
