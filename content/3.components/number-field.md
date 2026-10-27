---
title: Number Field
description: Enter a number or adjust it with increment and decrement buttons.
navigation:
  icon: tabler:number-123
---

## Demos

::component-example{name="number-field" size-options="xs,sm,md,lg,xl" default-size="sm" variant-options="outline,soft,bare" default-variant="outline"}
::

### Usage

```vue
<script setup lang="ts">
import { NumberField } from '~/components/ui/number-field'
</script>

<template>
  <NumberField :min="0" :max="100" aria-label="Capacity" />
</template>
```

## Installation

Complete the [shared installation](/getting-started/installation). Copy `NumberField.vue` and `index.ts` into `app/components/ui/number-field/`.

::component-source{name="number-field"}
::

## API

### Variants and defaults

| Prop      | Values                       | Default   |
| --------- | ---------------------------- | --------- |
| `size`    | `xs`, `sm`, `md`, `lg`, `xl` | `sm`      |
| `variant` | `outline`, `soft`, `bare`    | `outline` |

### Props

| Prop                 | Type                             | Default                 | Description                                            |
| -------------------- | -------------------------------- | ----------------------- | ------------------------------------------------------ |
| `id`                 | `string`                         | field id                | Input id.                                              |
| `name`               | `string`                         | field name              | Form field name.                                       |
| `min`                | `number`                         | —                       | Minimum value.                                         |
| `max`                | `number`                         | —                       | Maximum value.                                         |
| `step`               | `number`                         | `1`                     | Increment/decrement step.                              |
| `placeholder`        | `string`                         | —                       | Native input placeholder.                              |
| `required`           | `boolean`                        | `false`                 | Required state.                                        |
| `disabled`           | `boolean`                        | `false`                 | Disabled state.                                        |
| `readonly`           | `boolean`                        | `false`                 | Read-only state.                                       |
| `invalid`            | `boolean`                        | `false`                 | Sets invalid attrs.                                    |
| `stepSnapping`       | `boolean`                        | `true`                  | Snap input/button values to the nearest step.          |
| `disableWheelChange` | `boolean`                        | `false`                 | Disables focused wheel stepping.                       |
| `invertWheelChange`  | `boolean`                        | `false`                 | Reverses wheel direction.                              |
| `focusOnChange`      | `boolean`                        | `true`                  | Focuses the input after button/scrub changes.          |
| `scrubLabel`         | `string`                         | —                       | Renders a drag scrub area before the decrement button. |
| `scrubStep`          | `number`                         | `step`                  | Step used by scrub dragging.                           |
| `disableScrub`       | `boolean`                        | `false`                 | Disables scrub dragging.                               |
| `getValueLabel`      | `(value) => string \| undefined` | —                       | Human-readable `aria-valuetext`.                       |
| `ariaLabel`          | `string`                         | —                       | Accessible label when no visible label exists.         |
| `ariaDescribedby`    | `string`                         | field description/error | Accessible description ids.                            |
| `ui`                 | `NumberFieldUi`                  | —                       | Classes for structural parts.                          |

### Slots

| Slot        | Props                  | Description                      |
| ----------- | ---------------------- | -------------------------------- |
| `scrub`     | `value`, `isScrubbing` | Custom scrub area content.       |
| `decrement` | `value`, `decrement`   | Custom decrement button content. |
| `increment` | `value`, `increment`   | Custom increment button content. |

### Events

| Event          | Payload            | Description                                                             |
| -------------- | ------------------ | ----------------------------------------------------------------------- |
| `value-change` | `(value, details)` | Fired before model updates. `details.cancel()` prevents the update.     |
| `value-commit` | `(value, details)` | Fired on blur and after button, wheel, keyboard, or scrub interactions. |

### Keyboard

| Key                     | Behavior                            |
| ----------------------- | ----------------------------------- |
| `ArrowUp` / `ArrowDown` | Increment/decrement by `step`.      |
| `PageUp` / `PageDown`   | Increment/decrement by `step * 10`. |
| `Home`                  | Set to `min` when provided.         |
| `End`                   | Set to `max` when provided.         |

Mouse wheel changes the value only while the input is focused. Set `disableWheelChange` to opt out.
