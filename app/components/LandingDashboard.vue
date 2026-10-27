<script setup lang="ts">
import { useSidebar } from 'akaza-ui'
import { computed, ref, useTemplateRef } from 'vue'

import BrandLogo from './BrandLogo.vue'
import { Button } from './ui/button'
import { Dialog } from './ui/dialog'
import { Input } from './ui/input'
import { NavigationMenu } from './ui/navigation-menu'
import { Progress } from './ui/progress'
import { Sidebar } from './ui/sidebar'
import { Tabs } from './ui/tabs'

const view = ref('overview')
const sidebar = useSidebar(useTemplateRef('dashboardSidebar'))
const navigation = [
  { type: 'label' as const, label: 'Workspace' },
  { value: 'overview', label: 'Overview', navigationIcon: 'tabler:layout-dashboard' },
  { value: 'projects', label: 'Projects', navigationIcon: 'tabler:folder' },
  { value: 'activity', label: 'Activity', navigationIcon: 'tabler:activity' },
]
const filter = ref('all')
const query = ref('')
const selected = ref<(typeof projects)[number]>()
const detailOpen = ref(false)
const projects = [
  {
    name: 'IPEX documentation',
    category: 'Design system',
    status: 'In progress',
    done: 18,
    total: 24,
    owner: 'Rahul',
    date: 'Oct 30',
  },
  {
    name: 'Workspace settings',
    category: 'Platform',
    status: 'In review',
    done: 11,
    total: 12,
    owner: 'Maya',
    date: 'Nov 02',
  },
  {
    name: 'Inbox experience',
    category: 'Application',
    status: 'In progress',
    done: 8,
    total: 16,
    owner: 'Arjun',
    date: 'Nov 06',
  },
  {
    name: 'Theme foundations',
    category: 'Design system',
    status: 'Completed',
    done: 14,
    total: 14,
    owner: 'Rahul',
    date: 'Oct 24',
  },
]
const projectByName = Object.fromEntries(projects.map((project) => [project.name, project]))
function projectFor(value: unknown) {
  return projectByName[String(value)]!
}
const shown = computed(() =>
  projects.filter(
    (p) =>
      (filter.value === 'all' || p.status === filter.value) &&
      `${p.name} ${p.owner}`.toLowerCase().includes(query.value.toLowerCase()),
  ),
)
const projectItems = computed(() =>
  shown.value.map((project) => ({
    value: project.name,
    label: project.name,
    project,
    onSelect: () => openProject(project),
  })),
)
const upcomingItems = projects
  .filter((project) => project.status !== 'Completed')
  .map((project) => ({
    value: project.name,
    label: project.name,
    project,
    onSelect: () => openProject(project),
  }))
const done = projects.reduce((sum, p) => sum + p.done, 0)
const total = projects.reduce((sum, p) => sum + p.total, 0)
const weeks = [9, 13, 11, 18, 21, 26]
function openProject(project: (typeof projects)[number]) {
  selected.value = project
  detailOpen.value = true
}
</script>

