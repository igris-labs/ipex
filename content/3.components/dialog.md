---
title: Dialog
description: Open a modal panel while keeping keyboard focus inside it.
navigation:
  icon: tabler:app-window
---

## Demos

::component-example{name="dialog" width-options="xs,sm,md,lg,xl" default-width="md"}
::

### Usage

```vue
<script setup lang="ts">
import { Dialog } from '~/components/ui/dialog'
import { Button } from '~/components/ui/button'
</script>

<template>
  <Dialog title="Project details" description="Review the project before continuing.">
    <template #trigger="{ open }"><Button @click="open">Open dialog</Button></template>
    <p>Project details go here.</p>
    <template #footer="{ close }"><Button variant="outline" @click="close">Close</Button></template>
  </Dialog>
</template>
```

## Installation

Complete the [shared installation](/getting-started/installation). Copy `Dialog.vue` and `index.ts` into `app/components/ui/dialog/`.

::component-source{name="dialog"}
::

## API

### Variants and defaults

| Prop    | Values                       | Default |
| ------- | ---------------------------- | ------- |
| `width` | `xs`, `sm`, `md`, `lg`, `xl` | `md`    |

`width` sets the floating surface width, independently of control size. The surface stays inside the viewport.

### Props

| Prop                   | Type              | Default          | Description                                                  |
| ---------------------- | ----------------- | ---------------- | ------------------------------------------------------------ |
| `title`                | `string`          | —                | Convenience title. Slot `#title` takes priority.             |
| `description`          | `string`          | —                | Convenience description. Slot `#description` takes priority. |
| `ariaLabel`            | `string`          | —                | Fallback accessible name when no title is rendered.          |
| `closeOnBackdropClick` | `boolean`         | `true`           | Close when clicking the overlay.                             |
| `fullscreen`           | `boolean`         | `false`          | Expand the dialog to fill the viewport.                      |
| `teleport`             | `string \| false` | `"body"`         | Teleport target.                                             |
| `transition`           | `string \| false` | `"akaza-dialog"` | Named Vue transition.                                        |
| `duration`             | `number`          | `100`            | Transition duration in ms.                                   |
| `as`                   | `string`          | `"div"`          | Root element tag.                                            |
| `ui`                   | `DialogUi`        | —                | CSS class overrides.                                         |

### Slots

| Slot          | Scoped props                      | Description                                           |
| ------------- | --------------------------------- | ----------------------------------------------------- |
| `trigger`     | `{ isOpen, open, close, toggle }` | Element that opens the dialog.                        |
| `overlay`     | —                                 | Backdrop element.                                     |
| `header`      | `{ close, titleId }`              | Header region.                                        |
| `title`       | —                                 | Dialog title. Defaults to the `title` prop.           |
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
| `open`          | `(reason?, event?) => void` | Opens the dialog.                              |
| `close`         | `(reason?, event?) => void` | Closes the dialog.                             |
| `toggle`        | `(reason?, event?) => void` | Toggles the dialog.                            |
| `titleId`       | `string`                    | Auto-generated id for the title element.       |
| `descriptionId` | `string`                    | Auto-generated id for the description element. |

### Keyboard

| Key                   | Behavior                                              |
| --------------------- | ----------------------------------------------------- |
| `Tab` / `Shift + Tab` | Cycles through focusable controls inside open dialog. |
| `Escape`              | Closes topmost dialog and restores prior focus.       |

Opening moves focus inside, locks page scroll, and makes background content inert while modal is active.
