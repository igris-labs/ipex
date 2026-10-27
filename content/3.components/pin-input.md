---
title: Pin / OTP Input
description: Enter a verification code or PIN across separate cells.
navigation:
  icon: tabler:password
---

## Demos

::component-example{name="pin-input" size-options="xs,sm,md,lg,xl" default-size="sm" variant-options="outline,soft,bare" default-variant="outline"}
::

### Usage

```vue
<script setup lang="ts">
import { PinInput } from '~/components/ui/pin-input'
</script>

<template>
  <PinInput :length="6" aria-label="Verification code" />
</template>
```

## Installation

Complete the [shared installation](/getting-started/installation). Copy `PinInput.vue` and `index.ts` into `app/components/ui/pin-input/`.

::component-source{name="pin-input"}
::

## API

### Variants and defaults

| Prop      | Values                       | Default   |
| --------- | ---------------------------- | --------- |
| `size`    | `xs`, `sm`, `md`, `lg`, `xl` | `sm`      |
| `variant` | `outline`, `soft`, `bare`    | `outline` |

### Props

| Prop              | Type                               | Default            | Description                                           |
| ----------------- | ---------------------------------- | ------------------ | ----------------------------------------------------- |
| `length`          | `number`                           | `4`                | Number of cells; clamped to at least one.             |
| `type`            | `"text" \| "number"`               | `"text"`           | Character mode and input metadata.                    |
| `mask`            | `boolean`                          | `false`            | Renders password cells.                               |
| `otp`             | `boolean`                          | `false`            | Enables one-time-code autocomplete on the first cell. |
| `placeholder`     | `string`                           | `""`               | Placeholder applied to every cell.                    |
| `allowedChars`    | `RegExp \| (character) => boolean` | non-whitespace     | Additional character filter.                          |
| `selectOnFocus`   | `boolean`                          | `true`             | Selects a cell value when focused.                    |
| `autoFocus`       | `boolean`                          | `false`            | Focuses the first cell after mount.                   |
| `id`              | `string`                           | field/generated id | First cell id. Later cells receive numbered suffixes. |
| `name`            | `string`                           | field name         | Native form field name.                               |
| `required`        | `boolean`                          | `false`            | Requires all cells to be filled.                      |
| `disabled`        | `boolean`                          | `false`            | Disables every cell and form submission.              |
| `readOnly`        | `boolean`                          | `false`            | Prevents value changes while retaining focus.         |
| `invalid`         | `boolean`                          | `false`            | Forces invalid styling and ARIA state.                |
| `dir`             | `"ltr" \| "rtl"`                   | `"ltr"`            | Cell direction and Arrow-key behavior.                |
| `ariaLabel`       | `string`                           | `"Pin input"`      | Group label and per-cell label prefix.                |
| `ariaLabelledby`  | `string`                           | -                  | Accessible label element id.                          |
| `ariaDescribedby` | `string`                           | field IDs          | Accessible description/error ids.                     |
| `ui`              | `PinInputUi`                       | -                  | Classes for structural parts.                         |

### Slots

| Slot   | Props                                                  | Description                                 |
| ------ | ------------------------------------------------------ | ------------------------------------------- |
| `cell` | `index`, `value`, `isFilled`, `isActive`, `inputProps` | Custom cell. Bind `inputProps` to an input. |

### Events

| Event          | Payload            | Description                                           |
| -------------- | ------------------ | ----------------------------------------------------- |
| `value-change` | `(value, details)` | Fires before the canonical value updates. Cancelable. |
| `complete`     | `(value, details)` | Fires after every cell becomes filled.                |

### Keyboard

| Key                        | Behavior                                                                             |
| -------------------------- | ------------------------------------------------------------------------------------ |
| text input                 | Accepts valid characters and advances focus. Multiple characters distribute forward. |
| paste                      | Distributes valid characters from the current cell.                                  |
| `ArrowLeft` / `ArrowRight` | Move between cells, respecting `dir`.                                                |
| `Home` / `End`             | Focus first/last cell.                                                               |
| `Backspace`                | Clears current cell, or previous cell when current is empty.                         |
| `Delete`                   | Clears current cell.                                                                 |
