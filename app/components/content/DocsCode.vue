<script setup lang="ts">
import { computed, ref, watch } from 'vue'

import { Button } from '../ui/button'

const props = defineProps<{
  code: string
  filename?: string
  language?: string
  preClass?: string
  preAttrs?: Record<string, unknown>
}>()
const status = ref('Copy code')
const language = computed(() => {
  if (props.language) return props.language
  const extension = props.filename?.split('.').at(-1)
  return (
    ({ ts: 'ts', vue: 'vue', css: 'css', json: 'json' } as Record<string, string>)[
      extension ?? ''
    ] ?? 'vue'
  )
})
const { data: highlighted } = await useAsyncData(
  `code:${useId()}`,
  async () => {
    const { highlightCode } = await import('../../utils/highlight')
    return highlightCode(props.code, language.value)
  },
  { watch: [() => props.code, language] },
)
watch(
  () => props.code,
  () => {
    status.value = 'Copy code'
  },
)
async function copy() {
  try {
    await navigator.clipboard.writeText(props.code)
    status.value = 'Copied'
  } catch {
    status.value = 'Select and copy the code below'
  }
}
</script>

<template>
  <div
    class="group/code my-6 min-w-0 overflow-hidden rounded-lg border border-border/60 bg-(--syntax-background) text-sm syntax-highlight"
  >
    <div
      class="flex min-h-10 items-center justify-between gap-3 border-b border-border/50 bg-(--syntax-header) px-4"
    >
      <span class="min-w-0 truncate text-xs text-muted-foreground">{{ filename ?? language }}</span>
      <Button
        variant="ghost"
        size="xs"
        shape="icon"
        :aria-label="status"
        class="text-muted-foreground hover:text-highlighted"
        @click="copy"
      >
        <Icon
          :name="status === 'Copied' ? 'lucide:check' : 'lucide:copy'"
          class="size-3.5"
          aria-hidden="true"
        />
      </Button>
      <span class="sr-only" role="status">{{ status === 'Copy code' ? '' : status }}</span>
    </div>
    <pre
      v-bind="preAttrs"
      class="m-0 max-h-120 overflow-auto bg-transparent px-5 py-5 font-mono text-[13px] leading-6 text-(--syntax-foreground)"
    ><code v-if="highlighted" v-html="highlighted" /><code v-else>{{ code }}</code></pre>
  </div>
</template>
