---
title: Year Range Picker
description: Select a range of years.
navigation:
  icon: tabler:calendar-plus
---

## Demos

::component-example{name="year-range-picker" size-options="xs,sm,md,lg,xl" default-size="sm"}
::

### Usage

```vue
<script setup lang="ts">
import { YearRangePicker } from '~/components/ui/year-range-picker'
</script>

<template>
  <YearRangePicker />
</template>
```

## Installation

Complete the [shared installation](/getting-started/installation). Copy `YearRangePicker.vue` and `index.ts` into `app/components/ui/year-range-picker/`.

::component-source{name="year-range-picker"}
::

## API

### Variants and defaults

| Prop   | Values                       | Default |
| ------ | ---------------------------- | ------- |
| `size` | `xs`, `sm`, `md`, `lg`, `xl` | `sm`    |

### Models

| Model                 | Type                | Default                 | Description                                           |
| --------------------- | ------------------- | ----------------------- | ----------------------------------------------------- |
| `v-model`             | `CalendarDateRange` | `{}`                    | Optional start and end years normalized to January 1. |
| `v-model:placeholder` | `CalendarDateValue` | selected start or today | First visible year.                                   |

See [Range selection](/design-system/color#range-selection) for preview fills and primary-colored endpoints.

### Props

| Prop                       | Type                                 | Default               | Description                                               |
| -------------------------- | ------------------------------------ | --------------------- | --------------------------------------------------------- |
| `rangeColor`               | `"secondary" \| "accent"`            | `"secondary"`         | Preview and committed middle fill; endpoints use primary. |
| `locale`                   | `string`                             | `"en-US"`             | Locale used for labels.                                   |
| `dir`                      | `"ltr" \| "rtl"`                     | `"ltr"`               | Reading direction.                                        |
| `calendarLabel`            | `string`                             | `"Year range picker"` | Accessible root label.                                    |
| `columns`                  | `number`                             | `3`                   | Visual grid columns.                                      |
| `yearsPerPage`             | `number`                             | `12`                  | Visible years and paging distance.                        |
| `allowNonContiguousRanges` | `boolean`                            | `false`               | Allows blocked interior years.                            |
| `maximumYears`             | `number`                             | —                     | Maximum inclusive range length.                           |
| `fixedDate`                | `"start" \| "end"`                   | —                     | Keeps one endpoint fixed.                                 |
| `disabled`                 | `boolean`                            | `false`               | Disables paging and selection.                            |
| `readOnly`                 | `boolean`                            | `false`               | Allows navigation but blocks selection.                   |
| `initialFocus`             | `boolean`                            | `false`               | Focuses selected/current year on mount.                   |
| `minValue` / `maxValue`    | `CalendarDateValue`                  | —                     | Selection and paging boundaries.                          |
| `isYearDisabled`           | `(date) => boolean`                  | —                     | Marks years disabled.                                     |
| `isYearUnavailable`        | `(date) => boolean`                  | —                     | Marks years unavailable.                                  |
| `nextPage` / `prevPage`    | `(placeholder) => CalendarDateValue` | page arithmetic       | Custom page calculations.                                 |
| `ui`                       | `YearRangePickerUi`                  | —                     | Classes for generated parts.                              |

### Slots

| Slot       | Props                                                                                                                 | Description                   |
| ---------- | --------------------------------------------------------------------------------------------------------------------- | ----------------------------- |
| `previous` | `disabled`                                                                                                            | Previous control content.     |
| `heading`  | `label`, `items`                                                                                                      | Visible year-range heading.   |
| `next`     | `disabled`                                                                                                            | Next control content.         |
| `year`     | `date`, `label`, `selected`, `rangeStart`, `rangeEnd`, `inRange`, `highlighted`, `disabled`, `unavailable`, `focused` | Year content and range state. |
| `footer`   | `value`, `placeholder`                                                                                                | Optional content after grid.  |

### Events

| Event                | Payload             | Description                         |
| -------------------- | ------------------- | ----------------------------------- |
| `update:modelValue`  | `CalendarDateRange` | Fires after accepted range changes. |
| `update:placeholder` | `CalendarDateValue` | Fires after accepted page changes.  |
| `value-change`       | `(range, details)`  | Cancelable range change.            |
| `placeholder-change` | `(date, details)`   | Cancelable page change.             |

### Keyboard

| Key                                   | Behavior                                                                 |
| ------------------------------------- | ------------------------------------------------------------------------ |
| Arrow keys                            | Move by one year or one visual row. Horizontal movement reverses in RTL. |
| `Home` / `End`                        | Moves to row boundary.                                                   |
| `PageUp` / `PageDown`                 | Moves one page.                                                          |
| `Shift + PageUp` / `Shift + PageDown` | Moves ten pages.                                                         |
| `Enter` / `Space`                     | Sets range start or completes range end.                                 |

Pointer hover and keyboard focus preview a pending range. Touch input selects each endpoint.
