---
title: Year Picker
description: Accessible paged year grid with constraints and single or multiple selection.
navigation:
  icon: tabler:calendar-due
---

::component-example{name="year-picker" size-options="xs,sm,md,lg,xl" default-size="sm"}
::

## Usage

```vue
<script setup lang="ts">
import { YearPicker } from '~/components/ui/year-picker'
</script>

<template>
  <YearPicker />
</template>
```

## Variants and defaults

| Prop   | Values                       | Default |
| ------ | ---------------------------- | ------- |
| `size` | `xs`, `sm`, `md`, `lg`, `xl` | `sm`    |

## Models

| Model                 | Type                                                    | Default                | Description                                |
| --------------------- | ------------------------------------------------------- | ---------------------- | ------------------------------------------ |
| `v-model`             | `CalendarDateValue \| CalendarDateValue[] \| undefined` | `undefined`            | Selected year(s), normalized to January 1. |
| `v-model:placeholder` | `CalendarDateValue`                                     | selected year or today | First year displayed on current page.      |

## Props

| Prop                    | Type                                 | Default         | Description                             |
| ----------------------- | ------------------------------------ | --------------- | --------------------------------------- |
| `locale`                | `string`                             | `"en-US"`       | Locale used for year labels.            |
| `dir`                   | `"ltr" \| "rtl"`                     | `"ltr"`         | Reading direction.                      |
| `calendarLabel`         | `string`                             | `"Year picker"` | Accessible root label.                  |
| `columns`               | `number`                             | `3`             | Visual grid columns.                    |
| `yearsPerPage`          | `number`                             | `12`            | Visible years and paging distance.      |
| `multiple`              | `boolean`                            | `false`         | Enables independent multiple selection. |
| `preventDeselect`       | `boolean`                            | `false`         | Prevents removing a selected year.      |
| `disabled`              | `boolean`                            | `false`         | Disables paging and selection.          |
| `readOnly`              | `boolean`                            | `false`         | Allows navigation but blocks selection. |
| `initialFocus`          | `boolean`                            | `false`         | Focuses selected/current year on mount. |
| `minValue` / `maxValue` | `CalendarDateValue`                  | —               | Selection and paging boundaries.        |
| `isYearDisabled`        | `(date) => boolean`                  | —               | Marks years disabled.                   |
| `isYearUnavailable`     | `(date) => boolean`                  | —               | Marks years unavailable.                |
| `nextPage` / `prevPage` | `(placeholder) => CalendarDateValue` | page arithmetic | Replaces default page calculation.      |
| `ui`                    | `YearPickerUi`                       | —               | Classes for generated parts.            |

## Slots

| Slot       | Props                                                                      | Description                    |
| ---------- | -------------------------------------------------------------------------- | ------------------------------ |
| `previous` | `disabled`                                                                 | Previous control content.      |
| `heading`  | `label`, `items`                                                           | Visible year-range heading.    |
| `next`     | `disabled`                                                                 | Next control content.          |
| `year`     | `date`, `label`, `selected`, `today`, `disabled`, `unavailable`, `focused` | Year button content and state. |
| `footer`   | `value`, `placeholder`                                                     | Optional content after grid.   |

## Emits

| Event                | Payload            | Description                                                 |
| -------------------- | ------------------ | ----------------------------------------------------------- |
| `update:modelValue`  | `value`            | Fires after accepted selection changes.                     |
| `update:placeholder` | `date`             | Fires after accepted page changes.                          |
| `value-change`       | `(value, details)` | Fires before selection. `details.cancel()` prevents update. |
| `placeholder-change` | `(date, details)`  | Fires before paging. `details.cancel()` prevents update.    |

## Keyboard

| Key                                   | Behavior                         |
| ------------------------------------- | -------------------------------- |
| `ArrowLeft` / `ArrowRight`            | Moves one year, reversed in RTL. |
| `ArrowUp` / `ArrowDown`               | Moves one visual row.            |
| `Home` / `End`                        | Moves to row boundary.           |
| `PageUp` / `PageDown`                 | Moves one `yearsPerPage` page.   |
| `Shift + PageUp` / `Shift + PageDown` | Moves ten pages.                 |
| `Enter` / `Space`                     | Selects focused year.            |

## Source

Copy `YearPicker.vue` and `index.ts` into `components/ui/year-picker` after [installation](/getting-started/installation).

::component-source{name="year-picker"}
::
