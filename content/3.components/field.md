---
title: Field
description: Connect a form control to its label, description, and error message.
navigation:
  icon: tabler:forms
---

## Demos

::component-example{name="field"}
::

### Usage

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

### Required, invalid, and disabled fields

Field provides the label, description, validation message, and shared state for its control. Set `invalid` after your validation runs. The preview lets you inspect each state.

::field-examples{example="states"}
::

::example-source{file="FieldExamples.vue"}
::

```vue
<Field label="Email address" required :invalid="!!emailError" :error="emailError">
  <Input v-model="email" placeholder="you@example.com" />
</Field>
```

### Other controls

The same field structure works with selects and checkboxes. Give a checkbox its own action label; use the Field label to describe the setting.

::field-examples{example="controls"}
::

::example-source{file="FieldExamples.vue"}
::

```vue
<Field label="Visibility" description="Choose who can open this project.">
  <Select v-model="visibility" :options="visibilityOptions" />
</Field>
```

## Installation

Complete the [shared installation](/getting-started/installation). Copy `Field.vue` and `index.ts` into `app/components/ui/field/`.

::component-source{name="field"}
::

## API

### Props

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

### Slots

| Slot          | Scoped props                                                                                                                          | Description                 |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------- | --------------------------- |
| `default`     | `id`, `fieldName`, `required`, `disabled`, `invalid`, `valid`, `dirty`, `touched`, `filled`, `focused`, `describedBy`, `controlProps` | Control slot.               |
| `label`       | —                                                                                                                                     | Custom label content.       |
| `description` | —                                                                                                                                     | Custom description content. |
| `error`       | —                                                                                                                                     | Custom error content.       |
