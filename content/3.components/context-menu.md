---
title: Context Menu
description: Show a menu of actions at the pointer when someone right-clicks.
navigation:
  icon: tabler:pointer
---

## Demos

::component-example{name="context-menu" size-options="xs,sm,md,lg,xl" default-size="sm"}
::

### Usage

```vue
<script setup lang="ts">
import { ContextMenu } from '~/components/ui/context-menu'

const items = [{ label: 'Edit', value: 'edit' }]
</script>

<template>
  <ContextMenu :items="items">Right-click for project actions.</ContextMenu>
</template>
```

## Installation

Complete the [shared installation](/getting-started/installation). Copy `ContextMenu.vue` and `index.ts` into `app/components/ui/context-menu/`.

::component-source{name="context-menu"}
::

## API

### Variants and defaults

| Prop   | Values                       | Default |
| ------ | ---------------------------- | ------- |
| `size` | `xs`, `sm`, `md`, `lg`, `xl` | `sm`    |

### Props

| Prop             | Type                         | Default  | Description                                            |
| ---------------- | ---------------------------- | -------- | ------------------------------------------------------ |
| `items`          | `MenuItem[] \| MenuItem[][]` | —        | Flat or grouped menu item array.                       |
| `disabled`       | `boolean`                    | `false`  | Prevents opening.                                      |
| `dir`            | `"ltr" \| "rtl"`             | `"ltr"`  | Logical keyboard direction and preferred submenu side. |
| `closeOnSelect`  | `boolean`                    | `true`   | Closes after normal item selection.                    |
| `radioValues`    | `Record<string, string>`     | —        | State for radio item groups.                           |
| `sideOffset`     | `number`                     | `4`      | Gap in px from the pointer.                            |
| `longPressDelay` | `number`                     | `700`    | Touch/pen hold delay. Set `0` to disable.              |
| `restoreFocus`   | `boolean`                    | `true`   | Returns focus after keyboard close or selection.       |
| `teleport`       | `string \| false`            | `"body"` | Teleport target.                                       |
| `ui`             | `ContextMenuUi`              | —        | Classes for root, content, and menu parts.             |

### Slots

| Slot            | Props                       | Description                    |
| --------------- | --------------------------- | ------------------------------ |
| `default`       | `isOpen`, `openAt`, `close` | Context-menu surface.          |
| `[item.slot]`   | Depends on item type        | Per-item render override.      |
| `checkbox-item` | `item`, `checked`           | Shared checkbox item renderer. |
| `radio-item`    | `item`, `checked`           | Shared radio item renderer.    |
| `label`         | `item`                      | Shared label renderer.         |

### Events

| Event                | Payload                    | Description                           |
| -------------------- | -------------------------- | ------------------------------------- |
| `open-change`        | `(open, details)`          | Fired before open state changes.      |
| `select`             | `(item, details)`          | Fired when a normal item is selected. |
| `check-change`       | `(item, checked, details)` | Fired when a checkbox item changes.   |
| `radio-change`       | `(group, value, details)`  | Fired when a radio item is selected.  |
| `update:radioValues` | `(values)`                 | v-model event for radio state.        |

### Keyboard

| Key                            | Behavior                                                                 |
| ------------------------------ | ------------------------------------------------------------------------ |
| `ArrowDown` / `ArrowUp`        | Move highlighted item.                                                   |
| `Home` / `End`                 | Move to first/last enabled item.                                         |
| `Enter` / `Space`              | Select or toggle highlighted item.                                       |
| `ArrowRight` / `ArrowLeft`     | Open/close submenu; reversed in RTL, even after a visual collision flip. |
| `Escape`                       | Close the current submenu level, or the context menu when at its root.   |
| `Shift+F10` / Context Menu key | Open at focused target.                                                  |

Touch and pen users can open the menu with a long press. Moving more than 10px before delay cancels it.
