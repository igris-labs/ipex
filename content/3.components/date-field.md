---
title: Date Field
description: Locale-ordered segmented date input with keyboard editing, optional Calendar, validation, paste, and native forms.
navigation:
  icon: tabler:calendar-event
---

::component-example{name="date-field" size-options="xs,sm,md,lg,xl" default-size="sm" variant-options="outline,soft,bare" default-variant="outline"}
::

## Usage

```vue
<script setup lang="ts">
import { DateField } from '~/components/ui/date-field'
</script>

<template>
  <DateField aria-label="Project date" />
</template>
```

## Typing and calendar selection

Click a date segment to type or use the calendar button to choose a date. Focus and text selection use the neutral secondary fill with its paired foreground. A subtle ring marks the active segment. Slashes have their own spacing. The calendar opens outside the preview frame and follows the same size as the field.

## Variants and defaults

| Prop      | Values                       | Default   |
| --------- | ---------------------------- | --------- |
| `size`    | `xs`, `sm`, `md`, `lg`, `xl` | `sm`      |
| `variant` | `outline`, `soft`, `bare`    | `outline` |

## Props

| Prop                 | Type                                     | Default                     | Description                                             |
| -------------------- | ---------------------------------------- | --------------------------- | ------------------------------------------------------- |
| `id`                 | `string`                                 | generated                   | ID assigned to the first locale-ordered segment.        |
| `name`               | `string`                                 | Field name                  | Native form field name.                                 |
| `locale`             | `string`                                 | `"en-US"`                   | Segment order, separators, and accessible labels.       |
| `dir`                | `"ltr" \| "rtl"`                         | `"ltr"`                     | Reading direction and horizontal arrow behavior.        |
| `placeholder`        | `CalendarDateValue`                      | today                       | Date context used while segments are empty or partial.  |
| `minValue`           | `CalendarDateValue`                      | —                           | Earliest valid complete date.                           |
| `maxValue`           | `CalendarDateValue`                      | —                           | Latest valid complete date.                             |
| `isDateUnavailable`  | `(date) => boolean`                      | —                           | Marks complete dates invalid by application rule.       |
| `required`           | `boolean`                                | `false`                     | Requires a complete date for native form validation.    |
| `disabled`           | `boolean`                                | `false`                     | Disables segments and native form participation.        |
| `readOnly`           | `boolean`                                | `false`                     | Keeps segments focusable but blocks changes.            |
| `invalid`            | `boolean`                                | `false`                     | Forces invalid styling and ARIA state.                  |
| `selectOnFocus`      | `boolean`                                | `true`                      | Selects current segment text when focused.              |
| `autoAdvance`        | `boolean`                                | `true`                      | Moves focus after a segment reaches its maximum length. |
| `showCalendar`       | `boolean`                                | `true`                      | Adds a trigger and positioned Calendar popup.           |
| `calendarLabel`      | `string`                                 | `"Choose date"`             | Trigger and popup accessible label.                     |
| `calendarSide`       | `"top" \| "right" \| "bottom" \| "left"` | `"bottom"`                  | Preferred popup side with collision flipping.           |
| `calendarAlign`      | `"start" \| "center" \| "end"`           | `"start"`                   | Popup alignment against Date Field.                     |
| `calendarSideOffset` | `number`                                 | `6`                         | Trigger-to-popup gap in pixels.                         |
| `calendarTeleport`   | `string \| false`                        | `"body"`                    | Teleport target; `false` keeps popup beside Date Field. |
| `ariaLabel`          | `string`                                 | `"Date"`                    | Root group label when no external label exists.         |
| `ariaLabelledby`     | `string`                                 | Field label ID              | External label relationship.                            |
| `ariaDescribedby`    | `string`                                 | Field description/error IDs | External description relationship.                      |
| `ui`                 | `DateFieldUi`                            | —                           | Classes for generated structural parts.                 |

Date Field accepts calendar dates at day granularity. Use [Time Field](/components/time-field) for clock values.

## Slots

| Slot               | Props                               | Description                                                                    |
| ------------------ | ----------------------------------- | ------------------------------------------------------------------------------ |
| `literal`          | `value`                             | Replaces visible locale separator content without changing segment behavior.   |
| `calendar-trigger` | `isOpen`, `open`, `close`, `toggle` | Replaces optional trigger content. Actions accept native event-first handlers. |
| `calendar`         | `value`, `select`, `close`          | Replaces built-in Calendar content while retaining popup behavior.             |

## Emits

| Event                  | Payload                          | Description                                                          |
| ---------------------- | -------------------------------- | -------------------------------------------------------------------- |
| `update:modelValue`    | `CalendarDateValue \| undefined` | Fires after an accepted complete value or clear.                     |
| `value-change`         | `(value, details)`               | Fires before model changes. `details.cancel()` prevents the change.  |
| `value-commit`         | `(value, details)`               | Fires after accepted input, keyboard, paste, blur, or clear commits. |
| `update:calendarOpen`  | `boolean`                        | Fires after accepted calendar popup changes.                         |
| `calendar-open-change` | `(open, details)`                | Fires before popup changes. `details.cancel()` prevents the change.  |

Value `details.reason` can be `input`, `keyboard`, `paste`, `blur`, `clear`, or `calendar`. Calendar-open reasons include `trigger`, `select`, `escape`, and `outside-click`.

## Keyboard

| Key                                   | Behavior                                                                  |
| ------------------------------------- | ------------------------------------------------------------------------- |
| Number keys                           | Edit the focused segment; full segments can auto-advance.                 |
| `ArrowUp` / `ArrowDown`               | Increment or decrement the focused segment with wrapping.                 |
| `PageUp` / `PageDown`                 | Increment or decrement by 10.                                             |
| `Home` / `End`                        | Set the focused segment to its minimum or maximum.                        |
| `ArrowLeft` / `ArrowRight`            | Move focus between locale-ordered segments, direction-aware in RTL.       |
| `Backspace`                           | Clears native text; from an empty segment, moves to the previous segment. |
| `Enter` / `Space` on calendar trigger | Opens or closes Calendar.                                                 |
| `Escape` in Calendar                  | Closes popup and restores trigger focus.                                  |

Each editable part uses `role="spinbutton"` with `aria-valuemin`, `aria-valuemax`, `aria-valuenow`, and a localized accessible label. Touch users can tap and edit any segment with the numeric keyboard.

Partial segment text remains internal. Date Field updates `v-model` only after day, month, and year are complete and valid.

## Source

Copy `DateField.vue` and `index.ts` into `components/ui/date-field` after [installation](/getting-started/installation).

Also copy [Calendar](/components/calendar); this recipe uses their styled parts.

::component-source{name="date-field"}
::
