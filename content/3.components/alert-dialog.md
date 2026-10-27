---
title: Alert Dialog
description: Ask for confirmation before an action continues.
navigation:
  icon: tabler:alert-triangle
---

## Demos

::component-example{name="alert-dialog" width-options="xs,sm,md,lg,xl" default-width="md"}
::

### Usage

```vue
<script setup lang="ts">
import { AlertDialog } from '~/components/ui/alert-dialog'
import { Button } from '~/components/ui/button'
</script>

<template>
  <AlertDialog title="Project details" description="Review the project before continuing.">
    <template #trigger="{ open }"><Button @click="open">Open dialog</Button></template>
    <p>Project details go here.</p>
    <template #footer="{ close }"><Button variant="outline" @click="close">Close</Button></template>
  </AlertDialog>
</template>
```

## Installation

Complete the [shared installation](/getting-started/installation). Copy `AlertDialog.vue` and `index.ts` into `app/components/ui/alert-dialog/`.

::component-source{name="alert-dialog"}
::

## API

### Variants and defaults

| Prop    | Values                       | Default |
| ------- | ---------------------------- | ------- |
| `width` | `xs`, `sm`, `md`, `lg`, `xl` | `md`    |

`width` sets the floating surface width, independently of control size. The surface stays inside the viewport.

### Props

| Prop          | Type              | Default                | Description                                                       |
| ------------- | ----------------- | ---------------------- | ----------------------------------------------------------------- |
| `title`       | `string`          | —                      | Convenience title prop. Slot `#title` takes priority.             |
| `ariaLabel`   | `string`          | —                      | Fallback accessible name when no title is rendered.               |
| `description` | `string`          | —                      | Convenience description prop. Slot `#description` takes priority. |
| `teleport`    | `string \| false` | `"body"`               | Teleport target for the dialog.                                   |
| `transition`  | `string \| false` | `"akaza-alert-dialog"` | Named Vue transition to apply.                                    |
| `duration`    | `number`          | `150`                  | Transition duration in ms.                                        |
| `as`          | `string`          | `"div"`                | Root element tag.                                                 |
| `ui`          | `AlertDialogUi`   | —                      | CSS class overrides.                                              |

### Slots

| Slot          | Scoped props                      | Description                                           |
| ------------- | --------------------------------- | ----------------------------------------------------- |
| `trigger`     | `{ isOpen, open, close, toggle }` | Element that opens the dialog.                        |
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

| Key                   | Behavior                                                         |
| --------------------- | ---------------------------------------------------------------- |
| `Tab` / `Shift + Tab` | Cycles through focusable controls inside open alert dialog.      |
| `Escape`              | Does not close the alert dialog. The user must choose an action. |

Opening moves focus inside. Closing restores focus to previous element. Backdrop activation does not dismiss it.