<template>
  <div
    aria-label="Dashboard example"
    class="overflow-hidden rounded-xl border border-border/70 bg-background"
  >
    <header
      class="flex flex-wrap items-center justify-between gap-3 border-b border-border/60 px-5 py-4"
    >
      <div class="flex items-center gap-3">
        <Button
          size="md"
          shape="icon"
          variant="ghost"
          color="secondary"
          class="lg:hidden"
          aria-label="Open dashboard navigation"
          @click="sidebar.openMobile"
          ><Icon name="tabler:menu-2" class="size-4" /></Button
        ><BrandLogo class="size-5" /><span class="text-sm font-semibold"
          >Igris Labs <span class="ml-2 font-normal text-muted-foreground">/ Workspace</span></span
        >
      </div>
      <span class="text-xs text-muted-foreground">Interactive example · Sample data</span>
    </header>
    <div class="flex min-h-[42rem]">
      <Sidebar
        ref="dashboardSidebar"
        v-model="view"
        :items="navigation"
        variant="soft"
        item-size="sm"
        :default-size="176"
        :min-size="160"
        :resizable="false"
        breakpoint="(max-width: 1023px)"
        teleport="#teleports"
        aria-label="Dashboard navigation"
        navigation-label="Dashboard workspace"
        :ui="{ root: 'self-stretch', body: 'px-3 py-5', footer: 'mx-3 px-2 py-4' }"
        @select="sidebar.closeMobile()"
      >
        <template #header="{ closeMobile }"
          ><span class="text-sm font-medium">Workspace</span
          ><Button
            size="md"
            variant="ghost"
            shape="icon"
            aria-label="Close dashboard navigation"
            @click="closeMobile"
            ><Icon name="tabler:x" class="size-4" /></Button
        ></template>
        <template #item-leading="{ item }"
          ><Icon v-if="item.navigationIcon" :name="String(item.navigationIcon)" class="size-3.5"
        /></template>
        <template #footer
          ><div class="flex items-center gap-2">
            <Icon name="tabler:user-circle" class="size-4" /><span>Rahul · Igris Labs</span>
          </div></template
        >
      </Sidebar>
      <div class="grid min-w-0 flex-1 xl:grid-cols-[1fr_14rem]">
        <div class="min-w-0 space-y-7 p-5 sm:p-7">
          <div>
            <h3 class="text-xl font-semibold tracking-tight">
              {{ view === 'overview' ? 'Overview' : view === 'projects' ? 'Projects' : 'Activity' }}
            </h3>
            <p class="mt-1 text-sm text-muted-foreground">
              Projects, delivery, and the work ahead.
            </p>
          </div>
          <dl v-if="view === 'overview'" class="grid grid-cols-2 gap-5 sm:grid-cols-4">
            <div>
              <dt class="text-xs text-muted-foreground">Projects</dt>
              <dd class="mt-2 text-2xl font-medium tabular-nums">{{ projects.length }}</dd>
            </div>
            <div>
              <dt class="text-xs text-muted-foreground">Tasks completed</dt>
              <dd class="mt-2 text-2xl font-medium tabular-nums">
                {{ done }} <span class="text-sm text-muted-foreground">/ {{ total }}</span>
              </dd>
            </div>
            <div>
              <dt class="text-xs text-muted-foreground">In review</dt>
              <dd class="mt-2 text-2xl font-medium">1</dd>
            </div>
            <div>
              <dt class="text-xs text-muted-foreground">Contributors</dt>
              <dd class="mt-2 text-2xl font-medium">3</dd>
            </div>
          </dl>
          <section
            v-if="view === 'overview'"
            class="rounded-lg bg-muted/40 p-5"
            aria-labelledby="delivery-title"
          >
            <div class="flex items-baseline justify-between gap-3">
              <h4 id="delivery-title" class="text-sm font-medium">Weekly delivery</h4>
              <span class="text-xs text-muted-foreground">Tasks closed · Last 6 weeks</span>
            </div>
            <div
              class="mt-6 grid h-44 grid-cols-6 items-end gap-3 sm:gap-6"
              role="img"
              aria-label="Weekly tasks closed: 9, 13, 11, 18, 21, and 26. Delivery increased over six weeks."
            >
              <div
                v-for="(value, index) in weeks"
                :key="index"
                class="flex h-full flex-col items-center justify-end gap-2"
              >
                <span class="text-xs text-muted-foreground tabular-nums">{{ value }}</span>
                <div
                  class="w-full max-w-12 rounded-t-sm bg-accent/75"
                  :style="{ height: `${(value / 30) * 115}px` }"
                />
                <span class="text-xs text-muted-foreground">{{
                  ['Sep 22', 'Sep 29', 'Oct 6', 'Oct 13', 'Oct 20', 'Oct 27'][index]
                }}</span>
              </div>
            </div>
          </section>
          <section v-if="view !== 'activity'" aria-labelledby="projects-title">
            <div class="mb-4 flex flex-wrap items-center justify-between gap-3">
              <h4 id="projects-title" class="text-base font-medium">Projects</h4>
              <Input
                v-model="query"
                placeholder="Search projects…"
                aria-label="Search dashboard projects"
                size="md"
                class="w-full sm:w-52"
              />
            </div>
            <Tabs
              v-model="filter"
              :items="[
                { value: 'all', label: 'All projects' },
                { value: 'In progress', label: 'In progress' },
                { value: 'Completed', label: 'Completed' },
              ]"
              size="md"
              aria-label="Project status"
            />
            <div class="mt-4">
              <NavigationMenu
                :items="projectItems"
                orientation="vertical"
                content-mode="inline"
                size="md"
                highlight-mode="hover"
                aria-label="Dashboard projects"
                :ui="{
                  list: 'flex-col gap-1',
                  item: 'w-full',
                  link: 'w-full justify-start px-3 py-3 text-left hover:bg-transparent',
                  inlineLink: 'w-full justify-start px-3 py-3 text-left hover:bg-transparent',
                  itemLabel: 'flex w-full flex-wrap items-center gap-x-4 gap-y-2 whitespace-normal',
                  itemTrailing: 'hidden',
                }"
              >
                <template #item-label="{ item }">
                  <span class="min-w-36 flex-1"
                    ><span class="block text-sm font-medium text-foreground">{{
                      projectFor(item.value).name
                    }}</span
                    ><span class="mt-1 block text-xs text-muted-foreground"
                      >{{ projectFor(item.value).category }} ·
                      {{ projectFor(item.value).owner }}</span
                    ></span
                  >
                  <span class="w-24"
                    ><span class="mb-2 block text-xs text-muted-foreground"
                      >{{ projectFor(item.value).done }} of
                      {{ projectFor(item.value).total }} tasks</span
                    ><Progress
                      :model-value="
                        (projectFor(item.value).done / projectFor(item.value).total) * 100
                      "
                      size="sm"
                      aria-label="Project completion"
                  /></span>
                  <span
                    class="w-20 text-right text-xs"
                    :class="
                      projectFor(item.value).status === 'Completed'
                        ? 'text-success'
                        : 'text-muted-foreground'
                    "
                    >{{ projectFor(item.value).status }}</span
                  >
                  <Icon name="tabler:chevron-right" class="size-4 shrink-0 text-muted-foreground" />
                </template>
              </NavigationMenu>
              <p v-if="!shown.length" class="py-8 text-sm text-muted-foreground" role="status">
                No projects match your search.
              </p>
            </div>
          </section>
          <section
            v-if="view === 'activity'"
            class="space-y-6 text-sm"
            aria-label="Workspace activity"
          >
            <p>
              Rahul completed <strong class="font-medium">Theme foundations</strong>.<span
                class="mt-1 block text-xs text-muted-foreground"
                >Today, 10:42</span
              >
            </p>
            <p>
              Maya sent <strong class="font-medium">Workspace settings</strong> for review.<span
                class="mt-1 block text-xs text-muted-foreground"
                >Today, 09:18</span
              >
            </p>
          </section>
        </div>
        <aside class="space-y-7 border-t border-border/60 p-5 sm:p-7 xl:border-t-0 xl:border-l">
          <section>
            <h4 class="text-sm font-medium">Delivery progress</h4>
            <p class="mt-3 text-3xl font-medium tabular-nums">
              {{ Math.round((done / total) * 100) }}%
            </p>
            <Progress
              :model-value="(done / total) * 100"
              class="mt-3"
              size="sm"
              aria-label="Total delivery progress"
            />
            <p class="mt-3 text-xs leading-5 text-muted-foreground">
              {{ total - done }} tasks remain across the workspace.
            </p>
          </section>
          <section>
            <h4 class="text-sm font-medium">Coming up</h4>
            <NavigationMenu
              :items="upcomingItems"
              orientation="vertical"
              content-mode="inline"
              size="sm"
              highlight-mode="hover"
              aria-label="Upcoming projects"
              class="mt-3"
              :ui="{
                list: 'flex-col gap-1',
                link: 'w-full justify-start px-2 py-2 text-left hover:bg-transparent',
                inlineLink: 'w-full justify-start px-2 py-2 text-left hover:bg-transparent',
                itemLabel: 'whitespace-normal',
              }"
              ><template #item-label="{ item }"
                ><span class="block text-xs text-muted-foreground">{{
                  projectFor(item.value).date
                }}</span
                ><span class="mt-1 block text-[13px]">{{ item.label }}</span></template
              ></NavigationMenu
            >
          </section>
          <section>
            <h4 class="text-sm font-medium">Recent activity</h4>
            <p class="mt-4 text-sm leading-6">
              Rahul completed <span class="font-medium">Theme foundations</span>.
            </p>
            <p class="mt-1 text-xs text-muted-foreground">Today, 10:42</p>
            <p class="mt-4 text-sm leading-6">
              Maya sent <span class="font-medium">Workspace settings</span> for review.
            </p>
            <p class="mt-1 text-xs text-muted-foreground">Today, 09:18</p>
          </section>
        </aside>
      </div>
    </div>
    <Dialog
      v-model="detailOpen"
      :title="selected?.name"
      description="Project details"
      teleport="#teleports"
    >
      <template #body
        ><dl v-if="selected" class="space-y-4 text-sm">
          <div class="flex justify-between">
            <dt class="text-muted-foreground">Owner</dt>
            <dd>{{ selected.owner }}</dd>
          </div>
          <div class="flex justify-between">
            <dt class="text-muted-foreground">Status</dt>
            <dd>{{ selected.status }}</dd>
          </div>
          <div class="flex justify-between">
            <dt class="text-muted-foreground">Due</dt>
            <dd>{{ selected.date }}</dd>
          </div>
          <Progress
            :model-value="(selected.done / selected.total) * 100"
            size="md"
            aria-label="Project progress"
          />
          <p>{{ selected.done }} of {{ selected.total }} tasks completed.</p>
          <Button size="md" variant="soft" color="secondary" @click="detailOpen = false"
            >Close details</Button
          >
        </dl></template
      >
    </Dialog>
  </div>
</template>
