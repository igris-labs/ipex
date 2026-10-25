---
title: Rating
description: Accessible rating input with fractional values, hover preview, keyboard navigation, and forms.
navigation:
  icon: tabler:star
---

::component-example{name="rating" size-options="xs,sm,md,lg,xl" default-size="sm"}
::

## Usage

```vue
<script setup lang="ts">
import { Rating } from '~/components/ui/rating'
</script>

<template>
  <Rating aria-label="Rate this component" />
</template>
```

## Variants and defaults

| Prop   | Values                       | Default |
| ------ | ---------------------------- | ------- |
| `size` | `xs`, `sm`, `md`, `lg`, `xl` | `sm`    |

## Props

| Prop              | Type                         | Default              | Description                                             |
| ----------------- | ---------------------------- | -------------------- | ------------------------------------------------------- |
| `length`          | `number`                     | `5`                  | Number of rating items.                                 |
| `step`            | `number`                     | `1`                  | Selection granularity, clamped from `0.01` through `1`. |
| `clearable`       | `boolean`                    | `false`              | Selecting the committed value clears it.                |
| `hoverable`       | `boolean`                    | `false`              | Previews pointer values before commit.                  |
| `loop`            | `boolean`                    | `true`               | Loops arrow navigation at range boundaries.             |
| `orientation`     | `"horizontal" \| "vertical"` | `"horizontal"`       | Layout and arrow-key axis.                              |
| `dir`             | `"ltr" \| "rtl"`             | `"ltr"`              | Horizontal navigation direction.                        |
| `autoFocus`       | `boolean`                    | `false`              | Focuses selected or first value on mount.               |
| `id`              | `string`                     | field/generated id   | Native validity input id.                               |
| `name`            | `string`                     | field name           | Native form field name.                                 |
| `required`        | `boolean`                    | `false`              | Requires a value above `0`.                             |
| `disabled`        | `boolean`                    | `false`              | Disables interaction and form submission.               |
| `readOnly`        | `boolean`                    | `false`              | Blocks value changes without disabling focus.           |
| `invalid`         | `boolean`                    | `false`              | Controlled invalid state.                               |
| `ariaLabel`       | `string`                     | `"Rating"`           | Accessible group label.                                 |
| `ariaLabelledby`  | `string`                     | —                    | Id of an external label.                                |
| `ariaDescribedby` | `string`                     | field ids            | Accessible description ids.                             |
| `getValueLabel`   | `(value, maximum) => string` | `"value of maximum"` | Accessible label for each radio value.                  |
| `ui`              | `RatingUi`                   | —                    | Classes for structural parts.                           |

## Slots

| Slot     | Props                                                     | Description                              |
| -------- | --------------------------------------------------------- | ---------------------------------------- |
| `item`   | `item`, `value`, `previewValue`, `fill`, `state`          | Replaces one full visual item.           |
| `empty`  | `item`                                                    | Empty item visual.                       |
| `filled` | `item`                                                    | Filled item visual.                      |
| `radio`  | `value`, `label`                                          | Content inside a generated radio target. |
| `state`  | `value`, `previewValue`, `items`, `hoveredValue`, `clear` | Optional state-driven custom UI.         |

## Emits

| Event               | Payload                    | Description                                                    |
| ------------------- | -------------------------- | -------------------------------------------------------------- |
| `update:modelValue` | `value`                    | Fired after an accepted selection.                             |
| `value-change`      | `(value, details)`         | Fired before commit. `details.cancel()` prevents it.           |
| `hover-change`      | `(value \| null, details)` | Fired when hover preview enters, moves, or leaves. Cancelable. |

## Keyboard

| Key                        | Behavior                                             |
| -------------------------- | ---------------------------------------------------- |
| `ArrowRight` / `ArrowLeft` | Move by `step` in horizontal mode, respecting RTL.   |
| `ArrowDown` / `ArrowUp`    | Move by `step` in vertical mode.                     |
| `Home`                     | Select the first value.                              |
| `End`                      | Select the maximum value.                            |
| `Space` / `Enter`          | Select focused value; may clear it when `clearable`. |

## Source

Copy `Rating.vue` and `index.ts` into `components/ui/rating` after [installation](/getting-started/installation).

::component-source{name="rating"}
::
