---
title: Date Range Field
description: Locale-ordered segmented start and end dates with aggregate validation, fixed endpoints, and native forms.
navigation:
  icon: tabler:calendar-week
---

::component-example{name="date-range-field" size-options="xs,sm,md,lg,xl" default-size="sm"}
::

## Usage

```vue
<script setup lang="ts">
import { DateRangeField } from '~/components/ui/date-range-field'
</script>

<template>
  <DateRangeField aria-label="Project dates" />
</template>
```

## Variants and defaults

| Prop   | Values                       | Default |
| ------ | ---------------------------- | ------- |
| `size` | `xs`, `sm`, `md`, `lg`, `xl` | `sm`    |

## Props

| Prop                       | Type                | Default                     | Description                                                          |
| -------------------------- | ------------------- | --------------------------- | -------------------------------------------------------------------- |
| `id`                       | `string`            | Field/generated id          | ID assigned to the first start segment.                              |
| `name`                     | `string`            | Field name                  | Base native form name used to create `.start` and `.end` names.      |
| `startName`                | `string`            | `${name}.start`             | Explicit start form field name.                                      |
| `endName`                  | `string`            | `${name}.end`               | Explicit end form field name.                                        |
| `locale`                   | `string`            | `"en-US"`                   | Segment order, separators, and accessible labels for both endpoints. |
| `dir`                      | `"ltr" \| "rtl"`    | `"ltr"`                     | Reading direction and segment arrow behavior.                        |
| `placeholder`              | `CalendarDateValue` | today                       | Date context used while endpoint segments are partial.               |
| `minValue`                 | `CalendarDateValue` | -                           | Earliest valid start and endpoint value.                             |
| `maxValue`                 | `CalendarDateValue` | -                           | Latest valid end and endpoint value.                                 |
| `isDateUnavailable`        | `(date) => boolean` | -                           | Application rule for unavailable dates.                              |
| `allowNonContiguousRanges` | `boolean`           | `false`                     | Allows unavailable dates inside, but not at boundaries.              |
| `maximumDays`              | `number`            | -                           | Maximum inclusive range length.                                      |
| `fixedDate`                | `"start" \| "end"`  | -                           | Makes one endpoint read-only.                                        |
| `required`                 | `boolean`           | `false`                     | Requires both endpoints for native validity.                         |
| `disabled`                 | `boolean`           | `false`                     | Disables editing and native form participation.                      |
| `readOnly`                 | `boolean`           | `false`                     | Keeps segments focusable but blocks changes.                         |
| `invalid`                  | `boolean`           | `false`                     | Forces invalid styling and ARIA state.                               |
| `selectOnFocus`            | `boolean`           | `true`                      | Selects focused segment text.                                        |
| `autoAdvance`              | `boolean`           | `true`                      | Advances after a segment reaches full length.                        |
| `startLabel`               | `string`            | `"Start date"`              | Accessible label for the start Date Field.                           |
| `endLabel`                 | `string`            | `"End date"`                | Accessible label for the end Date Field.                             |
| `ariaLabel`                | `string`            | `"Date range"`              | Root group label without an external label.                          |
| `ariaLabelledby`           | `string`            | Field label ID              | External label relationship.                                         |
| `ariaDescribedby`          | `string`            | Field description/error IDs | External description relationship.                                   |
| `ui`                       | `DateRangeFieldUi`  | -                           | Classes for generated structural parts.                              |

## Slots

| Slot            | Props   | Description                                           |
| --------------- | ------- | ----------------------------------------------------- |
| `start-literal` | `value` | Replaces locale separators inside the start endpoint. |
| `separator`     | -       | Replaces the visual separator between endpoints.      |
| `end-literal`   | `value` | Replaces locale separators inside the end endpoint.   |

## Emits

| Event               | Payload             | Description                                                            |
| ------------------- | ------------------- | ---------------------------------------------------------------------- |
| `update:modelValue` | `CalendarDateRange` | Fires after an accepted endpoint change or clear.                      |
| `value-change`      | `(range, details)`  | Fires before model changes. `details.cancel()` prevents the change.    |
| `value-commit`      | `(range, details)`  | Fires after accepted endpoint input, keyboard, paste, or blur commits. |

## Keyboard

Each endpoint follows [Date Field keyboard behavior](/components/date-field#keyboard). `Tab` moves through start segments, then end segments. Root uses `role="group"`; each date segment remains a labeled `role="spinbutton"`.

## Source

Copy `DateRangeField.vue` and `index.ts` into `components/ui/date-range-field` after [installation](/getting-started/installation).

Also copy [Date Field](/components/date-field), [Calendar](/components/calendar); this recipe uses their styled parts.

::component-source{name="date-range-field"}
::
