---
title: Field
description: Label, description, and error wiring for form controls.
navigation:
  icon: tabler:forms
---

::component-example{name="field"}
::

## Usage

```vue
<script setup lang="ts">
import { Field } from '~/components/ui/field'
import { Input } from '~/components/ui/input'
</script>

<template>
  <Field label="Project name">
    <Input aria-label="Project name" placeholder="Project name" />
  </Field>
</template>
```

## Props

| Prop          | Type                         | Default     | Description                                           |
| ------------- | ---------------------------- | ----------- | ----------------------------------------------------- |
| `as`          | `string`                     | `"div"`     | Root element tag.                                     |
| `id`          | `string`                     | generated   | Control id.                                           |
| `name`        | `string`                     | —           | Field name provided to child inputs.                  |
| `label`       | `string`                     | —           | Visible label.                                        |
| `description` | `string`                     | —           | Help text.                                            |
| `error`       | `string`                     | —           | Error text. Also marks field invalid.                 |
| `errorMatch`  | `boolean \| FieldErrorMatch` | `"invalid"` | Controls when native validation errors are shown.     |
| `required`    | `boolean`                    | `false`     | Required state provided to child inputs.              |
| `disabled`    | `boolean`                    | `false`     | Disabled state provided to child inputs.              |
| `invalid`     | `boolean`                    | `false`     | Invalid state.                                        |
| `dirty`       | `boolean`                    | input state | Overrides dirty state.                                |
| `touched`     | `boolean`                    | input state | Overrides touched state.                              |
| `filled`      | `boolean`                    | input state | Overrides filled state.                               |
| `focused`     | `boolean`                    | input state | Overrides focused state.                              |
| `ui`          | `FieldUi`                    | —           | Classes for root, label, control, description, error. |

## Slots

| Slot          | Scoped props                                                                                                                          | Description                 |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------- | --------------------------- |
| `default`     | `id`, `fieldName`, `required`, `disabled`, `invalid`, `valid`, `dirty`, `touched`, `filled`, `focused`, `describedBy`, `controlProps` | Control slot.               |
| `label`       | —                                                                                                                                     | Custom label content.       |
| `description` | —                                                                                                                                     | Custom description content. |
| `error`       | —                                                                                                                                     | Custom error content.       |

## Source

Copy `Field.vue` and `index.ts` into `components/ui/field` after [installation](/getting-started/installation).

::component-source{name="field"}
::
