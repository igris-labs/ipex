---
title: Popover
description: A floating panel anchored to a trigger element.
navigation:
  icon: tabler:message
---

::component-example{name="popover" size-options="xs,sm,md,lg,xl" default-size="md"}
::

## Usage

```vue
<script setup lang="ts">
import { Popover } from '~/components/ui/popover'
import { Button } from '~/components/ui/button'
</script>

<template>
  <Popover>
    <template #trigger="{ toggle, triggerProps }"
      ><Button v-bind="triggerProps" @click="toggle">Open popover</Button></template
    >
    <template #content>Details for the current project.</template>
  </Popover>
</template>
```

## Variants and defaults

| Prop   | Values                       | Default |
| ------ | ---------------------------- | ------- |
| `size` | `xs`, `sm`, `md`, `lg`, `xl` | `md`    |

Width fits the content by default, capped at 20rem and the viewport. Panel padding stays at 12px across sizes. `size` controls text size, line height, and corner radius. The default trigger gap is 4px. Use `class` or `ui.content` to set an explicit width when needed. Child components retain their own size props.

## Props

| Prop         | Type                                     | Default           | Description                             |
| ------------ | ---------------------------------------- | ----------------- | --------------------------------------- |
| `side`       | `"top" \| "bottom" \| "left" \| "right"` | `"bottom"`        | Preferred side to position the popover. |
| `align`      | `"start" \| "center" \| "end"`           | `"start"`         | Alignment relative to the trigger.      |
| `sideOffset` | `number`                                 | `4`               | Gap in px between trigger and panel.    |
| `teleport`   | `string \| false`                        | `false`           | Teleport target.                        |
| `transition` | `string \| false`                        | `"akaza-popover"` | Named Vue transition.                   |
| `ui`         | `PopoverUi`                              | —                 | CSS class overrides.                    |

## Slots

| Slot      | Scoped props                                    | Description                     |
| --------- | ----------------------------------------------- | ------------------------------- |
| `trigger` | `{ isOpen, open, close, toggle, triggerProps }` | Element that opens the popover. |
| `content` | `{ close }`                                     | The floating panel content.     |

## Emits

| Event         | Payload                    | Description                        |
| ------------- | -------------------------- | ---------------------------------- |
| `open-change` | `[open: boolean, details]` | Fired when the open state changes. |

## Exposed methods

| Method   | Signature                   | Description          |
| -------- | --------------------------- | -------------------- |
| `open`   | `(reason?, event?) => void` | Opens the popover.   |
| `close`  | `(reason?, event?) => void` | Closes the popover.  |
| `toggle` | `(reason?, event?) => void` | Toggles the popover. |

## Keyboard

| Key                   | Behavior                                                                  |
| --------------------- | ------------------------------------------------------------------------- |
| `Enter` / `Space`     | Opens when trigger is a native button wired to `toggle`.                  |
| `Escape`              | Closes topmost popover and restores trigger focus.                        |
| `Tab` / `Shift + Tab` | Uses normal document order; Popover is non-modal and does not trap focus. |

Apply `triggerProps` to trigger element so expanded state and popup relationship are announced.

## Source

Copy `Popover.vue` and `index.ts` into `components/ui/popover` after [installation](/getting-started/installation).

::component-source{name="popover"}
::
