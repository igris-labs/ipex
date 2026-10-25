---
title: Editable
description: Inline text editing with preview, draft, submit, cancel, and native form behavior.
navigation:
  icon: tabler:pencil
---

::component-example{name="editable" size-options="xs,sm,md,lg,xl" default-size="sm" variant-options="outline,soft,bare" default-variant="outline"}
::

## Usage

```vue
<script setup lang="ts">
import { Editable } from '~/components/ui/editable'
</script>

<template>
  <Editable model-value="Project name" aria-label="Project title" />
</template>
```

## Variants and defaults

| Prop      | Values                       | Default   |
| --------- | ---------------------------- | --------- |
| `size`    | `xs`, `sm`, `md`, `lg`, `xl` | `sm`      |
| `variant` | `outline`, `soft`, `bare`    | `outline` |

## Props

| Prop                | Type                                            | Default            | Description                                  |
| ------------------- | ----------------------------------------------- | ------------------ | -------------------------------------------- |
| `id`                | `string`                                        | field/generated id | Visible control id.                          |
| `name`              | `string`                                        | field name         | Native form field name.                      |
| `placeholder`       | `string \| { preview?: string; edit?: string }` | `"Enter text..."`  | Shared or mode-specific placeholder.         |
| `activationMode`    | `"focus" \| "click" \| "dblclick" \| "none"`    | `"focus"`          | Preview event that starts editing.           |
| `submitMode`        | `"blur" \| "enter" \| "both" \| "none"`         | `"blur"`           | Events that submit the draft.                |
| `startWithEditMode` | `boolean`                                       | `false`            | Starts with the input visible and focused.   |
| `selectOnFocus`     | `boolean`                                       | `false`            | Selects input text when editing starts.      |
| `autoResize`        | `boolean`                                       | `false`            | Uses native `field-sizing: content`.         |
| `multiline`         | `boolean`                                       | `false`            | Renders a textarea instead of an input.      |
| `rows`              | `number`                                        | `2`                | Initial textarea rows.                       |
| `maxLength`         | `number`                                        | —                  | Native maximum draft length.                 |
| `required`          | `boolean`                                       | `false`            | Requires a committed non-empty value.        |
| `disabled`          | `boolean`                                       | `false`            | Disables all controls and form submission.   |
| `readOnly`          | `boolean`                                       | `false`            | Keeps preview focusable but blocks editing.  |
| `invalid`           | `boolean`                                       | `false`            | Controlled invalid state.                    |
| `dir`               | `"ltr" \| "rtl"`                                | inherited          | Text direction.                              |
| `ariaLabel`         | `string`                                        | —                  | Accessible label when no Field label exists. |
| `ariaDescribedby`   | `string`                                        | field ids          | Accessible description ids.                  |
| `ui`                | `EditableUi`                                    | —                  | Classes for structural parts.                |

## Slots

| Slot      | Props                                                                | Description                      |
| --------- | -------------------------------------------------------------------- | -------------------------------- |
| `preview` | `value`, `isEmpty`, `edit`                                           | Preview button content.          |
| `edit`    | —                                                                    | Edit button content.             |
| `submit`  | —                                                                    | Submit button content.           |
| `cancel`  | —                                                                    | Cancel button content.           |
| `state`   | `value`, `draft`, `isEditing`, `isEmpty`, `edit`, `submit`, `cancel` | Optional state-driven custom UI. |

## Emits

| Event               | Payload                     | Description                                          |
| ------------------- | --------------------------- | ---------------------------------------------------- |
| `update:modelValue` | `value`                     | Fired after a draft is accepted.                     |
| `value-change`      | `(value, details)`          | Fired before commit. `details.cancel()` prevents it. |
| `draft-change`      | `(value, details)`          | Fired before draft input updates. Cancelable.        |
| `state-change`      | `(state, details)`          | Fired for `edit`, `submit`, and `cancel`.            |
| `submit`            | `(value, details)`          | Fired before submission completes. Cancelable.       |
| `cancel`            | `(committedValue, details)` | Fired before draft cancellation. Cancelable.         |

## Keyboard

| Key                        | Behavior                                                            |
| -------------------------- | ------------------------------------------------------------------- |
| `Enter`                    | Submits when `submitMode` includes Enter.                           |
| `Ctrl+Enter` / `Cmd+Enter` | Submits a multiline value.                                          |
| `Escape`                   | Cancels the draft and returns to preview mode.                      |
| `Tab`                      | Uses native focus order; blur may submit depending on `submitMode`. |

## Source

Copy `Editable.vue` and `index.ts` into `components/ui/editable` after [installation](/getting-started/installation).

::component-source{name="editable"}
::
