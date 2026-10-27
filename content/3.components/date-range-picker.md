---
title: Date Range Picker
description: Enter a date range by typing or selecting from a calendar.
navigation:
  icon: tabler:calendar-month
---

## Demos

::component-example{name="date-range-picker" size-options="xs,sm,md,lg,xl" default-size="sm" default-variant="outline"}
::

### Usage

```vue
<script setup lang="ts">
import { DateRangePicker } from '~/components/ui/date-range-picker'
</script>

<template>
  <DateRangePicker aria-label="Project dates" />
</template>
```

### Typing and calendar selection

Click a date segment to type or use the calendar button to choose a date. Focus and text selection use the neutral secondary fill with its paired foreground. A subtle ring marks the active segment. Slashes have their own spacing. The calendar opens outside the preview frame and follows the same size as the field.

## Installation

Complete the [shared installation](/getting-started/installation). Copy `DateRangePicker.vue` and `index.ts` into `app/components/ui/date-range-picker/`. Also copy the required components: [Calendar](/components/calendar), [Date Field](/components/date-field), [Date Range Field](/components/date-range-field).

::component-source{name="date-range-picker"}
::

## API

### Variants and defaults

| Prop      | Values                       | Default   |
| --------- | ---------------------------- | --------- |
| `size`    | `xs`, `sm`, `md`, `lg`, `xl` | `sm`      |
| `variant` | `outline`, `soft`, `bare`    | `outline` |

### Models

| Model                 | Type                | Default                    | Description                               |
| --------------------- | ------------------- | -------------------------- | ----------------------------------------- |
| `v-model`             | `CalendarDateRange` | `{}`                       | Shared typed and calendar-selected range. |
| `v-model:open`        | `boolean`           | `false`                    | Popup open state.                         |
| `v-model:placeholder` | `CalendarDateValue` | selected endpoint or today | First visible calendar month.             |

See [Range selection](/design-system/color#range-selection) for preview fills and primary-colored endpoints.

### Props

Date Range Picker accepts Date Range Field props `id`, `name`, `startName`, `endName`, `locale`, `dir`, `minValue`, `maxValue`, `isDateUnavailable`, `allowNonContiguousRanges`, `maximumDays`, `fixedDate`, `required`, `disabled`, `readOnly`, `invalid`, `selectOnFocus`, `autoAdvance`, endpoint labels, and ARIA relationships.

| Prop                            | Type                                     | Default               | Description                                               |
| ------------------------------- | ---------------------------------------- | --------------------- | --------------------------------------------------------- |
| `rangeColor`                    | `"secondary" \| "accent"`                | `"secondary"`         | Preview and committed middle fill; endpoints use primary. |
| `isDateDisabled`                | `(date) => boolean`                      | -                     | Calendar-only disabled-date rule.                         |
| `calendarLabel`                 | `string`                                 | `"Choose date range"` | Trigger and popup accessible label.                       |
| `closeLabel`                    | `string`                                 | -                     | Renders an explicit close button with this label.         |
| `closeOnSelect`                 | `boolean`                                | `true`                | Closes after both endpoints are selected.                 |
| `weekStartsOn`                  | `"sun" \| "mon" \| ...`                  | locale default        | Explicit first weekday.                                   |
| `weekdayFormat`                 | `"narrow" \| "short" \| "long"`          | `"narrow"`            | Visible weekday format.                                   |
| `fixedWeeks`                    | `boolean`                                | `false`               | Renders six weeks per month for stable popup height.      |
| `numberOfMonths`                | `number`                                 | `1`                   | Adjacent month grids.                                     |
| `pagedNavigation`               | `boolean`                                | `false`               | Moves by `numberOfMonths`.                                |
| `disableDaysOutsideCurrentView` | `boolean`                                | `false`               | Blocks selecting outside days.                            |
| `nextPage`                      | `(placeholder) => CalendarDateValue`     | add month(s)          | Custom next page calculation.                             |
| `prevPage`                      | `(placeholder) => CalendarDateValue`     | subtract month(s)     | Custom previous page calculation.                         |
| `side`                          | `"top" \| "right" \| "bottom" \| "left"` | `"bottom"`            | Preferred popup side with collision flipping.             |
| `align`                         | `"start" \| "center" \| "end"`           | `"start"`             | Popup alignment.                                          |
| `sideOffset`                    | `number`                                 | `6`                   | Trigger-to-popup gap in pixels.                           |
| `teleport`                      | `string \| false`                        | `"body"`              | Teleport target; `false` keeps popup beside root.         |
| `ui`                            | `DateRangePickerUi`                      | -                     | Classes and nested field/calendar UI maps.                |

### Slots

| Slot            | Props                               | Description                                                      |
| --------------- | ----------------------------------- | ---------------------------------------------------------------- |
| `start-literal` | `value`                             | Start endpoint locale separator.                                 |
| `separator`     | -                                   | Endpoint separator.                                              |
| `end-literal`   | `value`                             | End endpoint locale separator.                                   |
| `trigger`       | `isOpen`, `open`, `close`, `toggle` | Calendar trigger content. Actions are native event-handler safe. |
| `calendar`      | `value`, `close`                    | Replaces built-in Calendar.                                      |
| `previous`      | `disabled`                          | Built-in Calendar previous control content.                      |
| `heading`       | `label`, `months`                   | Built-in Calendar heading.                                       |
| `next`          | `disabled`                          | Built-in Calendar next control content.                          |
| `weekday`       | `date`, `label`                     | Built-in weekday content.                                        |
| `day`           | Complete `CalendarDay` state        | Built-in day button content.                                     |
| `footer`        | `value`, `placeholder`              | Optional built-in Calendar footer.                               |
| `close`         | `close`                             | Explicit close-button content.                                   |

### Events

| Event                | Payload             | Description                                                     |
| -------------------- | ------------------- | --------------------------------------------------------------- |
| `update:modelValue`  | `CalendarDateRange` | Fires after accepted typed or calendar changes.                 |
| `value-change`       | `(range, details)`  | Fires before value changes. `details.cancel()` prevents update. |
| `value-commit`       | `(range, details)`  | Fires after accepted field or calendar commits.                 |
| `update:open`        | `boolean`           | Fires after accepted popup state changes.                       |
| `open-change`        | `(open, details)`   | Fires before popup changes. Cancelable.                         |
| `update:placeholder` | `CalendarDateValue` | Fires after accepted visible-month changes.                     |
| `placeholder-change` | `(date, details)`   | Fires before visible-month changes. Cancelable.                 |

Open reasons include `trigger`, `select`, `escape`, `outside-click`, and `programmatic`. Value reasons match Date Range Field plus `calendar`.
