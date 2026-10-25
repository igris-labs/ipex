---
title: Select
description: Single or multiple listbox select with keyboard navigation, typeahead, and form submission.
navigation:
  icon: tabler:chevron-down
---

::component-example{name="select" size-options="xs,sm,md,lg,xl" default-size="sm" variant-options="outline,soft,bare" default-variant="outline"}
::

## Usage

```vue
<script setup lang="ts">
import { Select } from '~/components/ui/select'

const options = [
  { value: 'vue', label: 'Vue' },
  { value: 'tailwind', label: 'Tailwind CSS' },
]
</script>

<template>
  <Select :options="options" aria-label="Framework" placeholder="Choose a framework" />
</template>
```

## Variants and defaults

| Prop      | Values                       | Default   |
| --------- | ---------------------------- | --------- |
| `size`    | `xs`, `sm`, `md`, `lg`, `xl` | `sm`      |
| `variant` | `outline`, `soft`, `bare`    | `outline` |

## Props

| Prop                  | Type                                     | Default                           | Description                                                           |
| --------------------- | ---------------------------------------- | --------------------------------- | --------------------------------------------------------------------- |
| `options`             | `SelectOption[]`                         | required                          | Options rendered in the listbox.                                      |
| `valueKey`            | `string`                                 | —                                 | Object key used as option value. Falls back to `value`, then `label`. |
| `labelKey`            | `string`                                 | `"label"`                         | Object key used as option label.                                      |
| `descriptionKey`      | `string`                                 | `"description"`                   | Object key used as option description.                                |
| `disabledKey`         | `string`                                 | `"disabled"`                      | Object key used as option disabled state.                             |
| `placeholder`         | `string`                                 | `"Select option"`                 | Text shown when no value is selected.                                 |
| `multiple`            | `boolean`                                | `false`                           | Enables multi-select. `v-model` should be `string[]`.                 |
| `nullableValue`       | `string`                                 | `""`                              | Native empty option value for single select.                          |
| `id`                  | `string`                                 | field id                          | Trigger id.                                                           |
| `name`                | `string`                                 | field name                        | Form field name. Renders a hidden native select.                      |
| `required`            | `boolean`                                | `false`                           | Required state.                                                       |
| `disabled`            | `boolean`                                | `false`                           | Disables trigger and options.                                         |
| `invalid`             | `boolean`                                | `false`                           | Sets invalid attrs.                                                   |
| `loop`                | `boolean`                                | `true`                            | Arrow navigation wraps.                                               |
| `autocomplete`        | `boolean`                                | `false`                           | Renders a search input in the popup and filters visible options.      |
| `filter`              | `(option, search) => boolean`            | label/description contains search | Custom autocomplete filter.                                           |
| `loading`             | `boolean`                                | `false`                           | Shows loading slot/content inside the popup.                          |
| `emptyLabel`          | `string`                                 | `"No options found."`             | Default empty state text.                                             |
| `searchPlaceholder`   | `string`                                 | `"Search options..."`             | Search input placeholder.                                             |
| `resetSearchOnSelect` | `boolean`                                | `false`                           | Clears search after selection.                                        |
| `highlightOnHover`    | `boolean`                                | `true`                            | Pointer hover updates highlighted option.                             |
| `side`                | `"top" \| "right" \| "bottom" \| "left"` | `"bottom"`                        | Popup side.                                                           |
| `align`               | `"start" \| "center" \| "end"`           | `"start"`                         | Popup alignment.                                                      |
| `sideOffset`          | `number`                                 | `6`                               | Popup offset in px.                                                   |
| `ariaLabel`           | `string`                                 | —                                 | Accessible label when no visible label exists.                        |
| `ariaLabelledby`      | `string`                                 | —                                 | Accessible label id.                                                  |
| `ariaDescribedby`     | `string`                                 | field description/error           | Accessible description ids.                                           |
| `ui`                  | `SelectUi`                               | —                                 | Classes for structural parts.                                         |

## Slots

| Slot          | Props                                                                                                                                                       | Description                                   |
| ------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------- |
| `trigger`     | `isOpen`, `selectedOption`, `selectedOptions`, `selectedValue`, `selectedValues`, `selectedLabel`, `placeholder`, `triggerProps`, `open`, `close`, `toggle` | Custom trigger content.                       |
| `value`       | `option`, `options`, `value`, `values`, `label`                                                                                                             | Custom selected value.                        |
| `option`      | `option`, `value`, `label`, `description`, `isSelected`, `isHighlighted`, `isDisabled`, `select`                                                            | Custom option row.                            |
| `group-label` | `option`, `label`                                                                                                                                           | Custom label row for `type: "label"` options. |
| `empty`       | —                                                                                                                                                           | Empty state for autocomplete filtering.       |
| `loading`     | —                                                                                                                                                           | Loading state content.                        |

## Emits

| Event           | Payload                                | Description                                                                       |
| --------------- | -------------------------------------- | --------------------------------------------------------------------------------- |
| `open-change`   | `(open, details)`                      | Fired before popup opens/closes. `details.cancel()` prevents the change.          |
| `value-change`  | `(value: string \| string[], details)` | Fired before selected value updates. `details.cancel()` prevents the update.      |
| `search-change` | `(value: string, details)`             | Fired before autocomplete search updates. `details.cancel()` prevents the update. |

## Keyboard

| Key                     | Behavior                                          |
| ----------------------- | ------------------------------------------------- |
| `Enter` / `Space`       | Open select, or select/toggle highlighted option. |
| `ArrowDown` / `ArrowUp` | Open select and move highlight.                   |
| `Home` / `End`          | Move highlight to first/last enabled option.      |
| `Escape`                | Close popup.                                      |
| printable character     | Typeahead to matching option label.               |

## Source

Copy `Select.vue` and `index.ts` into `components/ui/select` after [installation](/getting-started/installation).

::component-source{name="select"}
::
