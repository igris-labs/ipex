---
title: Drawer
description: Open a panel from an edge of the screen.
navigation:
  icon: tabler:layout-sidebar-right
---

## Demos

::component-example{name="drawer" width-options="xs,sm,md,lg,xl" default-width="md"}
::

### Usage

```vue
<script setup lang="ts">
import { Drawer } from '~/components/ui/drawer'
import { Button } from '~/components/ui/button'
</script>

<template>
  <Drawer title="Project details" description="Review the project before continuing.">
    <template #trigger="{ open }"><Button @click="open">Open dialog</Button></template>
    <p>Project details go here.</p>
    <template #footer="{ close }"><Button variant="outline" @click="close">Close</Button></template>
  </Drawer>
</template>
```

## Installation

Complete the [shared installation](/getting-started/installation). Copy `Drawer.vue` and `index.ts` into `app/components/ui/drawer/`.

::component-source{name="drawer"}
::

## API

### Variants and defaults

| Prop    | Values                       | Default |
| ------- | ---------------------------- | ------- |
| `width` | `xs`, `sm`, `md`, `lg`, `xl` | `md`    |

`width` sets the floating surface width, independently of control size. The surface stays inside the viewport.

### Props

| Prop                   | Type                                     | Default   | Description                                                  |
| ---------------------- | ---------------------------------------- | --------- | ------------------------------------------------------------ |
| `side`                 | `"left" \| "right" \| "top" \| "bottom"` | `"right"` | Edge the drawer slides from.                                 |
| `title`                | `string`                                 | —         | Convenience title. Slot `#title` takes priority.             |
| `description`          | `string`                                 | —         | Convenience description. Slot `#description` takes priority. |
| `ariaLabel`            | `string`                                 | —         | Fallback accessible name when no title is rendered.          |
| `inset`                | `number \| string`                       | `0`       | Space between the drawer and the viewport edge.              |
| `closeOnBackdropClick` | `boolean`                                | `true`    | Close when clicking the overlay.                             |
| `swipeToClose`         | `boolean`                                | `true`    | Allow swiping the drawer closed on touch devices.            |
| `teleport`             | `string \| false`                        | `"body"`  | Teleport target.                                             |
| `as`                   | `string`                                 | `"div"`   | Root element tag.                                            |
| `ui`                   | `DrawerUi`                               | —         | CSS class overrides.                                         |

### Slots

| Slot          | Scoped props                      | Description                                           |
| ------------- | --------------------------------- | ----------------------------------------------------- |
| `trigger`     | `{ isOpen, open, close, toggle }` | Element that opens the drawer.                        |
| `handle`      | —                                 | Drag handle element.                                  |
| `header`      | `{ close, titleId }`              | Header region.                                        |
| `title`       | —                                 | Drawer title. Defaults to the `title` prop.           |
| `description` | —                                 | Description text. Defaults to the `description` prop. |
| `body`        | `{ close, descriptionId }`        | Main content area.                                    |
| `footer`      | `{ close }`                       | Action buttons region.                                |

### Events

| Event         | Payload                    | Description                        |
| ------------- | -------------------------- | ---------------------------------- |
| `open-change` | `[open: boolean, details]` | Fired when the open state changes. |

### Exposed methods

| Method          | Signature                   | Description                                    |
| --------------- | --------------------------- | ---------------------------------------------- |
| `open`          | `(reason?, event?) => void` | Opens the drawer.                              |
| `close`         | `(reason?, event?) => void` | Closes the drawer.                             |
| `toggle`        | `(reason?, event?) => void` | Toggles the drawer.                            |
| `titleId`       | `string`                    | Auto-generated id for the title element.       |
| `descriptionId` | `string`                    | Auto-generated id for the description element. |

### Keyboard

| Key                   | Behavior                                        |
| --------------------- | ----------------------------------------------- |
| `Tab` / `Shift + Tab` | Cycles through focusable drawer controls.       |
| `Escape`              | Closes topmost drawer and restores prior focus. |

Pointer and touch users can activate backdrop dismissal and configured swipe gestures. Keyboard users always have explicit controls and Escape.
