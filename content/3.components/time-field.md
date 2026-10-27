---
title: Time Field
description: Enter a time with separate editable segments.
navigation:
  icon: tabler:clock
---

## Demos

::component-example{name="time-field" size-options="xs,sm,md,lg,xl" default-size="sm" variant-options="outline,soft,bare" default-variant="outline"}
::

### Usage

```vue
<script setup lang="ts">
import { TimeField } from '~/components/ui/time-field'
</script>

<template>
  <TimeField aria-label="Start time" />
</template>
```

## Installation

Complete the [shared installation](/getting-started/installation). Copy `TimeField.vue` and `index.ts` into `app/components/ui/time-field/`.

::component-source{name="time-field"}
::

## API

### Variants and defaults

| Prop      | Values                       | Default   |
| --------- | ---------------------------- | --------- |
| `size`    | `xs`, `sm`, `md`, `lg`, `xl` | `sm`      |
| `variant` | `outline`, `soft`, `bare`    | `outline` |

### Models

| Model                 | Type                     | Default                   | Description                                                      |
| --------------------- | ------------------------ | ------------------------- | ---------------------------------------------------------------- |
| `v-model`             | `TimeValue \| undefined` | `undefined`               | Accepted clock value. Existing date and zone data are preserved. |
| `v-model:placeholder` | `TimeValue \| undefined` | `placeholder` or midnight | Base value used before a model exists; accepted edits update it. |

### Props

| Prop                | Type                             | Default                     | Description                                                          |
| ------------------- | -------------------------------- | --------------------------- | -------------------------------------------------------------------- |
| `id`                | `string`                         | Field id or generated       | Id placed on first segment.                                          |
| `name`              | `string`                         | Field name                  | Native form name.                                                    |
| `locale`            | `string`                         | `"en-US"`                   | Segment order, literals, labels, and default hour cycle.             |
| `dir`               | `"ltr" \| "rtl"`                 | `"ltr"`                     | Reading direction and horizontal focus movement.                     |
| `placeholder`       | `TimeValue`                      | midnight                    | Base time and value type used before selection.                      |
| `minValue`          | `TimeValue`                      | —                           | Earliest valid clock time.                                           |
| `maxValue`          | `TimeValue`                      | —                           | Latest valid clock time.                                             |
| `isTimeUnavailable` | `(time) => boolean`              | —                           | Application-level unavailable matcher.                               |
| `granularity`       | `"hour" \| "minute" \| "second"` | `"minute"`                  | Smallest rendered and committed unit.                                |
| `hourCycle`         | `12 \| 24`                       | locale preference           | Explicit hour cycle. Use `:hour-cycle="24"`, not a string attribute. |
| `hideTimeZone`      | `boolean`                        | `false`                     | Hides zone label for zoned values.                                   |
| `step`              | `{ hour?, minute?, second? }`    | each segment `1`            | Segment stepping and optional snap interval.                         |
| `stepSnapping`      | `boolean`                        | `false`                     | Rounds complete values to nearest combined step.                     |
| `required`          | `boolean`                        | `false`                     | Requires a complete time.                                            |
| `disabled`          | `boolean`                        | `false`                     | Disables all segments and native submission.                         |
| `readOnly`          | `boolean`                        | `false`                     | Allows focus but blocks edits.                                       |
| `invalid`           | `boolean`                        | `false`                     | Forces invalid presentation.                                         |
| `selectOnFocus`     | `boolean`                        | `true`                      | Selects segment text on focus.                                       |
| `autoAdvance`       | `boolean`                        | `true`                      | Moves focus after two digits.                                        |
| `ariaLabel`         | `string`                         | `"Time"`                    | Root label when no labelled-by relation exists.                      |
| `ariaLabelledby`    | `string`                         | Field label id              | Explicit label relation.                                             |
| `ariaDescribedby`   | `string`                         | Field description/error ids | Explicit description relation.                                       |
| `ui`                | `TimeFieldUi`                    | —                           | Classes for generated parts.                                         |

### Slots

| Slot         | Props                      | Description                                         |
| ------------ | -------------------------- | --------------------------------------------------- |
| `literal`    | `value`                    | Locale separator content.                           |
| `day-period` | `value`, `label`, `toggle` | AM/PM control content and event-safe toggle action. |
| `time-zone`  | `value`                    | Zone identifier content.                            |

### Events

| Event                | Payload                  | Description                                                                     |
| -------------------- | ------------------------ | ------------------------------------------------------------------------------- |
| `update:modelValue`  | `TimeValue \| undefined` | Fires after accepted value changes.                                             |
| `update:placeholder` | `TimeValue \| undefined` | Fires when accepted interaction updates placeholder.                            |
| `value-change`       | `(value, details)`       | Fires before model mutation. `details.cancel()` rejects it.                     |
| `value-commit`       | `(value, details)`       | Fires after complete input, keyboard, paste, day-period, blur, or clear commit. |

### Keyboard

| Key                        | Behavior                                                        |
| -------------------------- | --------------------------------------------------------------- |
| Number keys                | Replaces selected segment text. Complete segments update model. |
| `ArrowUp` / `ArrowDown`    | Steps focused segment, wrapping at boundaries.                  |
| `PageUp` / `PageDown`      | Steps focused segment by ten increments.                        |
| `Home` / `End`             | Sets segment minimum or maximum.                                |
| `ArrowLeft` / `ArrowRight` | Moves between segments and day period, reversed in RTL.         |
| `Backspace`                | Clears text; when empty, moves to previous segment.             |
| `A` / `P`                  | Sets AM or PM while day period is focused.                      |
| Paste                      | Distributes colon- or space-separated time parts.               |

Each numeric segment uses `role="spinbutton"` with value bounds. Native inputs and button semantics provide keyboard, mouse, touch, and screen-reader behavior.
