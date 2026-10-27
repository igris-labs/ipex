---
title: Collapsible
description: Show or hide a single section of content.
navigation:
  icon: tabler:chevron-down
---

## Demos

::component-example{name="collapsible" size-options="xs,sm,md,lg,xl" default-size="sm"}
::

### Usage

```vue
<script setup lang="ts">
import { Collapsible } from '~/components/ui/collapsible'
</script>

<template>
  <Collapsible>
    <template #trigger>Project details</template>
    <template #content><p>Details for the current project.</p></template>
  </Collapsible>
</template>
```

Use the `content` slot for the expandable body. Header height, icon, text, radius, and body padding follow the selected size. Expansion respects reduced motion.

### Appearance and sizing

A single rounded border contains the disclosure. It uses the same header and body spacing as Accordion. The open header has a light tint, and body text aligns with its label. Focus stays inside the outer border.

| Size | Header height | Horizontal padding | Text | Icon |
| ---- | ------------- | ------------------ | ---- | ---- |
| xs   | 40px          | 12px               | 12px | 12px |
| sm   | 44px          | 16px               | 13px | 14px |
| md   | 48px          | 20px               | 14px | 16px |
| lg   | 52px          | 24px               | 14px | 18px |
| xl   | 56px          | 28px               | 16px | 20px |

These headers have 16px more height than compact controls to support longer labels and the expanded body. Coarse-pointer targets stay at least 44px tall.

## Installation

Complete the [shared installation](/getting-started/installation). Copy `Collapsible.vue` and `index.ts` into `app/components/ui/collapsible/`.

::component-source{name="collapsible"}
::

## API

### Variants and defaults

| Prop   | Values                       | Default |
| ------ | ---------------------------- | ------- |
| `size` | `xs`, `sm`, `md`, `lg`, `xl` | `sm`    |

### Props

| Prop            | Type                                   | Default | Description                                                                              |
| --------------- | -------------------------------------- | ------- | ---------------------------------------------------------------------------------------- |
| `modelValue`    | `boolean`                              | `false` | Controlled open state through `v-model`.                                                 |
| `size`          | `"xs" \| "sm" \| "md" \| "lg" \| "xl"` | `"sm"`  | Coordinated header and content sizing. Shared UI configuration can override the default. |
| `class`         | `HTMLAttributes['class']`              | —       | Classes merged into the root recipe.                                                     |
| `disabled`      | `boolean`                              | `false` | Prevents the panel from being toggled.                                                   |
| `unmountOnHide` | `boolean`                              | `false` | Remove content from the DOM when closed.                                                 |
| `as`            | `string`                               | `"div"` | Root element tag.                                                                        |
| `ui`            | `CollapsibleUi`                        | —       | CSS class overrides.                                                                     |

### Slots

| Slot      | Scoped props                      | Description                        |
| --------- | --------------------------------- | ---------------------------------- |
| `trigger` | `{ isOpen, open, close, toggle }` | The toggle trigger element.        |
| `icon`    | `{ isOpen }`                      | Indicator icon inside the trigger. |
| `content` | `{ isOpen, close }`               | The collapsible panel body.        |

### Events

| Event               | Payload                    | Description                        |
| ------------------- | -------------------------- | ---------------------------------- |
| `update:modelValue` | `[open: boolean]`          | Updates the controlled open state. |
| `open-change`       | `[open: boolean, details]` | Fired when the open state changes. |

### Exposed methods

| Method   | Signature                   | Description        |
| -------- | --------------------------- | ------------------ |
| `open`   | `(reason?, event?) => void` | Opens the panel.   |
| `close`  | `(reason?, event?) => void` | Closes the panel.  |
| `toggle` | `(reason?, event?) => void` | Toggles the panel. |

### Keyboard

| Key                   | Behavior                                                             |
| --------------------- | -------------------------------------------------------------------- |
| `Enter` / `Space`     | Toggles focused trigger through native button behavior.              |
| `Tab` / `Shift + Tab` | Uses native order. Closed content is inert and cannot receive focus. |
