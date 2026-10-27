<script setup lang="ts">
import { ref, watch } from 'vue'

import DocsToc from '../components/docs/DocsToc.vue'
import SiteFooter from '../components/SiteFooter.vue'
import { Button } from '../components/ui/button'

const route = useRoute()
const { data: page } = await useAsyncData(
  () => `docs:${route.path}`,
  () => queryCollection('docs').path(route.path).first(),
)
const { data: adjacent } = await useAsyncData(
  () => `docs-surroundings:${route.path}`,
  () => queryCollectionItemSurroundings('docs', route.path),
)
if (!page.value) throw createError({ statusCode: 404, statusMessage: 'Page not found' })
useSeoMeta({
  title: () => `${page.value?.title} · IPEX`,
  description: () => page.value?.description,
})
const copyStatus = ref('Copy link')
watch(
  () => route.path,
  () => (copyStatus.value = 'Copy link'),
)
async function copyLink() {
  try {
    await navigator.clipboard.writeText(window.location.href)
    copyStatus.value = 'Copied link'
  } catch {
    copyStatus.value = 'Copy failed'
  }
}
</script>

<template>
  <div
    class="grid min-h-[calc(100dvh-3.5rem)] grid-cols-1 xl:-ml-60 xl:w-screen xl:grid-cols-[minmax(0,1fr)_minmax(0,42rem)_minmax(0,1fr)]"
  >
    <div class="hidden xl:block" aria-hidden="true" />
    <article class="min-w-0 px-5 pt-12 pb-24 sm:px-8 xl:px-0">
      <div class="mx-auto max-w-168">
        <header class="mb-10">
          <h1 class="text-[2rem] leading-10 font-semibold tracking-tight text-highlighted">
            {{ page?.title }}
          </h1>
          <p class="mt-3 max-w-150 text-[15px] leading-7 text-muted-foreground">
            {{ page?.description }}
          </p>
          <div class="mt-5 flex items-center gap-2">
            <Button variant="ghost" size="xs" @click="copyLink">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.75"
                aria-hidden="true"
              >
                <path
                  d="m10 13 4-4m-6 7-1 1a4 4 0 0 1-6-6l4-4a4 4 0 0 1 6 0m2 6a4 4 0 0 0 6 0l4-4a4 4 0 0 0-6-6l-1 1"
                />
              </svg>
              {{ copyStatus }}
            </Button>
            <span class="sr-only" role="status">{{
              copyStatus === 'Copy link' ? '' : copyStatus
            }}</span>
          </div>
        </header>
        <ContentRenderer
          v-if="page"
          :value="page"
          class="min-w-0 text-[0.9375rem] leading-7 text-pretty text-foreground"
          data-testid="docs-prose"
        />
        <nav
          class="mt-16 grid gap-3 border-t border-border pt-6 sm:grid-cols-2"
          aria-label="Guide pages"
        >
          <NuxtLink
            v-if="adjacent?.[0]"
            :to="adjacent[0].path"
            class="group flex items-center gap-3 rounded-md border border-border px-4 py-3 text-sm hover:bg-muted focus-visible:outline-1 focus-visible:outline-ring"
          >
            <svg
              class="size-4 shrink-0 text-muted-foreground"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.75"
              aria-hidden="true"
            >
              <path d="m15 5-7 7 7 7" />
            </svg>
            <span class="min-w-0"
              ><span class="block text-xs text-muted-foreground">Previous</span
              ><span class="mt-1 block font-medium text-highlighted">{{
                adjacent[0].title
              }}</span></span
            >
          </NuxtLink>
          <NuxtLink
            v-if="adjacent?.[1]"
            :to="adjacent[1].path"
            class="group flex items-center justify-end gap-3 rounded-md border border-border px-4 py-3 text-right text-sm hover:bg-muted focus-visible:outline-1 focus-visible:outline-ring sm:col-start-2"
          >
            <span class="min-w-0"
              ><span class="block text-xs text-muted-foreground">Next</span
              ><span class="mt-1 block font-medium text-highlighted">{{
                adjacent[1].title
              }}</span></span
            >
            <svg
              class="size-4 shrink-0 text-muted-foreground"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.75"
              aria-hidden="true"
            >
              <path d="m9 5 7 7-7 7" />
            </svg>
          </NuxtLink>
        </nav>
        <footer class="mt-8 border-t border-border/50 pt-4">
          <SiteFooter compact />
        </footer>
      </div>
    </article>
    <div class="hidden min-w-0 pt-12 xl:block xl:pl-24">
      <DocsToc :links="page?.body.toc?.links ?? []" />
    </div>
  </div>
</template>
