---
title: Time Range Field
description: Coordinated segmented start and end times with aggregate validation and native form values.
navigation:
  icon: tabler:clock-hour-4
---

::component-example{name="time-range-field" size-options="xs,sm,md,lg,xl" default-size="sm"}
::

## Usage

```vue
<script setup lang="ts">
import { TimeRangeField } from '~/components/ui/time-range-field'
</script>

<template>
  <TimeRangeField aria-label="Working hours" />
</template>
```

## Variants and defaults

| Prop   | Values                       | Default |
| ------ | ---------------------------- | ------- |
| `size` | `xs`, `sm`, `md`, `lg`, `xl` | `sm`    |

## Models

| Model                 | Type                     | Default       | Description                                                                 |
| --------------------- | ------------------------ | ------------- | --------------------------------------------------------------------------- |
| `v-model`             | `TimeRange`              | `{}`          | Optional `start` and `end` TimeValues. Partial segment text stays internal. |
| `v-model:placeholder` | `TimeValue \| undefined` | `placeholder` | Shared base value for both endpoints.                                       |

## Props

| Prop                                 | Type                             | Default               | Description                                    |
| ------------------------------------ | -------------------------------- | --------------------- | ---------------------------------------------- |
| `id`                                 | `string`                         | Field id or generated | Start field id; end adds `-end`.               |
| `name`                               | `string`                         | Field name            | Derives `.start` and `.end` form names.        |
| `startName` / `endName`              | `string`                         | derived               | Explicit native form names.                    |
| `locale`                             | `string`                         | `"en-US"`             | Segment order, labels, and default hour cycle. |
| `dir`                                | `"ltr" \| "rtl"`                 | `"ltr"`               | Reading direction.                             |
| `placeholder`                        | `TimeValue`                      | midnight              | Shared base time and value type.               |
| `minValue` / `maxValue`              | `TimeValue`                      | —                     | Endpoint boundaries.                           |
| `isTimeUnavailable`                  | `(time) => boolean`              | —                     | Endpoint application constraint.               |
| `granularity`                        | `"hour" \| "minute" \| "second"` | `"minute"`            | Smallest endpoint unit.                        |
| `hourCycle`                          | `12 \| 24`                       | locale preference     | Explicit hour cycle.                           |
| `hideTimeZone`                       | `boolean`                        | `false`               | Hides zoned endpoint labels.                   |
| `step`                               | `{ hour?, minute?, second? }`    | each `1`              | Endpoint keyboard step.                        |
| `stepSnapping`                       | `boolean`                        | `false`               | Snaps complete endpoint values.                |
| `required`                           | `boolean`                        | `false`               | Requires both endpoints.                       |
| `disabled`                           | `boolean`                        | `false`               | Disables endpoints and form submission.        |
| `readOnly`                           | `boolean`                        | `false`               | Allows focus but blocks edits.                 |
| `invalid`                            | `boolean`                        | `false`               | Forces invalid presentation.                   |
| `selectOnFocus`                      | `boolean`                        | `true`                | Selects focused segment text.                  |
| `autoAdvance`                        | `boolean`                        | `true`                | Advances after two digits.                     |
| `startLabel`                         | `string`                         | `"Start time"`        | Accessible start label.                        |
| `endLabel`                           | `string`                         | `"End time"`          | Accessible end label.                          |
| `ariaLabel`                          | `string`                         | `"Time range"`        | Root label without Field label relation.       |
| `ariaLabelledby` / `ariaDescribedby` | `string`                         | Field relations       | Explicit ARIA relationships.                   |
| `ui`                                 | `TimeRangeFieldUi`               | —                     | Classes for range and endpoint parts.          |

## Slots

| Slot                                  | Props                      | Description                                         |
| ------------------------------------- | -------------------------- | --------------------------------------------------- |
| `start-literal` / `end-literal`       | `value`                    | Endpoint locale separators.                         |
| `start-day-period` / `end-day-period` | `value`, `label`, `toggle` | Endpoint AM/PM content.                             |
| `start-time-zone` / `end-time-zone`   | `value`                    | Endpoint zone content.                              |
| `separator`                           | —                          | Visual separator; hidden from assistive technology. |

## Emits

| Event                | Payload                  | Description                                    |
| -------------------- | ------------------------ | ---------------------------------------------- |
| `update:modelValue`  | `TimeRange`              | Fires after accepted endpoint changes.         |
| `update:placeholder` | `TimeValue \| undefined` | Fires after accepted placeholder changes.      |
| `value-change`       | `(range, details)`       | Cancelable proposed range update.              |
| `value-commit`       | `(range, details)`       | Accepted endpoint commit with prefixed reason. |

## Keyboard

Each endpoint uses Time Field keyboard behavior:

| Key                        | Behavior                                                          |
| -------------------------- | ----------------------------------------------------------------- |
| Number keys / paste        | Edits focused endpoint segment.                                   |
| `ArrowUp` / `ArrowDown`    | Steps segment.                                                    |
| `PageUp` / `PageDown`      | Steps by ten increments.                                          |
| `Home` / `End`             | Sets segment boundary.                                            |
| `ArrowLeft` / `ArrowRight` | Moves within current endpoint.                                    |
| `Tab` / `Shift + Tab`      | Uses native order across both endpoints and surrounding controls. |
| `A` / `P`                  | Sets focused endpoint day period.                                 |

Mouse and touch edit the native inputs and day-period buttons. The component does not require hover input.

## Source

Copy `TimeRangeField.vue` and `index.ts` into `components/ui/time-range-field` after [installation](/getting-started/installation).

Also copy [Time Field](/components/time-field); this recipe uses their styled parts.

::component-source{name="time-range-field"}
::
