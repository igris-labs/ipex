---
title: Accordion
description: A set of collapsible sections with headings.
navigation:
  icon: tabler:arrows-vertical
---

::component-example{name="accordion" size-options="xs,sm,md,lg,xl" default-size="sm"}
::

## Usage

```vue
<script setup lang="ts">
import { Accordion } from '~/components/ui/accordion'

const items = [
  { value: 'source', label: 'Do I own the source?', content: 'Yes. Copy and adapt the files.' },
]
</script>

<template>
  <Accordion :items="items" />
</template>
```

The open item can be closed again by default. Set `:collapsible="false"` when one selected item must remain open. Headers and content follow the selected size, and expansion respects reduced motion.

## Appearance and sizing

A single rounded border contains the disclosure. Accordion items share full-width dividers. The open header has a light tint, and body text aligns with its label. Focus stays inside the outer border.

| Size | Header height | Horizontal padding | Text | Icon |
| ---- | ------------- | ------------------ | ---- | ---- |
| xs   | 40px          | 12px               | 12px | 12px |
| sm   | 44px          | 16px               | 13px | 14px |
| md   | 48px          | 20px               | 14px | 16px |
| lg   | 52px          | 24px               | 14px | 18px |
| xl   | 56px          | 28px               | 16px | 20px |

These headers have 16px more height than compact controls to support longer labels and the expanded body. Coarse-pointer targets stay at least 44px tall.

## Variants and defaults

| Prop   | Values                       | Default |
| ------ | ---------------------------- | ------- |
| `size` | `xs`, `sm`, `md`, `lg`, `xl` | `sm`    |

The preview controls size, selection type, keyboard orientation, collapsibility, disabled state, and content mounting. Open sections by clicking their headers; switching selection type resets the open value. Orientation changes the layout and arrow-key navigation. Horizontal sections appear side by side.

## Props

| Prop            | Type                                   | Default      | Description                                                                              |
| --------------- | -------------------------------------- | ------------ | ---------------------------------------------------------------------------------------- |
| `modelValue`    | `string \| string[]`                   | —            | Controlled open value through `v-model`; use an array for multiple mode.                 |
| `size`          | `"xs" \| "sm" \| "md" \| "lg" \| "xl"` | `"sm"`       | Coordinated header and content sizing. Shared UI configuration can override the default. |
| `class`         | `HTMLAttributes['class']`              | —            | Classes merged into the root recipe.                                                     |
| `items`         | `AccordionItem[]`                      | —            | **Required.** List of accordion items.                                                   |
| `type`          | `"single" \| "multiple"`               | `"single"`   | Whether one or many items can be open simultaneously.                                    |
| `collapsible`   | `boolean`                              | `true`       | Allow toggling the open item closed again (single mode only).                            |
| `disabled`      | `boolean`                              | `false`      | Disable all items.                                                                       |
| `orientation`   | `"vertical" \| "horizontal"`           | `"vertical"` | Orientation of the accordion.                                                            |
| `unmountOnHide` | `boolean`                              | `false`      | Remove content from the DOM when closed instead of hiding it.                            |
| `valueKey`      | `string`                               | —            | Property to read as the unique item value.                                               |
| `labelKey`      | `string`                               | `"label"`    | Property to use as the trigger label.                                                    |
| `contentKey`    | `string`                               | —            | Property to use as the body text.                                                        |
| `disabledKey`   | `string`                               | `"disabled"` | Property to read for per-item disabled state.                                            |
| `as`            | `string`                               | `"div"`      | Root element tag.                                                                        |
| `ui`            | `AccordionUi`                          | —            | CSS class overrides.                                                                     |

`items` and the key props describe your data. Use `as`, `class`, and `ui` in code to customize markup and styling.

## Slots

| Slot          | Scoped props                      | Description                                      |
| ------------- | --------------------------------- | ------------------------------------------------ |
| `trigger`     | `{ item, value, isOpen, toggle }` | Trigger button content for every item.           |
| `icon`        | `{ isOpen, item }`                | Icon inside the trigger (e.g. chevron).          |
| `content`     | `{ item, value, isOpen }`         | Panel body content for every item.               |
| `[item.slot]` | `{ item, value, isOpen }`         | Per-item panel override when `item.slot` is set. |

## Emits

| Event               | Payload                                | Description                         |
| ------------------- | -------------------------------------- | ----------------------------------- |
| `update:modelValue` | `[value: string \| string[]]`          | Updates the controlled open value.  |
| `value-change`      | `[value: string \| string[], details]` | Fired when the open item(s) change. |

## Keyboard

| Key                        | Behavior                                                            |
| -------------------------- | ------------------------------------------------------------------- |
| `Enter` / `Space`          | Toggles focused trigger through native button behavior.             |
| `ArrowDown` / `ArrowUp`    | Moves between enabled triggers in vertical orientation and loops.   |
| `ArrowRight` / `ArrowLeft` | Moves between enabled triggers in horizontal orientation and loops. |
| `Home` / `End`             | Focuses first or last enabled trigger.                              |

## Source

Copy `Accordion.vue` and `index.ts` into `components/ui/accordion` after [installation](/getting-started/installation).

::component-source{name="accordion"}
::
