<script setup lang="ts">
import { ref } from 'vue'

import type { ButtonVariants } from '../ui/button'
import { Button } from '../ui/button'
import DocsCode from './DocsCode.vue'

const props = withDefaults(defineProps<{ example?: string }>(), { example: 'preview' })
const variants: NonNullable<ButtonVariants['variant']>[] = [
  'solid',
  'soft',
  'subtle',
  'outline',
  'ghost',
  'link',
]
const colors: NonNullable<ButtonVariants['color']>[] = [
  'primary',
  'secondary',
  'accent',
  'info',
  'success',
  'warning',
  'destructive',
]
const sizes: NonNullable<ButtonVariants['size']>[] = ['xs', 'sm', 'md', 'lg', 'xl']
const clicks = ref(0)
const completed = ref(false)
async function demoSave() {
  completed.value = false
  await new Promise((resolve) => setTimeout(resolve, 1000))
  completed.value = true
}
const selectedVariant = ref<NonNullable<ButtonVariants['variant']>>('solid')
const previewCode = '<Button @click="createProject">Create project</Button>'
</script>

<template>
  <div
    data-ui
    class="my-6 min-w-0 overflow-hidden rounded-lg border border-border/60 bg-background"
  >
    <template v-if="props.example === 'preview'">
      <div class="flex min-h-56 flex-col items-center justify-center gap-4 p-6">
        <Button size="md" data-testid="preview-button" @click="clicks++">Create project</Button>
        <span class="text-xs text-muted-foreground" role="status">{{
          clicks
            ? `Clicked ${clicks} ${clicks === 1 ? 'time' : 'times'}`
            : 'Click to try the button'
        }}</span>
      </div>
    </template>
    <div v-else-if="props.example === 'variants'" class="flex flex-wrap items-center gap-3 p-6">
      <Button
        v-for="variant in variants"
        :key="variant"
        :variant="variant"
        size="md"
        :data-testid="`variant-${variant}`"
        >{{ variant }}</Button
      >
    </div>
    <template v-else-if="props.example === 'colors'">
      <div
        class="flex flex-wrap gap-1 border-b border-border p-2"
        aria-label="Color preview variant"
      >
        <Button
          v-for="variant in variants"
          :key="variant"
          :variant="selectedVariant === variant ? 'soft' : 'ghost'"
          size="xs"
          :aria-pressed="selectedVariant === variant"
          @click="selectedVariant = variant"
          >{{ variant }}</Button
        >
      </div>
      <div class="flex flex-wrap items-center gap-3 p-6">
        <Button
          v-for="color in colors"
          :key="color"
          :color="color"
          :variant="selectedVariant"
          size="md"
          :data-testid="`color-${color}`"
          >{{ color }}</Button
        >
      </div>
    </template>
    <div v-else-if="props.example === 'sizes'" class="flex flex-wrap items-end gap-4 p-6">
      <div v-for="size in sizes" :key="size" class="flex flex-col items-center gap-3">
        <Button :size="size" :data-testid="`size-${size}`"
          ><svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.75"
            aria-hidden="true"
          >
            <path d="M12 5v14M5 12h14" /></svg
          >Create</Button
        ><span class="text-xs text-muted-foreground">{{ size }}</span>
      </div>
    </div>
    <div v-else-if="props.example === 'icons'" class="flex flex-wrap items-end gap-4 p-6">
      <Button
        v-for="size in sizes"
        :key="size"
        :size="size"
        shape="icon"
        :aria-label="`Add item, ${size}`"
        :data-testid="`icon-${size}`"
        ><svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.75"
          aria-hidden="true"
        >
          <path d="M12 5v14M5 12h14" /></svg
      ></Button>
    </div>
    <div v-else-if="props.example === 'states'" class="flex flex-wrap items-center gap-4 p-6">
      <Button disabled data-testid="disabled-button">Unavailable</Button>
      <Button loading data-testid="loading-button">Create project</Button>
      <Button loading-auto data-testid="async-button" @click="demoSave">Try async</Button>
      <span class="text-xs text-muted-foreground" role="status">{{
        completed ? 'Demo complete' : 'The async demo waits one second.'
      }}</span>
    </div>
    <div v-else-if="props.example === 'overrides'" class="flex flex-wrap items-center gap-4 p-6">
      <Button class="rounded-full px-6" data-testid="override-button">Custom shape</Button>
      <Button variant="outline" :ui="{ content: 'gap-3' }"
        ><svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.75"
          aria-hidden="true"
        >
          <path d="M12 5v14M5 12h14" /></svg
        >Custom gap</Button
      >
    </div>
    <div v-else-if="props.example === 'links'" class="p-6">
      <Button
        as="a"
        href="/getting-started/installation"
        variant="outline"
        data-testid="link-button"
        >Read installation</Button
      >
    </div>
    <DocsCode
      v-if="props.example === 'preview'"
      :code="previewCode"
      filename="button-demo.vue"
      class="my-0! rounded-none! border-x-0! border-b-0!"
    />
  </div>
</template>
