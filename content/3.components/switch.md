---
title: Switch
description: Turn a setting on or off.
navigation:
  icon: tabler:toggle-left
---

## Demos

::component-example{name="switch" size-options="xs,sm,md,lg,xl" default-size="sm"}
::

### Usage

```vue
<script setup lang="ts">
import { Switch } from '~/components/ui/switch'
</script>

<template>
  <Switch label="Email notifications" />
</template>
```

## Installation

Complete the [shared installation](/getting-started/installation). Copy `Switch.vue` and `index.ts` into `app/components/ui/switch/`.

::component-source{name="switch"}
::

## API

### Variants and defaults

| Prop   | Values                       | Default |
| ------ | ---------------------------- | ------- |
| `size` | `xs`, `sm`, `md`, `lg`, `xl` | `sm`    |

### Props

| Prop          | Type                          | Default | Description                                                |
| ------------- | ----------------------------- | ------- | ---------------------------------------------------------- |
| `disabled`    | `boolean`                     | `false` | Disables the switch.                                       |
| `id`          | `string`                      | auto    | HTML id for the button element.                            |
| `name`        | `string`                      | —       | HTML name for form submission.                             |
| `required`    | `boolean`                     | `false` | Marks the field as required.                               |
| `trueValue`   | `boolean \| string \| number` | `true`  | Model value when switched on.                              |
| `falseValue`  | `boolean \| string \| number` | `false` | Model value when switched off.                             |
| `label`       | `string`                      | —       | Label text. Slot `#label` takes priority.                  |
| `description` | `string`                      | —       | Description text. Slot `#description` takes priority.      |
| `ariaLabel`   | `string`                      | —       | `aria-label` for icon-only switches with no visible label. |
| `ui`          | `SwitchUi`                    | —       | CSS class overrides.                                       |

### Slots

| Slot          | Scoped props  | Description                                           |
| ------------- | ------------- | ----------------------------------------------------- |
| `thumb`       | `{ checked }` | The sliding thumb indicator.                          |
| `label`       | —             | Label text. Defaults to the `label` prop.             |
| `description` | —             | Description text. Defaults to the `description` prop. |

### Events

| Event          | Payload                         | Description                          |
| -------------- | ------------------------------- | ------------------------------------ |
| `value-change` | `[value: SwitchValue, details]` | Fired when the switch state changes. |

### Keyboard

| Key                   | Behavior                          |
| --------------------- | --------------------------------- |
| `Enter` / `Space`     | Toggles focused switch.           |
| `Tab` / `Shift + Tab` | Uses native document focus order. |

Visible label is associated with switch, so mouse and touch activation on label also toggles it.
