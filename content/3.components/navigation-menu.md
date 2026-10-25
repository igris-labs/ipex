---
title: Navigation Menu
description: Horizontal flyout and vertical application navigation from one items API.
navigation:
  icon: tabler:compass
---

::component-example{name="navigation-menu" size-options="xs,sm,md,lg,xl" default-size="sm"}
::

## Usage

```vue
<script setup lang="ts">
import { NavigationMenu } from '~/components/ui/navigation-menu'

const items = [
  { label: 'Projects', value: 'projects' },
  { label: 'Settings', value: 'settings' },
]
</script>

<template>
  <NavigationMenu :items="items" />
</template>
```

Flyouts sit 2px from their trigger. Flyout links stack their title above the description. The hover highlight slides between top-level controls in 180ms and follows keyboard focus. Hovering a link without children closes the previous flyout. Reduced motion disables the slide.

## Variants and defaults

| Prop   | Values                       | Default |
| ------ | ---------------------------- | ------- |
| `size` | `xs`, `sm`, `md`, `lg`, `xl` | `sm`    |

## Models

| Model              | Type             | Default                             | Description                                                             |
| ------------------ | ---------------- | ----------------------------------- | ----------------------------------------------------------------------- |
| `v-model`          | `string \| null` | `defaultValue`                      | Selected leaf value. Falls back to a string `to`, `href`, then `label`. |
| `v-model:open`     | `string \| null` | `null`                              | Active horizontal or side flyout item.                                  |
| `v-model:expanded` | `string[]`       | `defaultExpanded` and item defaults | Expanded inline item values. Multiple branches may remain open.         |

## Props

| Prop              | Type                             | Default        | Description                                                                                                       |
| ----------------- | -------------------------------- | -------------- | ----------------------------------------------------------------------------------------------------------------- |
| `items`           | `NavigationMenuItem[]`           | required       | Top-level navigation items.                                                                                       |
| `defaultValue`    | `string \| null`                 | `null`         | Initially selected value when `v-model` is uncontrolled.                                                          |
| `orientation`     | `"horizontal" \| "vertical"`     | `"horizontal"` | Top-level layout and keyboard direction.                                                                          |
| `contentMode`     | `"auto" \| "flyout" \| "inline"` | `"auto"`       | Child presentation. Auto uses horizontal flyouts, vertical inline expansion, and collapsed vertical side flyouts. |
| `collapsed`       | `boolean`                        | `false`        | Enables icon-rail behavior and automatic side flyouts for vertical navigation.                                    |
| `tooltip`         | `boolean`                        | `false`        | Shows accessible flyout labels for collapsed items without children.                                              |
| `defaultExpanded` | `string[]`                       | `[]`           | Initially expanded inline item values.                                                                            |
| `loop`            | `boolean`                        | `true`         | Arrow-key focus wraps.                                                                                            |
| `dir`             | `"ltr" \| "rtl"`                 | `"ltr"`        | Horizontal direction and vertical flyout side.                                                                    |
| `disabled`        | `boolean`                        | `false`        | Disables trigger interaction.                                                                                     |
| `openDelay`       | `number`                         | `80`           | Pointer-open delay in milliseconds.                                                                               |
| `closeDelay`      | `number`                         | `150`          | Pointer-close delay in milliseconds.                                                                              |
| `sideOffset`      | `number`                         | `2`            | Distance between a flyout and its trigger.                                                                        |
| `teleport`        | `string \| false`                | automatic      | Flyout Teleport target. Defaults to `body` for collapsed vertical navigation and no Teleport otherwise.           |
| `ariaLabel`       | `string`                         | `"Primary"`    | Accessible nav label.                                                                                             |
| `ui`              | `NavigationMenuUi`               | —              | Classes for structural parts.                                                                                     |

## Slots

| Slot              | Props                     | Description                                   |
| ----------------- | ------------------------- | --------------------------------------------- |
| `trigger`         | `NavigationMenuSlotProps` | Top-level flyout trigger content.             |
| `link`            | `NavigationMenuSlotProps` | Top-level direct-link content.                |
| `item`            | `NavigationMenuSlotProps` | Flyout item or complete vertical row content. |
| `item-leading`    | `NavigationMenuSlotProps` | Leading icon/content for generated rows.      |
| `item-label`      | `NavigationMenuSlotProps` | Generated label replacement.                  |
| `item-trailing`   | `NavigationMenuSlotProps` | Trailing action or metadata.                  |
| `child-indicator` | `NavigationMenuSlotProps` | Expansion indicator for child-bearing items.  |
| `[item.slot]`     | `NavigationMenuSlotProps` | Per-item complete-content override.           |

`NavigationMenuSlotProps` exposes `item`, `isOpen`, `isActive`, `depth`, `collapsed`, and a native-handler-safe `toggle` action.

## Emits

| Event             | Payload                            | Description                                                                                                         |
| ----------------- | ---------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| `open-change`     | `(value: string \| null, details)` | Fired before active flyout changes.                                                                                 |
| `expanded-change` | `(values: string[], details)`      | Fired before inline expansion changes. Details include `item` and `expanded`; call `details.cancel()` to reject it. |
| `value-change`    | `(value, details)`                 | Fired before the selected value changes. Details include `item`; call `details.cancel()` to reject it.              |
| `select`          | `(item, details)`                  | Fired when a link/item is selected.                                                                                 |

## Keyboard

| Key                               | Behavior                                                                                                                                                              |
| --------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ArrowRight` / `ArrowLeft`        | Move between horizontal items. In vertical inline mode, expand/collapse a branch or return to its parent. In vertical flyout mode, open toward the reading direction. |
| `ArrowDown` / `ArrowUp`           | Move through vertical inline rows, vertical flyout triggers, or flyout links.                                                                                         |
| `ArrowDown` / `Enter` / `Space`   | Open a horizontal flyout item. Enter/Space also toggles inline disclosure buttons.                                                                                    |
| `Home` / `End`                    | Focus first/last enabled top-level item.                                                                                                                              |
| Character keys                    | Typeahead across flyout triggers.                                                                                                                                     |
| `ArrowDown` / `ArrowUp` in flyout | Move through enabled flyout links.                                                                                                                                    |
| `Escape`                          | Close the active flyout.                                                                                                                                              |

## Source

Copy `NavigationMenu.vue` and `index.ts` into `components/ui/navigation-menu` after [installation](/getting-started/installation).

::component-source{name="navigation-menu"}
::
