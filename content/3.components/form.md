---
title: Form
description: Submit form values and check their validity.
navigation:
  icon: tabler:clipboard-text
---

## Demos

::component-example{name="form"}
::

### Usage

```vue
<script setup lang="ts">
import { Form } from '~/components/ui/form'
import { Input } from '~/components/ui/input'
</script>

<template>
  <Form>
    <Input aria-label="Project name" placeholder="Project name" />
  </Form>
</template>
```

## Installation

Complete the [shared installation](/getting-started/installation). Copy `Form.vue` and `index.ts` into `app/components/ui/form/`.

::component-source{name="form"}
::

## API

### Props

| Prop             | Type                          | Default  | Description                                                   |
| ---------------- | ----------------------------- | -------- | ------------------------------------------------------------- |
| `id`             | `string`                      | —        | Form id.                                                      |
| `action`         | `string`                      | —        | Native form action.                                           |
| `method`         | `"get" \| "post" \| "dialog"` | `"post"` | Native form method.                                           |
| `autocomplete`   | `"on" \| "off"`               | —        | Native autocomplete setting.                                  |
| `novalidate`     | `boolean`                     | `false`  | Disables native browser validation.                           |
| `preventDefault` | `boolean`                     | `true`   | Prevent native navigation on submit.                          |
| `errors`         | `FormErrors`                  | —        | Server-side errors read by child fields using matching names. |
| `ui`             | `FormUi`                      | —        | Classes for the form element.                                 |

### Slots

| Slot      | Scoped props                  | Description                             |
| --------- | ----------------------------- | --------------------------------------- |
| `default` | `state`, `submitted`, `valid` | Form contents and current submit state. |

### Events

| Event         | Payload             | Description                                                                |
| ------------- | ------------------- | -------------------------------------------------------------------------- |
| `submit`      | `FormSubmitDetails` | Fired on native submit. Includes `formData`, `valid`, and `cancel()`.      |
| `form-submit` | `(values, details)` | Fired with a values object converted from `FormData`, plus submit details. |
