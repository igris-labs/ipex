---
title: Progress
description: Show how much of a task has completed.
navigation:
  icon: tabler:progress
---

## Demos

::component-example{name="progress" size-options="xs,sm,md,lg,xl" default-size="sm"}
::

### Usage

```vue
<script setup lang="ts">
import { Progress } from '~/components/ui/progress'
</script>

<template>
  <Progress :model-value="64" aria-label="Upload progress" />
</template>
```

### Values and orientation

Bind the value with `v-model`. Set it to `null` for indeterminate progress. The preview exposes a value control and orientation under **Options and states**.

```vue
<Progress v-model="completed" :max="100" aria-label="Upload progress" />
<Progress v-model="completed" orientation="vertical" aria-label="Upload progress" />
```

Vertical progress fills from the bottom and keeps the selected thickness. Width and height changes transition over 200ms; reduced motion disables the transition and indeterminate pulse.

## Installation

Complete the [shared installation](/getting-started/installation). Copy `Progress.vue` and `index.ts` into `app/components/ui/progress/`.

::component-source{name="progress"}
::

## API

### Variants and defaults

| Prop   | Values                       | Default |
| ------ | ---------------------------- | ------- |
| `size` | `xs`, `sm`, `md`, `lg`, `xl` | `sm`    |

### Props

| Prop            | Type                                             | Default        | Description                                        |
| --------------- | ------------------------------------------------ | -------------- | -------------------------------------------------- |
| `modelValue`    | `number \| null`                                 | `null`         | Current progress value. `null` = indeterminate.    |
| `min`           | `number`                                         | `0`            | Minimum value.                                     |
| `max`           | `number`                                         | `100`          | Maximum value.                                     |
| `orientation`   | `"horizontal" \| "vertical"`                     | `"horizontal"` | Orientation of the progress bar.                   |
| `ariaLabel`     | `string`                                         | —              | Accessible label when no visible label is present. |
| `getValueLabel` | `(value: number \| null, max: number) => string` | —              | Custom function to generate the `aria-valuetext`.  |
| `ui`            | `ProgressUi`                                     | —              | CSS class overrides.                               |

### Slots

| Slot        | Scoped props                             | Description                                                                      |
| ----------- | ---------------------------------------- | -------------------------------------------------------------------------------- |
| `indicator` | `{ value, percentage, max, min, state }` | The filled indicator element. `state` is `"indeterminate"` when value is `null`. |
