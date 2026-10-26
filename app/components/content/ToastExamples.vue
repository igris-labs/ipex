<script setup lang="ts">
import { createToastManager, type ToastItem, type ToastType } from 'akaza-ui'
import { onBeforeUnmount, ref } from 'vue'

import { Button } from '../ui/button'
import { Checkbox } from '../ui/checkbox'
import { NumberField } from '../ui/number-field'
import { Toast, type ToastProps } from '../ui/toast'

const props = withDefaults(defineProps<ToastProps>(), {
  stack: undefined,
  pauseOnHover: undefined,
  pauseOnFocus: undefined,
  pauseOnWindowBlur: undefined,
  teleport: undefined,
})
const manager = createToastManager({ removeDelay: 240 })
const duration = ref(5000)
const simulateFailure = ref(false)
const saving = ref(false)
const outcome = ref('')
const messages: Record<ToastType, { title: string; description: string }> = {
  status: { title: 'Project saved', description: 'Your changes are available to your team.' },
  success: { title: 'Changes published', description: 'The latest version is ready to share.' },
  info: { title: 'New version available', description: 'Refresh when you are ready to update.' },
  warning: {
    title: 'Storage nearly full',
    description: 'Free some space before uploading more files.',
  },
  error: {
    title: 'Could not save changes',
    description: 'Your work is still here. Check your connection and try again.',
  },
  alert: { title: 'Session expires soon', description: 'Save your work before signing in again.' },
}
function notify(type: ToastType = 'status') {
  manager.add({ ...messages[type], type, duration: duration.value })
}
function undo() {
  manager.add({
    title: 'Project archived',
    description: 'You can restore it without losing any work.',
    type: 'status',
    duration: 0,
    action: {
      label: 'Undo',
      altText: 'Restore archived project',
      onSelect: () => {
        outcome.value = 'Project restored.'
      },
    },
  })
}
async function request() {
  await new Promise<void>((resolve) => setTimeout(resolve, 900))
  if (simulateFailure.value) throw new Error('Connection unavailable')
}
function retry() {
  manager.add({
    title: 'Connection lost',
    description: 'Retry when your connection is available.',
    type: 'error',
    duration: 0,
    action: {
      label: 'Retry',
      altText: 'Retry connection',
      onSelect: async () => {
        await request()
        outcome.value = 'Connection restored.'
      },
    },
  })
}
function actionError(_error: unknown, toast: ToastItem) {
  manager.update({
    id: toast.id,
    type: 'error',
    title: 'Still unable to connect',
    description: 'The action failed. You can retry or dismiss this notification.',
    duration: 0,
  })
}
async function saveWithPromise() {
  if (saving.value) return
  saving.value = true
  try {
    await manager.promise(request(), {
      loading: {
        title: 'Saving project',
        description: 'Uploading your latest changes.',
        duration: 0,
        data: { pending: true },
      },
      success: {
        title: 'Project synced',
        description: 'All changes are saved.',
        duration: duration.value,
        data: { pending: false },
      },
      error: {
        title: 'Sync failed',
        description: 'Your changes are safe locally. Try again when connected.',
        duration: 0,
        data: { pending: false },
      },
    })
    outcome.value = 'Sync completed.'
  } catch {
    outcome.value = 'Sync failed. Your changes are safe locally.'
  } finally {
    saving.value = false
  }
}
function showStack() {
  manager.add({
    title: 'Comment received',
    description: 'Alex left a note on your project.',
    type: 'info',
    duration: duration.value,
  })
  manager.add({
    title: 'Upload complete',
    description: 'Your design files are ready to review with the rest of the team.',
    type: 'success',
    duration: duration.value,
  })
  manager.add({
    title: 'Review requested',
    description:
      'There are three changes waiting for approval. Open your workspace to review them before publishing the next version.',
    type: 'warning',
    duration: duration.value,
  })
}
onBeforeUnmount(() => {
  for (const toast of manager.toasts.value) manager.remove(toast.id)
})
</script>

<template>
  <div class="grid w-full gap-4">
    <div class="flex flex-wrap items-end justify-center gap-4">
      <label class="grid gap-1 text-xs text-muted-foreground">
        Dismiss after (ms)
        <NumberField
          v-model="duration"
          :min="0"
          :max="60000"
          :step="500"
          size="xs"
          aria-label="Toast duration"
          class="w-32"
        />
      </label>
      <Checkbox v-model="simulateFailure" label="Simulate failure" size="sm" />
    </div>
    <div class="flex flex-wrap justify-center gap-2">
      <Button size="sm" @click="notify()">Show notification</Button>
      <Button size="sm" color="success" variant="soft" @click="notify('success')">Success</Button>
      <Button size="sm" color="info" variant="soft" @click="notify('info')">Info</Button>
      <Button size="sm" color="warning" variant="soft" @click="notify('warning')">Warning</Button>
      <Button size="sm" color="destructive" variant="soft" @click="notify('error')">Error</Button>
      <Button size="sm" color="destructive" variant="soft" @click="notify('alert')">Alert</Button>
    </div>
    <div class="flex flex-wrap justify-center gap-2">
      <Button size="sm" variant="outline" @click="undo">Undo action</Button>
      <Button size="sm" variant="outline" @click="retry">Async retry</Button>
      <Button
        size="sm"
        variant="outline"
        class="min-w-36"
        :loading="saving"
        @click="saveWithPromise"
        >Promise update</Button
      >
      <Button size="sm" variant="outline" @click="showStack">Show stack</Button>
      <Button size="sm" variant="ghost" @click="manager.clear()">Dismiss all</Button>
    </div>
    <p class="text-center text-xs leading-5 text-muted-foreground">
      Use 0 for persistent notifications. Hover or focus to pause. Press F8 to inspect the stack.
    </p>
    <p role="status" class="min-h-5 text-center text-xs text-muted-foreground">{{ outcome }}</p>
    <!-- Akaza installs window-pause listeners when mounted. -->
    <Toast
      :key="String(props.pauseOnWindowBlur)"
      v-bind="props"
      :manager="manager"
      @action-error="actionError"
    />
  </div>
</template>
