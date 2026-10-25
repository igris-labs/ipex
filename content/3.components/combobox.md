---
title: Combobox
description: Input plus listbox selection with filtering and active-descendant navigation.
navigation:
  icon: tabler:selector
---

::component-example{name="combobox" size-options="xs,sm,md,lg,xl" default-size="sm" variant-options="outline,soft,bare" default-variant="outline"}
::

## Usage

```vue
<script setup lang="ts">
import { Combobox } from '~/components/ui/combobox'

const options = [
  { value: 'vue', label: 'Vue' },
  { value: 'tailwind', label: 'Tailwind CSS' },
]
</script>

<template>
  <Combobox :options="options" aria-label="Framework" placeholder="Choose a framework" />
</template>
```

## Variants and defaults

| Prop      | Values                       | Default   |
| --------- | ---------------------------- | --------- |
| `size`    | `xs`, `sm`, `md`, `lg`, `xl` | `sm`      |
| `variant` | `outline`, `soft`, `bare`    | `outline` |

## Props

| Prop                  | Type                           | Default                 | Description                                                               |
| --------------------- | ------------------------------ | ----------------------- | ------------------------------------------------------------------------- |
| `options`             | `ComboboxOption[]`             | required                | Options rendered in the listbox.                                          |
| `valueKey`            | `string`                       | —                       | Object key used as option value.                                          |
| `labelKey`            | `string`                       | `"label"`               | Object key used as option label.                                          |
| `descriptionKey`      | `string`                       | `"description"`         | Object key used as description.                                           |
| `disabledKey`         | `string`                       | `"disabled"`            | Object key used as disabled state.                                        |
| `placeholder`         | `string`                       | —                       | Input placeholder.                                                        |
| `multiple`            | `boolean`                      | `false`                 | Enables multi-select.                                                     |
| `nullableValue`       | `string`                       | `""`                    | Submitted empty value.                                                    |
| `id`                  | `string`                       | field id                | Input id.                                                                 |
| `name`                | `string`                       | field name              | Form field name for hidden selected values.                               |
| `required`            | `boolean`                      | `false`                 | Required state.                                                           |
| `disabled`            | `boolean`                      | `false`                 | Disables input and options.                                               |
| `readOnly`            | `boolean`                      | `false`                 | Keeps value readable but prevents opening, search, and selection changes. |
| `invalid`             | `boolean`                      | `false`                 | Sets invalid attrs.                                                       |
| `loop`                | `boolean`                      | `true`                  | Arrow navigation wraps.                                                   |
| `filterable`          | `boolean`                      | `true`                  | Enables client filtering and `aria-autocomplete="list"`.                  |
| `filter`              | `(option, search) => boolean`  | label contains search   | Custom filter.                                                            |
| `isEqual`             | `(a, b) => boolean`            | `Object.is`             | Value comparator, useful for recreated object values.                     |
| `serializeValue`      | `(value) => string`            | string/JSON             | Serializes values for native form submission.                             |
| `loading`             | `boolean`                      | `false`                 | Shows loading slot.                                                       |
| `emptyLabel`          | `string`                       | `"No results found."`   | Default empty text.                                                       |
| `resetSearchOnBlur`   | `boolean`                      | `false`                 | Clears search on blur.                                                    |
| `resetSearchOnSelect` | `boolean`                      | `true`                  | Clears search after selection.                                            |
| `openOnFocus`         | `boolean`                      | `true`                  | Opens when input receives focus.                                          |
| `openOnClick`         | `boolean`                      | `true`                  | Opens when input is clicked.                                              |
| `openOnInput`         | `boolean`                      | `true`                  | Opens when search text changes.                                           |
| `clearable`           | `boolean`                      | `false`                 | Renders clear button when filled.                                         |
| `creatable`           | `boolean`                      | `false`                 | Shows create row for unmatched search.                                    |
| `createLabel`         | `(search) => string`           | `Create “…”`            | Formats default create row.                                               |
| `highlightOnHover`    | `boolean`                      | `true`                  | Pointer hover updates highlight.                                          |
| `side`                | `"top" \| "bottom"`            | `"bottom"`              | Popup side.                                                               |
| `align`               | `"start" \| "center" \| "end"` | `"start"`               | Popup alignment.                                                          |
| `sideOffset`          | `number`                       | `6`                     | Popup gap in pixels.                                                      |
| `ariaLabel`           | `string`                       | —                       | Accessible label.                                                         |
| `ariaLabelledby`      | `string`                       | —                       | Accessible label id.                                                      |
| `ariaDescribedby`     | `string`                       | field description/error | Description ids.                                                          |
| `ui`                  | `ComboboxUi`                   | —                       | Classes for structural parts.                                             |

## Slots

| Slot            | Props                                                                                            | Description             |
| --------------- | ------------------------------------------------------------------------------------------------ | ----------------------- |
| `option`        | `option`, `value`, `label`, `description`, `isSelected`, `isHighlighted`, `isDisabled`, `select` | Custom option row.      |
| `[option.slot]` | Same as `option`                                                                                 | Per-option renderer.    |
| `tag`           | `option`, `value`, `remove`                                                                      | Selected tag content.   |
| `clear`         | —                                                                                                | Clear-button content.   |
| `create`        | `search`, `create`                                                                               | Create-row content.     |
| `group-label`   | `option`, `label`                                                                                | Custom group label row. |
| `empty`         | —                                                                                                | Empty state.            |
| `loading`       | —                                                                                                | Loading state.          |

## Emits

| Event           | Payload             | Description                                 |
| --------------- | ------------------- | ------------------------------------------- |
| `open-change`   | `(open, details)`   | Fired before popup opens/closes.            |
| `value-change`  | `(value, details)`  | Fired before selected value changes.        |
| `search-change` | `(value, details)`  | Fired before search text changes.           |
| `create`        | `(search, details)` | Requests creation of unmatched search text. |

## Keyboard

| Key                     | Behavior                                                          |
| ----------------------- | ----------------------------------------------------------------- |
| `ArrowDown` / `ArrowUp` | Open popup and move highlight.                                    |
| `Enter`                 | Select highlighted option or request creation for unmatched text. |
| `Home` / `End`          | Move to first/last enabled visible option.                        |
| `Escape`                | Close popup.                                                      |

## Source

Copy `Combobox.vue` and `index.ts` into `components/ui/combobox` after [installation](/getting-started/installation).

::component-source{name="combobox"}
::
