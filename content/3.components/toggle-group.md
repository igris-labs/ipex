---
title: Toggle Group
description: Choose one or more pressed buttons from a group.
navigation:
  icon: tabler:layout-grid
---

## Demos

::component-example{name="toggle-group" size-options="xs,sm,md,lg,xl" default-size="sm" variant-options="soft,outline" default-variant="soft"}
::

### Usage

```vue
<script setup lang="ts">
import { ToggleGroup } from '~/components/ui/toggle-group'

const options = [
  { value: 'grid', label: 'Grid' },
  { value: 'list', label: 'List' },
]
</script>

<template>
  <ToggleGroup :options="options" aria-label="View mode" />
</template>
```

Single selection moves one shared pressed indicator between items, including vertical groups. Multiple selection keeps a separate pressed fill on each selected item. Reduced motion disables sliding.

## Installation

Complete the [shared installation](/getting-started/installation). Copy `ToggleGroup.vue` and `index.ts` into `app/components/ui/toggle-group/`.

::component-source{name="toggle-group"}
::

## API

### Variants and defaults

| Prop      | Values                       | Default |
| --------- | ---------------------------- | ------- |
| `size`    | `xs`, `sm`, `md`, `lg`, `xl` | `sm`    |
| `variant` | `soft`, `outline`            | `soft`  |

### Props

| Prop             | Type                         | Default         | Description                                                                        |
| ---------------- | ---------------------------- | --------------- | ---------------------------------------------------------------------------------- |
| `options`        | `ToggleGroupOption[]`        | required        | Toggle items.                                                                      |
| `type`           | `"single" \| "multiple"`     | `"single"`      | Selection mode.                                                                    |
| `valueKey`       | `string`                     | —               | Object key used as item value. Falls back to `value`, then `label`.                |
| `labelKey`       | `string`                     | `"label"`       | Object key used as item label.                                                     |
| `descriptionKey` | `string`                     | `"description"` | Object key used as item description.                                               |
| `disabledKey`    | `string`                     | `"disabled"`    | Object key used as item disabled state.                                            |
| `disabled`       | `boolean`                    | `false`         | Disabled state for the whole group.                                                |
| `required`       | `boolean`                    | `false`         | Prevents clearing the last selected value.                                         |
| `name`           | `string`                     | —               | Hidden form input name. Multiple mode renders one hidden input per selected value. |
| `orientation`    | `"horizontal" \| "vertical"` | `"horizontal"`  | Roving focus direction.                                                            |
| `loop`           | `boolean`                    | `true`          | Arrow navigation wraps.                                                            |
| `rovingFocus`    | `boolean`                    | `true`          | Enables arrow-key roving focus.                                                    |
| `allowEmpty`     | `boolean`                    | `true`          | Allows single mode to clear selected item.                                         |
| `ariaLabel`      | `string`                     | —               | Accessible group label.                                                            |
| `ariaLabelledby` | `string`                     | —               | Accessible group label id.                                                         |
| `ui`             | `ToggleGroupUi`              | —               | Classes for structural parts.                                                      |

### Slots

| Slot   | Props                                                                          | Description          |
| ------ | ------------------------------------------------------------------------------ | -------------------- |
| `item` | `option`, `value`, `label`, `description`, `isPressed`, `isDisabled`, `select` | Custom item content. |

### Events

| Event          | Payload            | Description                                                         |
| -------------- | ------------------ | ------------------------------------------------------------------- |
| `value-change` | `(value, details)` | Fired before model updates. `details.cancel()` prevents the update. |

### Keyboard

| Key               | Behavior                               |
| ----------------- | -------------------------------------- |
| `Enter` / `Space` | Toggle focused item.                   |
| Arrow keys        | Move focus by orientation.             |
| `Home` / `End`    | Move focus to first/last enabled item. |
