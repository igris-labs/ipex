---
title: Menubar
description: Arrange related action menus in a horizontal bar.
navigation:
  icon: tabler:layout-navbar
---

## Demos

::component-example{name="menubar" size-options="xs,sm,md,lg,xl" default-size="sm"}
::

### Usage

```vue
<script setup lang="ts">
import { Menubar } from '~/components/ui/menubar'

const items = [{ label: 'File', value: 'file', children: [{ label: 'New project', value: 'new' }] }]
</script>

<template>
  <Menubar :items="items" aria-label="Editor menu" />
</template>
```

## Installation

Complete the [shared installation](/getting-started/installation). Copy `Menubar.vue` and `index.ts` into `app/components/ui/menubar/`.

::component-source{name="menubar"}
::

## API

### Variants and defaults

| Prop   | Values                       | Default |
| ------ | ---------------------------- | ------- |
| `size` | `xs`, `sm`, `md`, `lg`, `xl` | `sm`    |

### Props

| Prop             | Type                     | Default  | Description                                                                             |
| ---------------- | ------------------------ | -------- | --------------------------------------------------------------------------------------- |
| `items`          | `MenubarItem[]`          | required | Top-level menu items. Items with `children` open panels.                                |
| `loop`           | `boolean`                | `true`   | Left/right focus wraps.                                                                 |
| `dir`            | `"ltr" \| "rtl"`         | `"ltr"`  | Reverses horizontal arrow behavior for RTL.                                             |
| `teleport`       | `string \| false`        | `"body"` | Popup target. Set `false` for inline panels; ancestor overflow and stacking then apply. |
| `disabled`       | `boolean`                | `false`  | Disables the menubar.                                                                   |
| `closeOnSelect`  | `boolean`                | `true`   | Closes after normal item selection.                                                     |
| `radioValues`    | `Record<string, string>` | —        | State for radio groups inside panels.                                                   |
| `ariaLabel`      | `string`                 | —        | Accessible label.                                                                       |
| `ariaLabelledby` | `string`                 | —        | Accessible label id.                                                                    |
| `ui`             | `MenubarUi`              | —        | Classes for root, triggers, content, and menu parts.                                    |

### Slots

| Slot            | Props                | Description                    |
| --------------- | -------------------- | ------------------------------ |
| `trigger`       | `item`, `isOpen`     | Top-level trigger content.     |
| `[item.slot]`   | Depends on item type | Per-item panel renderer.       |
| `checkbox-item` | `item`, `checked`    | Shared checkbox item renderer. |
| `radio-item`    | `item`, `checked`    | Shared radio item renderer.    |
| `label`         | `item`               | Shared label renderer.         |

### Events

| Event                | Payload                            | Description                       |
| -------------------- | ---------------------------------- | --------------------------------- |
| `open-change`        | `(value: string \| null, details)` | Fired before active menu changes. |
| `select`             | `(item, details)`                  | Fired when an item is selected.   |
| `check-change`       | `(item, checked, details)`         | Fired when checkbox item changes. |
| `radio-change`       | `(group, value, details)`          | Fired when radio item changes.    |
| `update:radioValues` | `(values)`                         | v-model event for radio state.    |

### Keyboard

Submenus use [Menu's viewport collision positioning](/components/menu#submenus). Horizontal arrows follow `dir` even when a submenu flips visually. Opening a submenu does not switch the top-level menu.

Menubar panels join the shared floating-layer stack and teleport to `body` by default so ancestor clipping and stacking contexts do not trap them. Set `--akaza-z-layer-base` (default `1200`) globally to change its base or set `--akaza-z-menubar` on the popup to override its z-index. Use `ui.content` for popup styles; descendant selectors from the menubar root do not cross Teleport. Nested panels share Menu's styling hooks.

| Key                        | Behavior                                                      |
| -------------------------- | ------------------------------------------------------------- |
| `ArrowRight` / `ArrowLeft` | Move between top-level triggers.                              |
| `ArrowDown`                | Open active menu and focus first panel item.                  |
| `ArrowUp`                  | Open active menu and focus last panel item.                   |
| `Enter` / `Space`          | Open a menu or activate a top-level command without children. |
| `ArrowUp` / `ArrowDown`    | Move within an open panel.                                    |
| `Home` / `End`             | Focus first/last enabled top-level item.                      |
| Character keys             | Typeahead across top-level items.                             |
| `Escape`                   | Close the open panel and return focus to its trigger.         |
