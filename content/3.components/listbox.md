---
title: Listbox
description: Select one or more values from a list.
navigation:
  icon: tabler:list-details
---

## Demos

::component-example{name="listbox" size-options="xs,sm,md,lg,xl" default-size="sm"}
::

### Usage

```vue
<script setup lang="ts">
import { Listbox } from '~/components/ui/listbox'

const options = [
  { value: 'vue', label: 'Vue' },
  { value: 'tailwind', label: 'Tailwind CSS' },
]
</script>

<template>
  <Listbox :options="options" aria-label="Frameworks" />
</template>
```

## Installation

Complete the [shared installation](/getting-started/installation). Copy `Listbox.vue` and `index.ts` into `app/components/ui/listbox/`.

::component-source{name="listbox"}
::

## API

### Variants and defaults

| Prop   | Values                       | Default |
| ------ | ---------------------------- | ------- |
| `size` | `xs`, `sm`, `md`, `lg`, `xl` | `sm`    |

### Models

| Model            | Type                             | Default | Description               |
| ---------------- | -------------------------------- | ------- | ------------------------- |
| `v-model`        | `ListboxValue \| ListboxValue[]` | `""`    | Selected value or values. |
| `v-model:search` | `string`                         | `""`    | Filter input value.       |

### Props

| Prop                | Type                          | Default                | Description                                                          |
| ------------------- | ----------------------------- | ---------------------- | -------------------------------------------------------------------- |
| `options`           | `ListboxOption[]`             | required               | Rows rendered by the listbox.                                        |
| `valueKey`          | `string`                      | -                      | Object key used as value.                                            |
| `labelKey`          | `string`                      | `"label"`              | Object key used as label.                                            |
| `descriptionKey`    | `string`                      | `"description"`        | Object key used as description.                                      |
| `disabledKey`       | `string`                      | `"disabled"`           | Object key used as disabled state.                                   |
| `multiple`          | `boolean`                     | `false`                | Enables multiple selection.                                          |
| `nullableValue`     | `string`                      | `""`                   | Empty value used by single selection and `clear()`.                  |
| `by`                | `string \| (a, b) => boolean` | `Object.is`            | Value comparator, including object identity by key.                  |
| `serializeValue`    | `(value) => string`           | JSON/string conversion | Serializes native form values and keys.                              |
| `id`                | `string`                      | field/generated id     | Hidden control id.                                                   |
| `name`              | `string`                      | field name             | Native form field name.                                              |
| `required`          | `boolean`                     | `false`                | Requires at least one selected option.                               |
| `disabled`          | `boolean`                     | `false`                | Disables focus and selection.                                        |
| `readOnly`          | `boolean`                     | `false`                | Allows navigation without value changes.                             |
| `invalid`           | `boolean`                     | `false`                | Forces invalid styling and ARIA state.                               |
| `autoFocus`         | `boolean`                     | `false`                | Focuses the filter when present, otherwise the listbox, after mount. |
| `loop`              | `boolean`                     | `true`                 | Wraps keyboard navigation.                                           |
| `orientation`       | `"vertical" \| "horizontal"`  | `"vertical"`           | ARIA orientation and arrow-key axis.                                 |
| `dir`               | `"ltr" \| "rtl"`              | `"ltr"`                | Horizontal keyboard direction.                                       |
| `selectionBehavior` | `"toggle" \| "replace"`       | `"toggle"`             | Multiple-selection behavior without modifier keys.                   |
| `filterable`        | `boolean`                     | `false`                | Renders the filter input.                                            |
| `filter`            | `(option, search) => boolean` | label contains search  | Custom option filter.                                                |
| `filterPlaceholder` | `string`                      | `"Filter options"`     | Filter input placeholder.                                            |
| `emptyLabel`        | `string`                      | `"No options found."`  | Default empty content.                                               |
| `highlightOnHover`  | `boolean`                     | `true`                 | Pointer hover changes the active option.                             |
| `virtualize`        | `boolean`                     | `false`                | Enables virtual rendering.                                           |
| `virtualItemHeight` | `number`                      | `40`                   | Virtual row height in px.                                            |
| `virtualHeight`     | `number`                      | `240`                  | Virtual viewport height in px.                                       |
| `overscan`          | `number`                      | `5`                    | Extra virtual rows rendered outside the viewport.                    |
| `ariaLabel`         | `string`                      | -                      | Accessible label when no visible label exists.                       |
| `ariaLabelledby`    | `string`                      | -                      | Accessible label element id.                                         |
| `ariaDescribedby`   | `string`                      | field IDs              | Accessible description/error ids.                                    |
| `ui`                | `ListboxUi`                   | -                      | Classes for structural parts.                                        |

### Slots

| Slot                      | Props                                                                                            | Description             |
| ------------------------- | ------------------------------------------------------------------------------------------------ | ----------------------- |
| `option` or option `slot` | `option`, `value`, `label`, `description`, `isSelected`, `isHighlighted`, `isDisabled`, `select` | Selectable row content. |
| `group-label`             | `option`, `label`                                                                                | Group label content.    |
| `empty`                   | -                                                                                                | Empty filtered state.   |

### Events

| Event              | Payload             | Description                                                                   |
| ------------------ | ------------------- | ----------------------------------------------------------------------------- |
| `value-change`     | `(value, details)`  | Fires before selection changes. Cancelable.                                   |
| `search-change`    | `(search, details)` | Fires before filter text changes. Cancelable.                                 |
| `highlight-change` | `(option, details)` | Fires before the active option changes. Cancelable.                           |
| `entry-focus`      | `(option, details)` | Fires when focus enters the listbox and before initial highlight. Cancelable. |
| `leave`            | `(option, details)` | Fires when the pointer leaves the listbox. Cancelable.                        |

### Keyboard

| Key                        | Behavior                                             |
| -------------------------- | ---------------------------------------------------- |
| `ArrowDown` / `ArrowUp`    | Move through a vertical list.                        |
| `ArrowRight` / `ArrowLeft` | Move through a horizontal list, respecting `dir`.    |
| `Home` / `End`             | Move to first/last enabled option.                   |
| `Enter` / `Space`          | Select or toggle the active option.                  |
| `Shift` + Arrow            | Extend a multiple-selection range.                   |
| `Ctrl+A` / `Cmd+A`         | Select all enabled visible options in multiple mode. |
| printable characters       | Typeahead to a matching label.                       |
| filter `Escape`            | Clear non-empty filter text.                         |
