<script setup lang="ts">
import { ref, watch } from 'vue'

import { Button } from './ui/button'
import { Field } from './ui/field'
import { Form } from './ui/form'
import { Input } from './ui/input'
import { Tabs } from './ui/tabs'

const name = ref('IPEX docs')
const mode = ref('details')
const created = ref(false)
watch(name, () => {
  created.value = false
})
function create() {
  if (name.value.trim()) created.value = true
}
function reset() {
  name.value = 'IPEX docs'
  mode.value = 'details'
  created.value = false
}
</script>
<template>
  <div data-ui class="overflow-hidden rounded-lg border border-border bg-card text-card-foreground">
    <div class="flex items-center justify-between gap-4 border-b border-border px-5 py-4">
      <div>
        <p class="text-sm font-medium text-highlighted">Project setup</p>
        <p class="mt-1 text-xs text-muted-foreground">Interactive example</p>
      </div>
      <span class="text-xs" :class="created ? 'text-success' : 'text-muted-foreground'">{{
        created ? 'Created' : 'Draft'
      }}</span>
    </div>
    <Form class="gap-0" @submit="create">
      <div class="px-5 pt-5">
        <Tabs
          v-model="mode"
          :items="[
            { value: 'details', label: 'Details' },
            { value: 'review', label: 'Review' },
          ]"
          size="sm"
          aria-label="Example view"
          :ui="{ root: 'gap-0', panels: 'flex min-h-44 flex-col justify-center py-6' }"
        >
          <template #panel-details>
            <Field
              label="Project name"
              description="Use a name your team can recognize."
              name="project"
              required
            >
              <Input v-model="name" size="md" required :maxlength="60" placeholder="Project name" />
            </Field>
          </template>
          <template #panel-review>
            <dl class="space-y-4 text-sm">
              <div class="flex items-start justify-between gap-4">
                <dt class="text-muted-foreground">Project</dt>
                <dd class="max-w-60 text-right font-medium break-words">
                  {{ name.trim() || 'Untitled project' }}
                </dd>
              </div>
              <div class="flex items-start justify-between gap-4">
                <dt class="text-muted-foreground">Workspace</dt>
                <dd>Igris Labs</dd>
              </div>
            </dl>
          </template>
        </Tabs>
      </div>
      <div
        class="flex min-h-16 flex-wrap items-center justify-between gap-4 border-t border-border px-5 py-4"
      >
        <p
          role="status"
          class="flex items-center gap-1.5 text-xs"
          :class="created ? 'text-success' : 'text-muted-foreground'"
        >
          <Icon v-if="created" name="tabler:circle-check" class="size-3.5" aria-hidden="true" />
          {{ created ? 'Created in this example.' : 'Try the fields and view control.' }}
        </p>
        <Button v-if="created" type="button" variant="outline" size="md" @click="reset"
          >Reset example</Button
        >
        <Button v-else type="submit" size="md" :disabled="!name.trim()">Create project</Button>
      </div>
    </Form>
  </div>
</template>
