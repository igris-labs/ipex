---
title: Toast
description: Show temporary notifications with optional actions.
navigation:
  icon: tabler:bell
---

## Demos

::component-example{name="toast" size-options="xs,sm,md,lg,xl" default-size="sm"}
::

### Usage

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

Mount one Toast viewport per manager near your application root. Call `useToast()` in component setup, then add notifications from event handlers. The preview uses its own queue so examples do not leave notifications on other pages.

### Actions and updates

Use `duration: 0` for a message that should stay until dismissed. Actions close after success. While an asynchronous action runs, its button shows progress and blocks repeated clicks. Rejected actions emit `action-error` and leave the toast open.

```ts
toast.add({
  title: 'Project archived',
  description: 'You can restore it without losing any work.',
  duration: 0,
  action: {
    label: 'Undo',
    altText: 'Restore archived project',
    onSelect: restoreProject,
  },
})
```

`restoreProject` is your application handler. For a request, use `toast.promise()` to update one notification as it settles. Add `data: { pending: true }` to show the loading icon, and clear that flag in the settled states.

```ts
await toast.promise(saveProject(), {
  loading: {
    title: 'Saving project',
    duration: 0,
    data: { pending: true },
  },
  success: {
    title: 'Project saved',
    data: { pending: false },
  },
  error: {
    title: 'Could not save',
    duration: 0,
    data: { pending: false },
  },
})
```

Handle request failures in the calling workflow. Reuse an `id` with `toast.add()` or `toast.update()` to change a notification without adding another queue entry.

### Behavior

Toasts slide into a stack and support swipe dismissal. Movement takes 500ms, height changes take 150ms, and content fades take 250ms. Cards stack until hovered or focused, then expand with the configured gap. Timers pause on hover, focus, and window blur by default. Reduced motion removes transitions and spinner rotation.

Cards keep a neutral surface with a semantic status icon. Titles and descriptions wrap within their own column, separate from the close button. Long messages scroll within the card; the viewport stays 16px from the screen edges.

## Installation

Complete the [shared installation](/getting-started/installation). Copy `Toast.vue` and `index.ts` into `app/components/ui/toast/`.

::component-source{name="toast"}
::

## API

### Variants and defaults

| Prop   | Values                       | Default |
| ------ | ---------------------------- | ------- |
| `size` | `xs`, `sm`, `md`, `lg`, `xl` | `sm`    |

### Props

| Prop                | Default                | Purpose                                                                                   |
| ------------------- | ---------------------- | ----------------------------------------------------------------------------------------- |
| `position`          | `bottom-right`         | `top-left`, `top-center`, `top-right`, `bottom-left`, `bottom-center`, or `bottom-right`. |
| `limit`             | `3`                    | Maximum interactive cards. Older entries stay mounted but hidden and inert.               |
| `stack`             | `true`                 | Collapse cards until hover or focus.                                                      |
| `gap`               | `12`                   | Expanded gap in pixels.                                                                   |
| `peek`              | `12`                   | Visible edge of each collapsed card.                                                      |
| `scaleStep`         | `0.1`                  | Scale reduction for cards behind the newest one.                                          |
| `pauseOnHover`      | `true`                 | Pause dismissal while inspecting a card.                                                  |
| `pauseOnFocus`      | `true`                 | Pause dismissal while using keyboard controls.                                            |
| `pauseOnWindowBlur` | `true`                 | Pause while the window is inactive.                                                       |
| `hotkey`            | `['F8']`               | Focus and expand the notification viewport.                                               |
| `hotkeyLabel`       | `Notifications`        | Accessible name for the viewport.                                                         |
| `closeLabel`        | `Dismiss notification` | Accessible name for close controls.                                                       |
| `swipeDirection`    | Inferred from position | Dismiss toward the viewport edge.                                                         |
| `swipeThreshold`    | `50`                   | Required swipe distance in pixels.                                                        |
| `teleport`          | `body`                 | Viewport target; `false` renders inline.                                                  |
| `manager`           | Injected manager       | Use a separate notification queue.                                                        |

Dismissal duration belongs to `toast.add({ duration })`, not the viewport. Visual `type` and announcement `priority` are independent: error and alert default to assertive announcements; other types are polite.

### Slots

| Slot          | Props                                                                    | Description                                                                         |
| ------------- | ------------------------------------------------------------------------ | ----------------------------------------------------------------------------------- |
| `toast`       | `toast`, `type`, `priority`, `action`, `attrs`, `close`, `performAction` | Complete inner content override with direct metadata and built-in action lifecycle. |
| `title`       | `toast`                                                                  | Title content.                                                                      |
| `description` | `toast`                                                                  | Description content.                                                                |
| `close`       | `toast`                                                                  | Close-button content.                                                               |

The `ui` prop accepts the native viewport, toast, title, description, close, and action parts, plus IPEX `layout`, `icon`, and `content` parts. A custom `toast` slot replaces the default inner layout; the native root retains queue behavior and accessibility.

### Events

| Event          | Payload          | Description                                   |
| -------------- | ---------------- | --------------------------------------------- |
| `action-error` | `(error, toast)` | Action rejected or threw; toast remains open. |
| `swipe-start`  | `(toast, event)` | Swipe interaction started.                    |
| `swipe-move`   | `(toast, event)` | Pointer moved during swipe.                   |
| `swipe-cancel` | `(toast, event)` | Swipe ended below threshold or was canceled.  |
| `swipe-end`    | `(toast, event)` | Swipe crossed threshold and closed toast.     |

### Keyboard

| Key      | Behavior                                            |
| -------- | --------------------------------------------------- |
| `F8`     | Focuses and expands viewport by default.            |
| `Tab`    | Moves through toast actions and close buttons.      |
| `Escape` | Closes latest toast while focus is inside viewport. |
