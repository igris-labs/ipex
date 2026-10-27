---
title: Tooltip
description: Show a short explanation on hover or keyboard focus.
navigation:
  icon: tabler:help-circle
---

## Demos

::component-example{name="tooltip" size-options="xs,sm,md,lg,xl" default-size="sm"}
::

### Usage

```vue
<script setup lang="ts">
import { Tooltip } from '~/components/ui/tooltip'
import { Button } from '~/components/ui/button'
</script>

<template>
  <Tooltip>
    <template #trigger="{ triggerProps }"
      ><Button v-bind="triggerProps">Open tooltip</Button></template
    >
    <template #content>Details for the current project.</template>
  </Tooltip>
</template>
```

## Installation

Complete the [shared installation](/getting-started/installation). Copy `Tooltip.vue` and `index.ts` into `app/components/ui/tooltip/`.

::component-source{name="tooltip"}
::

## API

### Variants and defaults

| Prop   | Values                       | Default |
| ------ | ---------------------------- | ------- |
| `size` | `xs`, `sm`, `md`, `lg`, `xl` | `sm`    |

### Props

| Prop            | Type                                     | Default           | Description                                            |
| --------------- | ---------------------------------------- | ----------------- | ------------------------------------------------------ |
| `direction`     | `"top" \| "bottom" \| "left" \| "right"` | `"top"`           | Which side the tooltip appears on.                     |
| `delayDuration` | `number`                                 | `300`             | Delay in ms before the tooltip shows on hover.         |
| `closeDelay`    | `number`                                 | `0`               | Delay in ms before the tooltip hides after hover ends. |
| `disabled`      | `boolean`                                | `false`           | Prevent the tooltip from showing.                      |
| `arrow`         | `boolean`                                | `false`           | Show an arrow pointing to the trigger.                 |
| `teleport`      | `string \| false`                        | `"body"`          | Teleport target.                                       |
| `transition`    | `string \| false`                        | `"akaza-tooltip"` | Named Vue transition.                                  |
| `ui`            | `TooltipUi`                              | —                 | CSS class overrides.                                   |

### Slots

| Slot      | Scoped props               | Description                            |
| --------- | -------------------------- | -------------------------------------- |
| `trigger` | `{ isOpen, triggerProps }` | The element that triggers the tooltip. |
| `content` | `{ close }`                | The tooltip popup content.             |

### Keyboard

| Key                   | Behavior                                                        |
| --------------------- | --------------------------------------------------------------- |
| `Tab` / `Shift + Tab` | Focusing trigger or its child opens tooltip; leaving closes it. |
| `Escape`              | Closes topmost tooltip and restores trigger focus.              |

Tooltip never requires pointer hover. Apply `triggerProps` to interactive trigger so `aria-describedby` reaches actual focus target.
