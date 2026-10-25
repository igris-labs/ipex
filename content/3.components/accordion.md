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

## Variants and defaults

| Prop   | Values                       | Default |
| ------ | ---------------------------- | ------- |
| `size` | `xs`, `sm`, `md`, `lg`, `xl` | `sm`    |

## Props

| Prop            | Type                         | Default      | Description                                                   |
| --------------- | ---------------------------- | ------------ | ------------------------------------------------------------- |
| `items`         | `AccordionItem[]`            | —            | **Required.** List of accordion items.                        |
| `type`          | `"single" \| "multiple"`     | `"single"`   | Whether one or many items can be open simultaneously.         |
| `collapsible`   | `boolean`                    | `false`      | Allow toggling the open item closed again (single mode only). |
| `disabled`      | `boolean`                    | `false`      | Disable all items.                                            |
| `orientation`   | `"vertical" \| "horizontal"` | `"vertical"` | Orientation of the accordion.                                 |
| `unmountOnHide` | `boolean`                    | `false`      | Remove content from the DOM when closed instead of hiding it. |
| `valueKey`      | `string`                     | —            | Property to read as the unique item value.                    |
| `labelKey`      | `string`                     | `"label"`    | Property to use as the trigger label.                         |
| `contentKey`    | `string`                     | —            | Property to use as the body text.                             |
| `disabledKey`   | `string`                     | `"disabled"` | Property to read for per-item disabled state.                 |
| `as`            | `string`                     | `"div"`      | Root element tag.                                             |
| `ui`            | `AccordionUi`                | —            | CSS class overrides.                                          |

## Slots

| Slot          | Scoped props                      | Description                                      |
| ------------- | --------------------------------- | ------------------------------------------------ |
| `trigger`     | `{ item, value, isOpen, toggle }` | Trigger button content for every item.           |
| `icon`        | `{ isOpen, item }`                | Icon inside the trigger (e.g. chevron).          |
| `content`     | `{ item, value, isOpen }`         | Panel body content for every item.               |
| `[item.slot]` | `{ item, value, isOpen }`         | Per-item panel override when `item.slot` is set. |

## Emits

| Event          | Payload                                | Description                         |
| -------------- | -------------------------------------- | ----------------------------------- |
| `value-change` | `[value: string \| string[], details]` | Fired when the open item(s) change. |

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
