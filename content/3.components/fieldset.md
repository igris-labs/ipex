---
title: Fieldset
description: Group related form controls under a shared label.
navigation:
  icon: tabler:section
---

## Demos

::component-example{name="fieldset"}
::

### Usage

```vue
<script setup lang="ts">
import { Fieldset } from '~/components/ui/fieldset'
import { Input } from '~/components/ui/input'
</script>

<template>
  <Fieldset legend="Project details">
    <Input aria-label="Project name" placeholder="Project name" />
  </Fieldset>
</template>
```

### Grouped controls

Wrap related fields in a Fieldset. The legend names the group, while descriptions explain what the fields have in common. Disabling the fieldset disables its nested controls.

::field-examples{example="fieldset"}
::

::example-source{file="FieldExamples.vue"}
::

```vue
<Fieldset
  legend="Project settings"
  description="Choose how the project appears."
  :disabled="saving"
>
  <Field label="Project name" required><Input v-model="name" /></Field>
  <Field label="Visibility"><Select v-model="visibility" :options="options" /></Field>
</Fieldset>
```

## Installation

Complete the [shared installation](/getting-started/installation). Copy `Fieldset.vue` and `index.ts` into `app/components/ui/fieldset/`.

::component-source{name="fieldset"}
::

## API

### Props

| Prop          | Type         | Default | Description                                             |
| ------------- | ------------ | ------- | ------------------------------------------------------- |
| `legend`      | `string`     | —       | Fieldset legend.                                        |
| `description` | `string`     | —       | Help text linked with `aria-describedby`.               |
| `disabled`    | `boolean`    | `false` | Disables grouped controls via native fieldset behavior. |
| `invalid`     | `boolean`    | `false` | Sets invalid state attributes.                          |
| `ui`          | `FieldsetUi` | —       | Classes for root, legend, description, content.         |

### Slots

| Slot          | Description                 |
| ------------- | --------------------------- |
| `default`     | Grouped controls.           |
| `legend`      | Custom legend content.      |
| `description` | Custom description content. |
