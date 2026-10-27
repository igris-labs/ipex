---
title: Checkbox
description: Turn an option on or off.
navigation:
  icon: tabler:checkbox
---

## Demos

::component-example{name="checkbox" size-options="xs,sm,md,lg,xl" default-size="sm"}
::

### Usage

```vue
<script setup lang="ts">
import { Checkbox } from '~/components/ui/checkbox'
</script>

<template>
  <Checkbox label="Include archived projects" />
</template>
```

## Installation

Complete the [shared installation](/getting-started/installation). Copy `Checkbox.vue` and `index.ts` into `app/components/ui/checkbox/`.

::component-source{name="checkbox"}
::

## API

### Variants and defaults

| Prop   | Values                       | Default |
| ------ | ---------------------------- | ------- |
| `size` | `xs`, `sm`, `md`, `lg`, `xl` | `sm`    |

### Props

| Prop              | Type         | Default | Description                                           |
| ----------------- | ------------ | ------- | ----------------------------------------------------- |
| `disabled`        | `boolean`    | `false` | Disables the checkbox.                                |
| `id`              | `string`     | auto    | HTML id for the button element.                       |
| `name`            | `string`     | —       | HTML name for form submission.                        |
| `required`        | `boolean`    | `false` | Marks the field as required.                          |
| `trueValue`       | `unknown`    | `true`  | Model value when checked.                             |
| `falseValue`      | `unknown`    | `false` | Model value when unchecked.                           |
| `label`           | `string`     | —       | Label text. Slot `#label` takes priority.             |
| `description`     | `string`     | —       | Description text. Slot `#description` takes priority. |
| `ariaLabel`       | `string`     | —       | Accessible name when no visible label is rendered.    |
| `ariaDescribedby` | `string`     | —       | IDs of external descriptive elements.                 |
| `ui`              | `CheckboxUi` | —       | CSS class overrides.                                  |

### Slots

| Slot          | Scoped props  | Description                                                                              |
| ------------- | ------------- | ---------------------------------------------------------------------------------------- |
| `indicator`   | `{ checked }` | Visual check mark inside the button. `checked` is `true`, `false`, or `"indeterminate"`. |
| `label`       | —             | Label text. Defaults to the `label` prop.                                                |
| `description` | —             | Description text. Defaults to the `description` prop.                                    |

### Events

| Event          | Payload                           | Description                           |
| -------------- | --------------------------------- | ------------------------------------- |
| `value-change` | `[value: CheckboxValue, details]` | Fired when the checked state changes. |

### Keyboard

| Key                   | Behavior                          |
| --------------------- | --------------------------------- |
| `Enter` / `Space`     | Toggles focused checkbox.         |
| `Tab` / `Shift + Tab` | Uses native document focus order. |

Visible label is a real `<label>` associated with control, so pointer and touch activation on label toggles checkbox too.
