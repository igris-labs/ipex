---
title: Month Picker
description: Select one or more months from a grid.
navigation:
  icon: tabler:calendar-stats
---

## Demos

::component-example{name="month-picker" size-options="xs,sm,md,lg,xl" default-size="sm"}
::

### Usage

```vue
<script setup lang="ts">
import { MonthPicker } from '~/components/ui/month-picker'
</script>

<template>
  <MonthPicker />
</template>
```

## Installation

Complete the [shared installation](/getting-started/installation). Copy `MonthPicker.vue` and `index.ts` into `app/components/ui/month-picker/`.

::component-source{name="month-picker"}
::

## API

### Variants and defaults

| Prop   | Values                       | Default |
| ------ | ---------------------------- | ------- |
| `size` | `xs`, `sm`, `md`, `lg`, `xl` | `sm`    |

### Models

| Model                 | Type                                                    | Default                 | Description                                                                                     |
| --------------------- | ------------------------------------------------------- | ----------------------- | ----------------------------------------------------------------------------------------------- |
| `v-model`             | `CalendarDateValue \| CalendarDateValue[] \| undefined` | `undefined`             | Selected month or selected months when `multiple` is enabled. Values are normalized to day `1`. |
| `v-model:placeholder` | `CalendarDateValue`                                     | selected month or today | Year displayed by the grid.                                                                     |

### Props

| Prop                 | Type                                 | Default           | Description                                                                 |
| -------------------- | ------------------------------------ | ----------------- | --------------------------------------------------------------------------- |
| `locale`             | `string`                             | `"en-US"`         | Locale used for month and year labels.                                      |
| `dir`                | `"ltr" \| "rtl"`                     | `"ltr"`           | Reading direction and horizontal arrow behavior.                            |
| `calendarLabel`      | `string`                             | `"Month picker"`  | Accessible root label.                                                      |
| `columns`            | `number`                             | `3`               | Number of month columns.                                                    |
| `multiple`           | `boolean`                            | `false`           | Enables independent multiple selection.                                     |
| `preventDeselect`    | `boolean`                            | `false`           | Prevents removing an already selected month.                                |
| `disabled`           | `boolean`                            | `false`           | Disables paging and selection.                                              |
| `readOnly`           | `boolean`                            | `false`           | Allows navigation but blocks selection.                                     |
| `initialFocus`       | `boolean`                            | `false`           | Focuses the selected month, current month, or first visible month on mount. |
| `minValue`           | `CalendarDateValue`                  | —                 | Earliest selectable month and page boundary.                                |
| `maxValue`           | `CalendarDateValue`                  | —                 | Latest selectable month and page boundary.                                  |
| `isMonthDisabled`    | `(date) => boolean`                  | —                 | Marks a month disabled by application rules.                                |
| `isMonthUnavailable` | `(date) => boolean`                  | —                 | Marks a month unavailable.                                                  |
| `nextPage`           | `(placeholder) => CalendarDateValue` | add one year      | Custom next-page calculation.                                               |
| `prevPage`           | `(placeholder) => CalendarDateValue` | subtract one year | Custom previous-page calculation.                                           |
| `ui`                 | `MonthPickerUi`                      | —                 | Classes for generated parts.                                                |

### Slots

| Slot       | Props                                                                      | Description                     |
| ---------- | -------------------------------------------------------------------------- | ------------------------------- |
| `previous` | `disabled`                                                                 | Previous control content.       |
| `heading`  | `label`, `items`                                                           | Current year heading.           |
| `next`     | `disabled`                                                                 | Next control content.           |
| `month`    | `date`, `label`, `selected`, `today`, `disabled`, `unavailable`, `focused` | Month button content and state. |
| `footer`   | `value`, `placeholder`                                                     | Optional content after grid.    |

### Events

| Event                | Payload            | Description                                                 |
| -------------------- | ------------------ | ----------------------------------------------------------- |
| `update:modelValue`  | `value`            | Fires after accepted selection changes.                     |
| `update:placeholder` | `date`             | Fires after accepted page changes.                          |
| `value-change`       | `(value, details)` | Fires before selection. `details.cancel()` prevents update. |
| `placeholder-change` | `(date, details)`  | Fires before paging. `details.cancel()` prevents update.    |

### Keyboard

| Key                                   | Behavior                                     |
| ------------------------------------- | -------------------------------------------- |
| `ArrowLeft` / `ArrowRight`            | Moves one month, reversed in RTL.            |
| `ArrowUp` / `ArrowDown`               | Moves one visual row using `columns`.        |
| `Home` / `End`                        | Moves to first or last month in current row. |
| `PageUp` / `PageDown`                 | Moves one year.                              |
| `Shift + PageUp` / `Shift + PageDown` | Moves ten years.                             |
| `Enter` / `Space`                     | Selects focused month.                       |

Native buttons provide pointer and touch activation. Focus never scrolls the document unexpectedly.
