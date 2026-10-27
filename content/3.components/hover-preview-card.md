---
title: Hover Preview Card
description: Show a content preview when someone hovers or focuses a link.
navigation:
  icon: tabler:id
---

## Demos

::component-example{name="hover-preview-card" size-options="xs,sm,md,lg,xl" default-size="md"}
::

### Usage

```vue
<script setup lang="ts">
import { HoverPreviewCard } from '~/components/ui/hover-preview-card'
import { Button } from '~/components/ui/button'
</script>

<template>
  <HoverPreviewCard>
    <template #trigger="{ triggerProps }"
      ><Button v-bind="triggerProps">Open hover preview card</Button></template
    >
    <template #content>Details for the current project.</template>
  </HoverPreviewCard>
</template>
```

## Installation

Complete the [shared installation](/getting-started/installation). Copy `HoverPreviewCard.vue` and `index.ts` into `app/components/ui/hover-preview-card/`.

::component-source{name="hover-preview-card"}
::

## API

### Variants and defaults

| Prop   | Values                       | Default |
| ------ | ---------------------------- | ------- |
| `size` | `xs`, `sm`, `md`, `lg`, `xl` | `md`    |

Width fits the content by default, capped at 20rem and the viewport. Panel padding stays at 12px across sizes. `size` controls text size, line height, and corner radius. The default trigger gap is 4px. Use `class` or `ui.content` to set an explicit width when needed. Child components retain their own size props.

### Props

| Prop          | Type                                     | Default    | Description                                                       |
| ------------- | ---------------------------------------- | ---------- | ----------------------------------------------------------------- |
| `side`        | `"top" \| "right" \| "bottom" \| "left"` | `"bottom"` | Preferred side.                                                   |
| `align`       | `"start" \| "center" \| "end"`           | `"center"` | Alignment on the cross-axis.                                      |
| `sideOffset`  | `number`                                 | `4`        | Gap in px.                                                        |
| `openDelay`   | `number`                                 | `600`      | Delay before opening.                                             |
| `closeDelay`  | `number`                                 | `150`      | Delay before closing.                                             |
| `disabled`    | `boolean`                                | `false`    | Prevents opening.                                                 |
| `forceMount`  | `boolean`                                | `false`    | Keeps closed content mounted, hidden, and inert.                  |
| `openOnClick` | `boolean`                                | `true`     | Toggles on touch/pen click. Mouse continues to use hover/focus.   |
| `arrow`       | `boolean`                                | `false`    | Renders arrow element.                                            |
| `ariaLabel`   | `string`                                 | —          | Adds labelled `role="dialog"` semantics for interactive previews. |
| `teleport`    | `string \| false`                        | `"body"`   | Teleport target.                                                  |
| `ui`          | `HoverPreviewCardUi`                     | —          | Classes for structural parts.                                     |

### Slots

| Slot      | Props                    | Description      |
| --------- | ------------------------ | ---------------- |
| `trigger` | `isOpen`, `triggerProps` | Trigger content. |
| `content` | `close`                  | Preview content. |

### Events

| Event         | Payload           | Description                      |
| ------------- | ----------------- | -------------------------------- |
| `open-change` | `(open, details)` | Fired before open state changes. |

### Keyboard

| Key           | Behavior                                                                      |
| ------------- | ----------------------------------------------------------------------------- |
| `Tab` / focus | Opens on trigger focus and remains open while focus is in trigger or content. |
| `Escape`      | Closes the card and returns focus to trigger.                                 |
