---
title: Toast
description: Queued status and alert notifications with stacking, actions, updates, promise state, and swipe dismissal.
navigation:
  icon: tabler:bell
---

::component-example{name="toast" size-options="xs,sm,md,lg,xl" default-size="sm"}
::

## Usage

```vue
<script setup lang="ts">
import { Toast } from '~/components/ui/toast'
import { useToast } from 'akaza-ui'
import { Button } from '~/components/ui/button'

const toast = useToast()
</script>

<template>
  <Toast />
  <Button @click="toast.add({ title: 'Project saved' })">Show notification</Button>
</template>
```

## Variants and defaults

| Prop   | Values                       | Default |
| ------ | ---------------------------- | ------- |
| `size` | `xs`, `sm`, `md`, `lg`, `xl` | `sm`    |

## Slots

| Slot          | Props                                                                    | Description                                                                         |
| ------------- | ------------------------------------------------------------------------ | ----------------------------------------------------------------------------------- |
| `toast`       | `toast`, `type`, `priority`, `action`, `attrs`, `close`, `performAction` | Complete inner content override with direct metadata and built-in action lifecycle. |
| `title`       | `toast`                                                                  | Title content.                                                                      |
| `description` | `toast`                                                                  | Description content.                                                                |
| `close`       | `toast`                                                                  | Close-button content.                                                               |

## Emits

| Event          | Payload          | Description                                   |
| -------------- | ---------------- | --------------------------------------------- |
| `action-error` | `(error, toast)` | Action rejected or threw; toast remains open. |
| `swipe-start`  | `(toast, event)` | Swipe interaction started.                    |
| `swipe-move`   | `(toast, event)` | Pointer moved during swipe.                   |
| `swipe-cancel` | `(toast, event)` | Swipe ended below threshold or was canceled.  |
| `swipe-end`    | `(toast, event)` | Swipe crossed threshold and closed toast.     |

## Keyboard

| Key      | Behavior                                            |
| -------- | --------------------------------------------------- |
| `F8`     | Focuses and expands viewport by default.            |
| `Tab`    | Moves through toast actions and close buttons.      |
| `Escape` | Closes latest toast while focus is inside viewport. |

## Source

Copy `Toast.vue` and `index.ts` into `components/ui/toast` after [installation](/getting-started/installation).

::component-source{name="toast"}
::
