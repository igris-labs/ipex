---
title: Stepper
description: Guide someone through a sequence of steps.
navigation:
  icon: tabler:list-numbers
---

## Demos

::component-example{name="stepper" size-options="xs,sm,md,lg,xl" default-size="sm"}
::

### Usage

```vue
<script setup lang="ts">
import { Stepper } from '~/components/ui/stepper'

const items = [
  { value: 'details', title: 'Details' },
  { value: 'review', title: 'Review' },
]
</script>

<template>
  <Stepper :items="items" />
</template>
```

Panels share one grid area by default, reserving room for the tallest retained panel and fading in over 180ms. Inactive panels stay hidden from interaction. If you enable `unmountOnHide`, use `ui.panels` to reserve any minimum height your layout needs.

## Installation

Complete the [shared installation](/getting-started/installation). Copy `Stepper.vue` and `index.ts` into `app/components/ui/stepper/`.

::component-source{name="stepper"}
::

## API

### Variants and defaults

| Prop   | Values                       | Default |
| ------ | ---------------------------- | ------- |
| `size` | `xs`, `sm`, `md`, `lg`, `xl` | `sm`    |

### Props

| Prop             | Type                         | Default            | Description                                      |
| ---------------- | ---------------------------- | ------------------ | ------------------------------------------------ |
| `items`          | `StepperItem[]`              | required           | Step data.                                       |
| `valueKey`       | `string`                     | `"value"`          | Custom item value key.                           |
| `titleKey`       | `string`                     | `"title"`          | Custom title key.                                |
| `descriptionKey` | `string`                     | `"description"`    | Custom description key.                          |
| `disabledKey`    | `string`                     | `"disabled"`       | Custom disabled key.                             |
| `completedKey`   | `string`                     | `"completed"`      | Custom completed key.                            |
| `linear`         | `boolean`                    | `true`             | Requires ordered progression.                    |
| `disabled`       | `boolean`                    | `false`            | Disables all step triggers.                      |
| `loop`           | `boolean`                    | `false`            | Loops roving keyboard focus.                     |
| `orientation`    | `"horizontal" \| "vertical"` | `"horizontal"`     | Layout and arrow-key axis.                       |
| `activationMode` | `"manual" \| "automatic"`    | `"manual"`         | Whether arrow focus also changes active step.    |
| `showControls`   | `boolean`                    | `false`            | Renders generated previous/next buttons.         |
| `unmountOnHide`  | `boolean`                    | `false`            | Unmounts inactive panels instead of hiding them. |
| `dir`            | `"ltr" \| "rtl"`             | `"ltr"`            | Horizontal keyboard direction.                   |
| `ariaLabel`      | `string`                     | `"Progress steps"` | Accessible ordered-list label.                   |
| `ui`             | `StepperUi`                  | —                  | Classes for structural parts.                    |

### Slots

| Slot                 | Props                                                                                | Description                            |
| -------------------- | ------------------------------------------------------------------------------------ | -------------------------------------- |
| `item` / item `slot` | `item`, `index`, `value`, `state`, `isActive`, `isCompleted`, `isDisabled`, `select` | Entire trigger body.                   |
| `indicator`          | `item`, `index`, `state`                                                             | Generated indicator content.           |
| `title`              | `item`, `index`                                                                      | Accessible title content.              |
| `description`        | `item`, `index`                                                                      | Accessible description content.        |
| `optional`           | `item`, `index`                                                                      | Optional label content.                |
| `separator`          | `item`, `index`, `isCompleted`                                                       | Connector content.                     |
| `panel`              | `item`, `index`, `value`                                                             | Shared panel content.                  |
| `panel-[value]`      | `item`, `index`, `value`, `isActive`                                                 | Value-specific panel content.          |
| `previous`           | `disabled`, `previous`                                                               | Previous button content.               |
| `next`               | `disabled`, `next`                                                                   | Next button content.                   |
| `state`              | current state and all navigation methods                                             | Optional state-driven custom controls. |

### Events

| Event               | Payload            | Description                                                   |
| ------------------- | ------------------ | ------------------------------------------------------------- |
| `update:modelValue` | `value`            | Fired after an accepted step change.                          |
| `value-change`      | `(value, details)` | Fired before step activation. `details.cancel()` prevents it. |
| `complete`          | `(value, details)` | Fired when the final item becomes active.                     |

### Keyboard

| Key                        | Behavior                                        |
| -------------------------- | ----------------------------------------------- |
| `ArrowRight` / `ArrowLeft` | Move roving focus horizontally, respecting RTL. |
| `ArrowDown` / `ArrowUp`    | Move roving focus vertically.                   |
| `Home`                     | Focus first permitted step.                     |
| `End`                      | Focus last permitted step.                      |
| `Enter` / `Space`          | Activate focused step in manual mode.           |

With `activationMode="automatic"`, arrow-key focus also activates the destination step.
