---
title: Toggle
description: A two-state button that can be on or off.
navigation:
  icon: tabler:square-toggle
---

::component-example{name="toggle" size-options="xs,sm,md,lg,xl" default-size="sm" variant-options="soft,outline" default-variant="soft"}
::

## Usage

```vue
<script setup lang="ts">
import { Toggle } from '~/components/ui/toggle'
</script>

<template>
  <Toggle aria-label="Bold"><strong>B</strong></Toggle>
</template>
```

## Variants and defaults

| Prop      | Values                       | Default |
| --------- | ---------------------------- | ------- |
| `size`    | `xs`, `sm`, `md`, `lg`, `xl` | `sm`    |
| `variant` | `soft`, `outline`            | `soft`  |

## Props

| Prop         | Type       | Default    | Description                                    |
| ------------ | ---------- | ---------- | ---------------------------------------------- |
| `modelValue` | `boolean`  | `false`    | Whether the toggle is pressed.                 |
| `disabled`   | `boolean`  | `false`    | Disables the toggle.                           |
| `value`      | `string`   | —          | Value used when the toggle is part of a group. |
| `ariaLabel`  | `string`   | —          | Accessible label for icon-only toggles.        |
| `as`         | `string`   | `"button"` | Root element tag.                              |
| `ui`         | `ToggleUi` | —          | CSS class overrides.                           |

## Slots

| Slot      | Scoped props         | Description                                   |
| --------- | -------------------- | --------------------------------------------- |
| `default` | `{ pressed, state }` | Button content. `state` is `"on"` or `"off"`. |

## Emits

| Event            | Payload                       | Description                       |
| ---------------- | ----------------------------- | --------------------------------- |
| `pressed-change` | `[pressed: boolean, details]` | Fired when pressed state changes. |

## Keyboard

| Key                   | Behavior                                                              |
| --------------------- | --------------------------------------------------------------------- |
| `Enter` / `Space`     | Toggles pressed state. Works for native button and custom `as` roots. |
| `Tab` / `Shift + Tab` | Uses native focus order and skips disabled toggle.                    |

## Source

Copy `Toggle.vue` and `index.ts` into `components/ui/toggle` after [installation](/getting-started/installation).

::component-source{name="toggle"}
::
