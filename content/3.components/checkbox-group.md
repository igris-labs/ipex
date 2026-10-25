---
title: Checkbox Group
description: Items-based multi-select built on Checkbox.
navigation:
  icon: tabler:list-check
---

::component-example{name="checkbox-group" size-options="xs,sm,md,lg,xl" default-size="sm"}
::

## Usage

```vue
<script setup lang="ts">
import { CheckboxGroup } from '~/components/ui/checkbox-group'

const options = [
  { value: 'vue', label: 'Vue' },
  { value: 'tailwind', label: 'Tailwind CSS' },
]
</script>

<template>
  <CheckboxGroup :options="options" legend="Frameworks" />
</template>
```

## Variants and defaults

| Prop   | Values                       | Default |
| ------ | ---------------------------- | ------- |
| `size` | `xs`, `sm`, `md`, `lg`, `xl` | `sm`    |

## Props

| Prop                | Type                         | Default         | Description                                                    |
| ------------------- | ---------------------------- | --------------- | -------------------------------------------------------------- |
| `options`           | `CheckboxGroupOption[]`      | —               | Options to render.                                             |
| `valueKey`          | `string`                     | —               | Property used as option value.                                 |
| `labelKey`          | `string`                     | `"label"`       | Property used as label.                                        |
| `descriptionKey`    | `string`                     | `"description"` | Property used as description.                                  |
| `disabledKey`       | `string`                     | `"disabled"`    | Property used as disabled state.                               |
| `allValues`         | `CheckboxGroupValue[]`       | option values   | Values controlled by the parent checkbox.                      |
| `parent`            | `boolean`                    | `false`         | Renders a select-all parent checkbox with indeterminate state. |
| `parentLabel`       | `string`                     | `"Select all"`  | Parent checkbox label.                                         |
| `parentDescription` | `string`                     | —               | Parent checkbox description.                                   |
| `disabled`          | `boolean`                    | `false`         | Disables every item.                                           |
| `required`          | `boolean`                    | `false`         | Requires at least one checked item for form submission.        |
| `orientation`       | `"horizontal" \| "vertical"` | `"vertical"`    | Layout orientation data attribute.                             |
| `legend`            | `string`                     | —               | Group label used as accessible name fallback.                  |
| `name`              | `string`                     | —               | Name used by child checkbox form inputs.                       |
| `ariaLabel`         | `string`                     | —               | Accessible label when no visible legend exists.                |
| `ariaLabelledby`    | `string`                     | —               | External accessible label id.                                  |
| `ui`                | `CheckboxGroupUi`            | —               | Classes for root, legend, item, and nested checkbox parts.     |

## Slots

| Slot               | Scoped props                             | Description                                                                      |
| ------------------ | ---------------------------------------- | -------------------------------------------------------------------------------- |
| `item`             | `option`, `value`, `checked`, `disabled` | Replaces the whole item row. You own the rendered control behavior in this slot. |
| `indicator`        | `option`, `checked`                      | Child checkbox indicator.                                                        |
| `parent-indicator` | `checked`                                | Parent checkbox indicator.                                                       |

## Emits

| Event          | Payload            | Description                                                         |
| -------------- | ------------------ | ------------------------------------------------------------------- |
| `value-change` | `(value, details)` | Fired before model updates. `details.cancel()` prevents the update. |

## Keyboard

| Key                   | Behavior                                                                   |
| --------------------- | -------------------------------------------------------------------------- |
| `Tab` / `Shift + Tab` | Moves through parent and enabled child checkboxes in document order.       |
| `Enter` / `Space`     | Toggles focused checkbox. Parent control selects or clears allowed values. |

Each checkbox remains in the native tab order. The group does not use roving focus.

## Source

Copy `CheckboxGroup.vue` and `index.ts` into `components/ui/checkbox-group` after [installation](/getting-started/installation).

Also copy [Checkbox](/components/checkbox); this recipe uses their styled parts.

::component-source{name="checkbox-group"}
::
