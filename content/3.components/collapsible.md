---
title: Collapsible
description: A single section that can be expanded or collapsed.
navigation:
  icon: tabler:chevron-down
---

::component-example{name="collapsible" size-options="xs,sm,md,lg,xl" default-size="sm"}
::

## Usage

```vue
<script setup lang="ts">
import { Collapsible } from '~/components/ui/collapsible'
</script>

<template>
  <Collapsible>
    <template #trigger>Project details</template>
    <p>Details for the current project.</p>
  </Collapsible>
</template>
```

## Variants and defaults

| Prop   | Values                       | Default |
| ------ | ---------------------------- | ------- |
| `size` | `xs`, `sm`, `md`, `lg`, `xl` | `sm`    |

## Props

| Prop            | Type            | Default | Description                              |
| --------------- | --------------- | ------- | ---------------------------------------- |
| `disabled`      | `boolean`       | `false` | Prevents the panel from being toggled.   |
| `unmountOnHide` | `boolean`       | `false` | Remove content from the DOM when closed. |
| `as`            | `string`        | `"div"` | Root element tag.                        |
| `ui`            | `CollapsibleUi` | —       | CSS class overrides.                     |

## Slots

| Slot      | Scoped props                      | Description                        |
| --------- | --------------------------------- | ---------------------------------- |
| `trigger` | `{ isOpen, open, close, toggle }` | The toggle trigger element.        |
| `icon`    | `{ isOpen }`                      | Indicator icon inside the trigger. |
| `content` | `{ isOpen, close }`               | The collapsible panel body.        |

## Emits

| Event         | Payload                    | Description                        |
| ------------- | -------------------------- | ---------------------------------- |
| `open-change` | `[open: boolean, details]` | Fired when the open state changes. |

## Exposed methods

| Method   | Signature                   | Description        |
| -------- | --------------------------- | ------------------ |
| `open`   | `(reason?, event?) => void` | Opens the panel.   |
| `close`  | `(reason?, event?) => void` | Closes the panel.  |
| `toggle` | `(reason?, event?) => void` | Toggles the panel. |

## Keyboard

| Key                   | Behavior                                                             |
| --------------------- | -------------------------------------------------------------------- |
| `Enter` / `Space`     | Toggles focused trigger through native button behavior.              |
| `Tab` / `Shift + Tab` | Uses native order. Closed content is inert and cannot receive focus. |

## Source

Copy `Collapsible.vue` and `index.ts` into `components/ui/collapsible` after [installation](/getting-started/installation).

::component-source{name="collapsible"}
::
