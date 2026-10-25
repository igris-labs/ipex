---
title: Menu
description: A floating menu of actions, anchored to a trigger element.
navigation:
  icon: tabler:menu-2
---

::component-example{name="menu" size-options="xs,sm,md,lg,xl" default-size="sm"}
::

## Usage

```vue
<script setup lang="ts">
import { Menu } from '~/components/ui/menu'
import { Button } from '~/components/ui/button'

const items = [
  { label: 'Edit', value: 'edit' },
  { label: 'Archive', value: 'archive' },
]
</script>

<template>
  <Menu :items="items">
    <template #trigger="{ toggle, triggerProps }"
      ><Button v-bind="triggerProps" @click="toggle">Open menu</Button></template
    >
  </Menu>
</template>
```

## Variants and defaults

| Prop   | Values                       | Default |
| ------ | ---------------------------- | ------- |
| `size` | `xs`, `sm`, `md`, `lg`, `xl` | `sm`    |

## Props

| Prop            | Type                                     | Default    | Description                                               |
| --------------- | ---------------------------------------- | ---------- | --------------------------------------------------------- |
| `items`         | `MenuItem[] \| MenuItem[][]`             | —          | Flat array or grouped array (groups get auto-separators). |
| `side`          | `"top" \| "bottom" \| "left" \| "right"` | `"bottom"` | Preferred side to position the menu.                      |
| `align`         | `"start" \| "center" \| "end"`           | `"start"`  | Alignment relative to the trigger.                        |
| `sideOffset`    | `number`                                 | `4`        | Gap in px between trigger and menu.                       |
| `closeOnSelect` | `boolean`                                | `true`     | Close the menu after an item is selected.                 |
| `radioValues`   | `Record<string, string>`                 | —          | `v-model:radio-values` — state for radio groups.          |
| `teleport`      | `string \| false`                        | `false`    | Teleport target for the menu.                             |
| `as`            | `string \| Component`                    | `"div"`    | Root element tag.                                         |
| `dir`           | `"ltr" \| "rtl"`                         | `"ltr"`    | Logical keyboard direction and preferred submenu side.    |
| `ui`            | `MenuUi`                                 | —          | CSS class overrides.                                      |

## Slots

| Slot          | Scoped props                                    | Description                                       |
| ------------- | ----------------------------------------------- | ------------------------------------------------- |
| `trigger`     | `{ isOpen, open, close, toggle, triggerProps }` | The element that opens the menu.                  |
| `[item.slot]` | `{ item }`                                      | Per-item render override when `item.slot` is set. |

## Emits

| Event                | Payload                                       | Description                          |
| -------------------- | --------------------------------------------- | ------------------------------------ |
| `open-change`        | `[open: boolean, details]`                    | Fired when the open state changes.   |
| `select`             | `[item: MenuItem, details]`                   | Fired when an item is selected.      |
| `check-change`       | `[item: MenuItem, checked: boolean, details]` | Fired when a checkbox item changes.  |
| `radio-change`       | `[group: string, value: string, details]`     | Fired when a radio item is selected. |
| `update:radioValues` | `[values: Record<string, string>]`            | v-model event for radio group state. |

## Exposed methods

| Method   | Signature                   | Description       |
| -------- | --------------------------- | ----------------- |
| `open`   | `(reason?, event?) => void` | Opens the menu.   |
| `close`  | `(reason?, event?) => void` | Closes the menu.  |
| `toggle` | `(reason?, event?) => void` | Toggles the menu. |

## Keyboard

| Key                     | Behavior                                                            |
| ----------------------- | ------------------------------------------------------------------- |
| `ArrowDown` / `ArrowUp` | Moves focus through enabled items and loops.                        |
| `Home` / `End`          | Focuses first or last enabled item.                                 |
| `Enter` / `Space`       | Activates item, checkbox, radio, or opens submenu.                  |
| `ArrowRight`            | Opens focused submenu and moves into it; reversed in RTL.           |
| `ArrowLeft`             | Closes submenu and restores submenu-trigger focus; reversed in RTL. |
| `Escape`                | Closes submenu level or whole menu.                                 |
| Printable characters    | Typeahead focuses first matching item within 500 ms buffer.         |

Opening focuses first enabled item. Trigger keyboard activation comes from trigger element supplied by user; apply `triggerProps` and use a native button.

## Source

Copy `Menu.vue` and `index.ts` into `components/ui/menu` after [installation](/getting-started/installation).

::component-source{name="menu"}
::
