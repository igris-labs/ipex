---
title: Progress
description: Displays a value indicating completion of a task.
navigation:
  icon: tabler:progress
---

::component-example{name="progress" size-options="xs,sm,md,lg,xl" default-size="sm"}
::

## Usage

```vue
<script setup lang="ts">
import { Progress } from '~/components/ui/progress'
</script>

<template>
  <Progress :model-value="64" aria-label="Upload progress" />
</template>
```

## Variants and defaults

| Prop   | Values                       | Default |
| ------ | ---------------------------- | ------- |
| `size` | `xs`, `sm`, `md`, `lg`, `xl` | `sm`    |

## Props

| Prop            | Type                                             | Default        | Description                                        |
| --------------- | ------------------------------------------------ | -------------- | -------------------------------------------------- |
| `modelValue`    | `number \| null`                                 | `null`         | Current progress value. `null` = indeterminate.    |
| `min`           | `number`                                         | `0`            | Minimum value.                                     |
| `max`           | `number`                                         | `100`          | Maximum value.                                     |
| `orientation`   | `"horizontal" \| "vertical"`                     | `"horizontal"` | Orientation of the progress bar.                   |
| `ariaLabel`     | `string`                                         | —              | Accessible label when no visible label is present. |
| `getValueLabel` | `(value: number \| null, max: number) => string` | —              | Custom function to generate the `aria-valuetext`.  |
| `ui`            | `ProgressUi`                                     | —              | CSS class overrides.                               |

## Slots

| Slot        | Scoped props                             | Description                                                                      |
| ----------- | ---------------------------------------- | -------------------------------------------------------------------------------- |
| `indicator` | `{ value, percentage, max, min, state }` | The filled indicator element. `state` is `"indeterminate"` when value is `null`. |

## Source

Copy `Progress.vue` and `index.ts` into `components/ui/progress` after [installation](/getting-started/installation).

::component-source{name="progress"}
::
