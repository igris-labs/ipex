---
title: Tags Input
description: Tokenized text input with keyboard editing, paste handling, validation, and form submission.
navigation:
  icon: tabler:tags
---

::component-example{name="tags-input" size-options="xs,sm,md,lg,xl" default-size="sm" variant-options="outline,soft,bare" default-variant="outline"}
::

## Usage

```vue
<script setup lang="ts">
import { TagsInput } from '~/components/ui/tags-input'
</script>

<template>
  <TagsInput aria-label="Project labels" placeholder="Add a label" />
</template>
```

## Variants and defaults

| Prop      | Values                       | Default   |
| --------- | ---------------------------- | --------- |
| `size`    | `xs`, `sm`, `md`, `lg`, `xl` | `sm`      |
| `variant` | `outline`, `soft`, `bare`    | `outline` |

Size scales the tags and the field together. The text-side inset balances the visible space around the remove icon; increasing size grows the tag rather than adding empty space around it.

| Size | Field minimum | Tag height | Text | Remove icon |
| ---- | ------------- | ---------- | ---- | ----------- |
| xs   | 24px          | 20px       | 12px | 12px        |
| sm   | 28px          | 22px       | 13px | 14px        |
| md   | 32px          | 24px       | 14px | 16px        |
| lg   | 36px          | 28px       | 14px | 18px        |
| xl   | 40px          | 32px       | 16px | 20px        |

The field grows when tags wrap. Touch removal targets remain at least 44px while their icons keep the selected size.

## Models

| Model           | Type               | Default | Description               |
| --------------- | ------------------ | ------- | ------------------------- |
| `v-model`       | `TagsInputValue[]` | `[]`    | Accepted tag values.      |
| `v-model:input` | `string`           | `""`    | Current uncommitted text. |

## Props

| Prop              | Type                 | Default            | Description                                        |
| ----------------- | -------------------- | ------------------ | -------------------------------------------------- |
| `displayValue`    | `(value) => string`  | string/JSON        | Visible and accessible tag label.                  |
| `convertValue`    | `(text) => value`    | identity string    | Converts input text before validation/addition.    |
| `serializeValue`  | `(value) => string`  | string/JSON        | Serializes native form values and keys.            |
| `isEqual`         | `(a, b) => boolean`  | `Object.is`        | Duplicate and equality comparison.                 |
| `validate`        | `(value) => boolean` | accepts all        | Validates converted values.                        |
| `delimiter`       | `string \| RegExp`   | `","`              | Add key and paste splitting rule.                  |
| `addOnBlur`       | `boolean`            | `false`            | Adds non-empty input on blur.                      |
| `addOnPaste`      | `boolean`            | `false`            | Adds multiple delimited clipboard values.          |
| `addOnTab`        | `boolean`            | `false`            | Adds non-empty input instead of moving focus.      |
| `duplicate`       | `boolean`            | `false`            | Allows equal values more than once.                |
| `max`             | `number`             | `0`                | Maximum count; zero means unlimited.               |
| `trim`            | `boolean`            | `true`             | Trims input and pasted segments.                   |
| `clearable`       | `boolean`            | `false`            | Renders a clear-all button when values exist.      |
| `placeholder`     | `string`             | -                  | Editable input placeholder.                        |
| `maxLength`       | `number`             | -                  | Native character limit for uncommitted input text. |
| `autoFocus`       | `boolean`            | `false`            | Focuses the editable input after mount.            |
| `id`              | `string`             | field/generated id | Editable input id.                                 |
| `name`            | `string`             | field name         | Native form field name repeated per tag.           |
| `required`        | `boolean`            | `false`            | Requires at least one tag.                         |
| `disabled`        | `boolean`            | `false`            | Disables editing, controls, and form submission.   |
| `readOnly`        | `boolean`            | `false`            | Keeps values focusable but prevents changes.       |
| `invalid`         | `boolean`            | `false`            | Forces invalid styling and ARIA state.             |
| `dir`             | `"ltr" \| "rtl"`     | `"ltr"`            | Tag direction and Arrow-key behavior.              |
| `ariaLabel`       | `string`             | `"Tags input"`     | Accessible group/input label.                      |
| `ariaLabelledby`  | `string`             | -                  | Accessible label element id.                       |
| `ariaDescribedby` | `string`             | field IDs          | Accessible description/error ids.                  |
| `ui`              | `TagsInputUi`        | -                  | Classes for structural parts.                      |

## Slots

| Slot     | Props                                                | Description                               |
| -------- | ---------------------------------------------------- | ----------------------------------------- |
| `tag`    | `value`, `label`, `index`, `isHighlighted`, `remove` | Complete custom tag.                      |
| `delete` | `value`, `index`                                     | Default remove button content.            |
| `input`  | `value`, `inputProps`, `add`                         | Custom editable input. Bind `inputProps`. |
| `clear`  | -                                                    | Clear-all button content.                 |

## Emits

| Event           | Payload             | Description                                                           |
| --------------- | ------------------- | --------------------------------------------------------------------- |
| `value-change`  | `(values, details)` | Fires before the values array updates. Cancelable.                    |
| `input-change`  | `(text, details)`   | Fires before editable text updates. Cancelable.                       |
| `add`           | `(value, details)`  | Fires before an accepted value is added. Cancelable.                  |
| `remove`        | `(value, details)`  | Fires before a value is removed. Cancelable.                          |
| `invalid-value` | `(value, details)`  | Reports `empty`, `convert`, `invalid`, `duplicate`, or `max` reasons. |

## Keyboard

| Key                            | Behavior                                              |
| ------------------------------ | ----------------------------------------------------- |
| `Enter` / delimiter key        | Add current text.                                     |
| `Tab`                          | Add when `addOnTab`; otherwise move focus normally.   |
| input `Backspace`              | Focus last tag when input is empty.                   |
| input boundary Arrow           | Focus last tag from the start edge, respecting `dir`. |
| tag `ArrowLeft` / `ArrowRight` | Move between tags/input, respecting `dir`.            |
| tag `Home` / `End`             | Focus first/last tag.                                 |
| tag `Backspace` / `Delete`     | Remove focused tag and retain logical focus.          |
| tag `Escape`                   | Return focus to the editable input.                   |

## Source

Copy `TagsInput.vue` and `index.ts` into `components/ui/tags-input` after [installation](/getting-started/installation).

::component-source{name="tags-input"}
::
