---
title: Toolbar
description: Command strip with roving focus across buttons, links, inputs, groups, and separators.
navigation:
  icon: tabler:tools
---

::component-example{name="toolbar" size-options="xs,sm,md,lg,xl" default-size="sm"}
::

## Usage

```vue
<script setup lang="ts">
import { Toolbar } from '~/components/ui/toolbar'

const items = [
  { label: 'Bold', value: 'bold' },
  { label: 'Italic', value: 'italic' },
]
</script>

<template>
  <Toolbar :items="items" aria-label="Formatting" />
</template>
```

## Variants and defaults

| Prop   | Values                       | Default |
| ------ | ---------------------------- | ------- |
| `size` | `xs`, `sm`, `md`, `lg`, `xl` | `sm`    |

## Props

| Prop             | Type                         | Default        | Description                   |
| ---------------- | ---------------------------- | -------------- | ----------------------------- |
| `items`          | `ToolbarItem[]`              | `[]`           | Generated toolbar items.      |
| `orientation`    | `"horizontal" \| "vertical"` | `"horizontal"` | Toolbar orientation.          |
| `loop`           | `boolean`                    | `true`         | Arrow focus wraps.            |
| `disabled`       | `boolean`                    | `false`        | Disables generated items.     |
| `ariaLabel`      | `string`                     | —              | Accessible label.             |
| `ariaLabelledby` | `string`                     | —              | Accessible label id.          |
| `ui`             | `ToolbarUi`                  | —              | Classes for structural parts. |

## Slots

| Slot          | Props                | Description                                  |
| ------------- | -------------------- | -------------------------------------------- |
| `default`     | —                    | Extra toolbar content after generated items. |
| `[item.slot]` | `item`, `isDisabled` | Custom generated item content.               |

## Emits

| Event          | Payload                  | Description                                          |
| -------------- | ------------------------ | ---------------------------------------------------- |
| `select`       | `(item, details)`        | Fired before an item runs `onSelect`.                |
| `input-change` | `(item, value, details)` | Fired before a generated input runs `onUpdateValue`. |

## Keyboard

| Key                        | Behavior                           |
| -------------------------- | ---------------------------------- |
| `ArrowRight` / `ArrowLeft` | Move focus in horizontal toolbar.  |
| `ArrowDown` / `ArrowUp`    | Move focus in vertical toolbar.    |
| `Home` / `End`             | Move to first/last focusable item. |

Generated buttons and links use one roving tab stop. Text inputs remain native tab stops and keep Arrow/Home/End cursor behavior; toolbar navigation never hijacks their editing keys.

## Source

Copy `Toolbar.vue` and `index.ts` into `components/ui/toolbar` after [installation](/getting-started/installation).

::component-source{name="toolbar"}
::
