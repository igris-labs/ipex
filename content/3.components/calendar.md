---
title: Calendar
description: Locale-aware date grid with keyboard navigation, constraints, and single, multiple, or range selection.
navigation:
  icon: tabler:calendar
---

::component-example{name="calendar" size-options="xs,sm,md,lg,xl" default-size="sm"}
::

## Usage

```vue
<script setup lang="ts">
import { Calendar } from '~/components/ui/calendar'
</script>

<template>
  <Calendar calendar-label="Choose a date" />
</template>
```

## Variants and defaults

| Prop   | Values                       | Default |
| ------ | ---------------------------- | ------- |
| `size` | `xs`, `sm`, `md`, `lg`, `xl` | `sm`    |

## Models

| Model                 | Type                                                                         | Default                | Description                                                                                      |
| --------------------- | ---------------------------------------------------------------------------- | ---------------------- | ------------------------------------------------------------------------------------------------ |
| `v-model`             | `CalendarDateValue \| CalendarDateValue[] \| CalendarDateRange \| undefined` | `undefined`            | Selected single date, independent dates, or `{ start, end }` range according to `selectionMode`. |
| `v-model:placeholder` | `CalendarDateValue`                                                          | selected date or today | Month used as the start of the visible view.                                                     |

See [Range selection](/design-system/color#range-selection) for preview fills and primary-colored endpoints.

## Props

| Prop                            | Type                                 | Default           | Description                                                                          |
| ------------------------------- | ------------------------------------ | ----------------- | ------------------------------------------------------------------------------------ |
| `rangeColor`                    | `"secondary" \| "accent"`            | `"secondary"`     | Preview and committed middle fill; endpoints use primary.                            |
| `locale`                        | `string`                             | `"en-US"`         | Locale used for labels and week calculations.                                        |
| `dir`                           | `"ltr" \| "rtl"`                     | `"ltr"`           | Reading direction and horizontal arrow behavior.                                     |
| `calendarLabel`                 | `string`                             | `"Calendar"`      | Accessible root label prefix.                                                        |
| `weekStartsOn`                  | `"sun" \| "mon" \| ...`              | locale default    | Explicit first day of week.                                                          |
| `weekdayFormat`                 | `"narrow" \| "short" \| "long"`      | `"narrow"`        | Visible weekday label format.                                                        |
| `fixedWeeks`                    | `boolean`                            | `false`           | Always renders six weeks per month.                                                  |
| `numberOfMonths`                | `number`                             | `1`               | Adjacent month grids to render.                                                      |
| `pagedNavigation`               | `boolean`                            | `false`           | Navigates by `numberOfMonths` instead of one month.                                  |
| `preventDeselect`               | `boolean`                            | `false`           | Prevents removing an already selected date.                                          |
| `selectionMode`                 | `"single" \| "multiple" \| "range"`  | `"single"`        | Selects model shape and interaction behavior.                                        |
| `multiple`                      | `boolean`                            | `false`           | Deprecated compatibility alias for `selectionMode="multiple"`.                       |
| `allowNonContiguousRanges`      | `boolean`                            | `false`           | Allows unavailable or disabled dates inside a range, but not at either endpoint.     |
| `maximumDays`                   | `number`                             | —                 | Maximum inclusive length accepted in range mode.                                     |
| `fixedDate`                     | `"start" \| "end"`                   | —                 | Keeps one boundary fixed while range interactions update only the opposite boundary. |
| `disabled`                      | `boolean`                            | `false`           | Disables navigation and selection.                                                   |
| `readOnly`                      | `boolean`                            | `false`           | Allows focus/navigation but blocks selection.                                        |
| `initialFocus`                  | `boolean`                            | `false`           | Focuses the roving day after mount.                                                  |
| `disableDaysOutsideCurrentView` | `boolean`                            | `false`           | Prevents selecting outside days.                                                     |
| `minValue`                      | `CalendarDateValue`                  | —                 | Earliest selectable date and navigation boundary.                                    |
| `maxValue`                      | `CalendarDateValue`                  | —                 | Latest selectable date and navigation boundary.                                      |
| `isDateDisabled`                | `(date) => boolean`                  | —                 | Marks dates disabled by application rules.                                           |
| `isDateUnavailable`             | `(date) => boolean`                  | —                 | Marks dates unavailable and invalid when externally selected.                        |
| `nextPage`                      | `(placeholder) => CalendarDateValue` | add month(s)      | Custom next-page calculation.                                                        |
| `prevPage`                      | `(placeholder) => CalendarDateValue` | subtract month(s) | Custom previous-page calculation.                                                    |
| `ui`                            | `CalendarUi`                         | —                 | Classes for generated structural parts.                                              |

## Slots

| Slot       | Props                                                                                                                                     | Description                                      |
| ---------- | ----------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------ |
| `previous` | `disabled`                                                                                                                                | Previous control content.                        |
| `heading`  | `label`, `months`                                                                                                                         | Current month or range heading.                  |
| `next`     | `disabled`                                                                                                                                | Next control content.                            |
| `weekday`  | `date`, `label`                                                                                                                           | Weekday heading content.                         |
| `day`      | `date`, `label`, `selected`, `rangeStart`, `rangeEnd`, `inRange`, `highlighted`, `today`, `outside`, `disabled`, `unavailable`, `focused` | Day button content and complete selection state. |
| `footer`   | `value`, `placeholder`                                                                                                                    | Optional content after grids.                    |

## Emits

| Event                | Payload            | Description                                                         |
| -------------------- | ------------------ | ------------------------------------------------------------------- |
| `update:modelValue`  | `value`            | Fired after accepted selection changes.                             |
| `update:placeholder` | `date`             | Fired after accepted visible-month changes.                         |
| `value-change`       | `(value, details)` | Fires before selection changes. `details.cancel()` prevents update. |
| `placeholder-change` | `(date, details)`  | Fires before page changes. `details.cancel()` prevents update.      |

## Keyboard

| Key                                   | Behavior                              |
| ------------------------------------- | ------------------------------------- |
| `ArrowLeft` / `ArrowRight`            | Move one day, direction-aware in RTL. |
| `ArrowUp` / `ArrowDown`               | Move one week.                        |
| `Home` / `End`                        | Move to start/end of current week.    |
| `PageUp` / `PageDown`                 | Move one month.                       |
| `Shift + PageUp` / `Shift + PageDown` | Move one year.                        |
| `Enter` / `Space`                     | Select or deselect focused date.      |

Only one day is in the Tab sequence. Arrow navigation can cross month boundaries and updates `v-model:placeholder` before moving focus.

## Source

Copy `Calendar.vue` and `index.ts` into `components/ui/calendar` after [installation](/getting-started/installation).

::component-source{name="calendar"}
::
