<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'

interface TocLink {
  id: string
  text: string
  depth: number
  children?: TocLink[]
}
const props = defineProps<{ links: TocLink[] }>()
const links = computed(() => props.links.flatMap((link) => [link, ...(link.children ?? [])]))
const active = ref('')
let frame = 0
function update() {
  frame = 0
  const headings = links.value
    .map((link) => document.getElementById(link.id))
    .filter((heading): heading is HTMLElement => Boolean(heading))
  let current = headings[0]
  for (const heading of headings) {
    if (heading.getBoundingClientRect().top <= Math.max(112, window.innerHeight * 0.4))
      current = heading
  }
  if (
    window.scrollY > 0 &&
    window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2
  )
    current = headings.at(-1)
  active.value = current?.id ?? ''
}
function schedule() {
  if (!frame) frame = requestAnimationFrame(update)
}
onMounted(() => {
  window.addEventListener('scroll', schedule, { passive: true })
  window.addEventListener('resize', schedule)
  schedule()
})
onUnmounted(() => {
  window.removeEventListener('scroll', schedule)
  window.removeEventListener('resize', schedule)
  cancelAnimationFrame(frame)
})
watch(links, () => {
  if (import.meta.client) schedule()
})
</script>

<template>
  <aside
    v-if="links.length"
    class="sticky top-16 max-h-[calc(100dvh-4rem)] overflow-y-auto py-1"
    aria-label="On this page"
  >
    <h2 class="mb-3 flex items-center gap-2 text-xs font-medium text-muted-foreground">
      <svg
        class="size-3"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1.75"
        aria-hidden="true"
      >
        <path d="M8 6h12M8 12h12M8 18h12M3 6h.01M3 12h.01M3 18h.01" /></svg
      >On this page
    </h2>
    <nav class="flex max-w-52 flex-col border-l border-border" aria-label="Page sections">
      <a
        v-for="link in links"
        :key="link.id"
        :href="`#${link.id}`"
        :aria-current="active === link.id ? 'location' : undefined"
        class="-ml-px min-h-7 border-l px-3 py-1 text-xs leading-5 outline-none hover:text-highlighted focus-visible:outline-2 focus-visible:outline-ring"
        :class="[
          active === link.id
            ? 'border-foreground text-highlighted'
            : 'border-transparent text-muted-foreground',
          link.depth > 2 ? 'pl-5' : '',
        ]"
        >{{ link.text }}</a
      >
    </nav>
  </aside>
</template>
