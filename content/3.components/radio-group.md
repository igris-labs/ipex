---
title: Radio Group
description: Choose one option from a group.
navigation:
  icon: tabler:circle-dot
---

## Demos

::component-example{name="radio-group" size-options="xs,sm,md,lg,xl" default-size="sm"}
::

### Usage

```vue
<script setup lang="ts">
import { RadioGroup } from '~/components/ui/radio-group'

const options = [
  { value: 'vue', label: 'Vue' },
  { value: 'tailwind', label: 'Tailwind CSS' },
]
</script>

<template>
  <RadioGroup :options="options" legend="Framework" />
</template>
```

## Installation

Complete the [shared installation](/getting-started/installation). Copy `RadioGroup.vue` and `index.ts` into `app/components/ui/radio-group/`.

::component-source{name="radio-group"}
::

## API

### Variants and defaults

| Prop   | Values                       | Default |
| ------ | ---------------------------- | ------- |
| `size` | `xs`, `sm`, `md`, `lg`, `xl` | `sm`    |

Radio Group uses 8, 10, 12, 14, and 16px spacing for xs through xl. Selection fades and scales the inner dot over 180ms; reduced motion disables the transition.

### Props

| Prop              | Type                         | Default         | Description                                            |
| ----------------- | ---------------------------- | --------------- | ------------------------------------------------------ |
| `options`         | `any[]`                      | —               | **Required.** Array of option values or objects.       |
| `valueKey`        | `string`                     | —               | Property to use as the value when options are objects. |
| `labelKey`        | `string`                     | `"label"`       | Property to use as the display label.                  |
| `descriptionKey`  | `string`                     | `"description"` | Property to use as the description text.               |
| `disabled`        | `boolean`                    | `false`         | Disable all options.                                   |
| `orientation`     | `"horizontal" \| "vertical"` | `"vertical"`    | Layout direction.                                      |
| `legend`          | `string`                     | —               | Visible group label. Slot `#legend` takes priority.    |
| `loop`            | `boolean`                    | `true`          | Wrap arrow key navigation at the ends.                 |
| `name`            | `string`                     | —               | HTML name for form submission.                         |
| `required`        | `boolean`                    | `false`         | Marks the group as required.                           |
| `ariaLabel`       | `string`                     | —               | `aria-label` on the group element.                     |
| `ariaLabelledby`  | `string`                     | —               | `aria-labelledby` on the group element.                |
| `getItemDisabled` | `(option: any) => boolean`   | —               | Function to disable individual options.                |
| `as`              | `string`                     | `"div"`         | Root element tag.                                      |
| `ui`              | `RadioGroupUi`               | —               | CSS class overrides.                                   |

### Slots

| Slot     | Scoped props                                                           | Description                                 |
| -------- | ---------------------------------------------------------------------- | ------------------------------------------- |
| `legend` | `{ legend }`                                                           | Group label. Defaults to the `legend` prop. |
| `item`   | `{ option, value, label, description, isChecked, isDisabled, select }` | Each radio option.                          |

### Events

| Event          | Payload                    | Description                        |
| -------------- | -------------------------- | ---------------------------------- |
| `value-change` | `[value: string, details]` | Fired when selected value changes. |

### Keyboard

| Key                        | Behavior                                                             |
| -------------------------- | -------------------------------------------------------------------- |
| `ArrowUp` / `ArrowDown`    | Selects and focuses previous/next enabled item in vertical groups.   |
| `ArrowLeft` / `ArrowRight` | Selects and focuses previous/next enabled item in horizontal groups. |
| `Home` / `End`             | Selects and focuses first or last enabled item.                      |
| `Space`                    | Selects focused radio.                                               |
| `Tab`                      | Enters group at selected item, or first enabled item.                |

Arrow navigation wraps when `loop` is true and skips disabled items.
