---
title: Slider
description: Choose a value or range by dragging a handle or using the keyboard.
navigation:
  icon: tabler:adjustments-horizontal
---

## Demos

::component-example{name="slider" size-options="xs,sm,md,lg,xl" default-size="sm"}
::

### Usage

```vue
<script setup lang="ts">
import { Slider } from '~/components/ui/slider'
</script>

<template>
  <Slider :min="0" :max="100" aria-label="Progress" />
</template>
```

## Installation

Complete the [shared installation](/getting-started/installation). Copy `Slider.vue` and `index.ts` into `app/components/ui/slider/`.

::component-source{name="slider"}
::

## API

### Variants and defaults

| Prop   | Values                       | Default |
| ------ | ---------------------------- | ------- |
| `size` | `xs`, `sm`, `md`, `lg`, `xl` | `sm`    |

### Props

| Prop                    | Type                                  | Default                 | Description                                              |
| ----------------------- | ------------------------------------- | ----------------------- | -------------------------------------------------------- |
| `id`                    | `string`                              | field id                | Thumb id.                                                |
| `name`                  | `string`                              | field name              | Form field name. Renders hidden range input.             |
| `min`                   | `number`                              | `0`                     | Minimum value.                                           |
| `max`                   | `number`                              | `100`                   | Maximum value.                                           |
| `step`                  | `number`                              | `1`                     | Keyboard and pointer snapping step.                      |
| `orientation`           | `"horizontal" \| "vertical"`          | `"horizontal"`          | Slider orientation.                                      |
| `minStepsBetweenThumbs` | `number`                              | `0`                     | Minimum distance between adjacent thumbs, in step units. |
| `inverted`              | `boolean`                             | `false`                 | Reverses value direction.                                |
| `thumbAlignment`        | `"center" \| "contain"`               | `"center"`              | Thumb alignment metadata exposed as a data attr.         |
| `required`              | `boolean`                             | `false`                 | Required state for hidden input.                         |
| `disabled`              | `boolean`                             | `false`                 | Disabled state.                                          |
| `invalid`               | `boolean`                             | `false`                 | Sets invalid attrs.                                      |
| `ariaLabel`             | `string`                              | —                       | Accessible label when no visible label exists.           |
| `ariaLabels`            | `string[]`                            | —                       | Per-thumb accessible labels for range sliders.           |
| `ariaLabelledby`        | `string`                              | —                       | Accessible label id.                                     |
| `ariaDescribedby`       | `string`                              | field description/error | Accessible description ids.                              |
| `getValueLabel`         | `(value, max) => string \| undefined` | —                       | Human-readable `aria-valuetext`.                         |
| `ui`                    | `SliderUi`                            | —                       | Classes for structural parts.                            |

### Slots

| Slot    | Props                                                   | Description           |
| ------- | ------------------------------------------------------- | --------------------- |
| `range` | `value`, `values`, `percentage`, `percentages`          | Custom range content. |
| `thumb` | `value`, `values`, `index`, `percentage`, `percentages` | Custom thumb content. |

### Events

| Event          | Payload                                | Description                                                         |
| -------------- | -------------------------------------- | ------------------------------------------------------------------- |
| `value-change` | `(value: number \| number[], details)` | Fired before model updates. `details.cancel()` prevents the update. |
| `value-commit` | `(value: number \| number[], details)` | Fired at the end of pointer or keyboard interaction.                |

### Keyboard

| Key                       | Behavior                            |
| ------------------------- | ----------------------------------- |
| `ArrowRight` / `ArrowUp`  | Increment by `step`.                |
| `ArrowLeft` / `ArrowDown` | Decrement by `step`.                |
| `PageUp` / `PageDown`     | Increment/decrement by `step * 10`. |
| `Home` / `End`            | Set to min/max.                     |
