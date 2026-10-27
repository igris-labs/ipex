---
title: Month Range Picker
description: Select a range of months.
navigation:
  icon: tabler:calendar-share
---

## Demos

::component-example{name="month-range-picker" size-options="xs,sm,md,lg,xl" default-size="sm"}
::

### Usage

```vue
<script setup lang="ts">
import { MonthRangePicker } from '~/components/ui/month-range-picker'
</script>

<template>
  <MonthRangePicker />
</template>
```

## Installation

Complete the [shared installation](/getting-started/installation). Copy `MonthRangePicker.vue` and `index.ts` into `app/components/ui/month-range-picker/`.

::component-source{name="month-range-picker"}
::

## API

### Variants and defaults

| Prop   | Values                       | Default |
| ------ | ---------------------------- | ------- |
| `size` | `xs`, `sm`, `md`, `lg`, `xl` | `sm`    |

### Models

| Model                 | Type                | Default                 | Description                                   |
| --------------------- | ------------------- | ----------------------- | --------------------------------------------- |
| `v-model`             | `CalendarDateRange` | `{}`                    | Optional normalized `start` and `end` months. |
| `v-model:placeholder` | `CalendarDateValue` | selected start or today | Year displayed by grid.                       |

See [Range selection](/design-system/color#range-selection) for preview fills and primary-colored endpoints.

### Props

| Prop                       | Type                                 | Default                | Description                                               |
| -------------------------- | ------------------------------------ | ---------------------- | --------------------------------------------------------- |
| `rangeColor`               | `"secondary" \| "accent"`            | `"secondary"`          | Preview and committed middle fill; endpoints use primary. |
| `locale`                   | `string`                             | `"en-US"`              | Locale used for labels.                                   |
| `dir`                      | `"ltr" \| "rtl"`                     | `"ltr"`                | Reading direction and horizontal arrows.                  |
| `calendarLabel`            | `string`                             | `"Month range picker"` | Accessible root label.                                    |
| `columns`                  | `number`                             | `3`                    | Number of month columns.                                  |
| `allowNonContiguousRanges` | `boolean`                            | `false`                | Allows blocked interior months.                           |
| `maximumMonths`            | `number`                             | —                      | Maximum inclusive range length.                           |
| `fixedDate`                | `"start" \| "end"`                   | —                      | Keeps one endpoint fixed.                                 |
| `disabled`                 | `boolean`                            | `false`                | Disables paging and selection.                            |
| `readOnly`                 | `boolean`                            | `false`                | Allows navigation but blocks selection.                   |
| `initialFocus`             | `boolean`                            | `false`                | Focuses selected/current month on mount.                  |
| `minValue`                 | `CalendarDateValue`                  | —                      | Earliest selectable month.                                |
| `maxValue`                 | `CalendarDateValue`                  | —                      | Latest selectable month.                                  |
| `isMonthDisabled`          | `(date) => boolean`                  | —                      | Marks months disabled.                                    |
| `isMonthUnavailable`       | `(date) => boolean`                  | —                      | Marks months unavailable.                                 |
| `nextPage`                 | `(placeholder) => CalendarDateValue` | add one year           | Custom next page.                                         |
| `prevPage`                 | `(placeholder) => CalendarDateValue` | subtract one year      | Custom previous page.                                     |
| `ui`                       | `MonthRangePickerUi`                 | —                      | Classes for generated parts.                              |

### Slots

| Slot       | Props                                                                                                                 | Description                    |
| ---------- | --------------------------------------------------------------------------------------------------------------------- | ------------------------------ |
| `previous` | `disabled`                                                                                                            | Previous control content.      |
| `heading`  | `label`, `items`                                                                                                      | Year heading.                  |
| `next`     | `disabled`                                                                                                            | Next control content.          |
| `month`    | `date`, `label`, `selected`, `rangeStart`, `rangeEnd`, `inRange`, `highlighted`, `disabled`, `unavailable`, `focused` | Month content and range state. |
| `footer`   | `value`, `placeholder`                                                                                                | Optional footer.               |

### Events

| Event                | Payload             | Description                         |
| -------------------- | ------------------- | ----------------------------------- |
| `update:modelValue`  | `CalendarDateRange` | Fires after accepted range changes. |
| `update:placeholder` | `CalendarDateValue` | Fires after accepted page changes.  |
| `value-change`       | `(range, details)`  | Cancelable range change.            |
| `placeholder-change` | `(date, details)`   | Cancelable page change.             |

### Keyboard

| Key                                   | Behavior                                                                                          |
| ------------------------------------- | ------------------------------------------------------------------------------------------------- |
| Arrow keys                            | Move one month horizontally or one `columns` row vertically. Horizontal movement reverses in RTL. |
| `Home` / `End`                        | Moves to row boundary.                                                                            |
| `PageUp` / `PageDown`                 | Moves one year.                                                                                   |
| `Shift + PageUp` / `Shift + PageDown` | Moves ten years.                                                                                  |
| `Enter` / `Space`                     | Sets range start or completes range end.                                                          |

Pointer hover previews a pending range; touch activation selects endpoints without relying on hover.
