---
title: Input
description: Enter text with support for labels, validation, and form submission.
navigation:
  icon: tabler:cursor-text
---

## Demos

::component-example{name="input" size-options="xs,sm,md,lg,xl" default-size="sm" variant-options="outline,soft,bare" default-variant="outline"}
::

### Usage

```vue
<script setup lang="ts">
import { Input } from '~/components/ui/input'
</script>

<template>
  <Input aria-label="Project name" placeholder="Project name" />
</template>
```

## Installation

Complete the [shared installation](/getting-started/installation). Copy `Input.vue` and `index.ts` into `app/components/ui/input/`.

::component-source{name="input"}
::

## API

### Variants and defaults

| Prop      | Values                       | Default   |
| --------- | ---------------------------- | --------- |
| `size`    | `xs`, `sm`, `md`, `lg`, `xl` | `sm`      |
| `variant` | `outline`, `soft`, `bare`    | `outline` |

### Props

| Prop              | Type                      | Default                 | Description                                           |
| ----------------- | ------------------------- | ----------------------- | ----------------------------------------------------- |
| `id`              | `string`                  | —                       | Input id. Inherited from `Field` when omitted.        |
| `name`            | `string`                  | —                       | Form field name. Inherited from `Field` when omitted. |
| `type`            | `InputType`               | `"text"`                | Native input type for text-like inputs.               |
| `placeholder`     | `string`                  | —                       | Placeholder text.                                     |
| `autocomplete`    | `string`                  | —                       | Native autocomplete setting.                          |
| `inputmode`       | `InputProps["inputmode"]` | —                       | Native input mode hint.                               |
| `minlength`       | `number`                  | —                       | Native minimum text length.                           |
| `maxlength`       | `number`                  | —                       | Native maximum text length.                           |
| `pattern`         | `string`                  | —                       | Native validation pattern.                            |
| `required`        | `boolean`                 | `false`                 | Required state.                                       |
| `disabled`        | `boolean`                 | `false`                 | Disabled state.                                       |
| `readonly`        | `boolean`                 | `false`                 | Read-only state.                                      |
| `invalid`         | `boolean`                 | `false`                 | Sets `aria-invalid` and `data-akaza-invalid`.         |
| `ariaLabel`       | `string`                  | —                       | Accessible label when no visible label exists.        |
| `ariaDescribedby` | `string`                  | field description/error | Accessible description ids.                           |
| `ui`              | `InputUi`                 | —                       | Classes for the input element.                        |

### Events

| Event          | Payload            | Description                                                         |
| -------------- | ------------------ | ------------------------------------------------------------------- |
| `value-change` | `(value, details)` | Fired before model updates. `details.cancel()` prevents the update. |

### Keyboard

`Input` preserves native keyboard behavior for its `type`, `inputmode`, autocomplete, selection, clipboard, and form submission. Akaza does not replace browser text editing shortcuts. `Enter` submits an owning form when native HTML rules permit it.
